import { updateLoanStatus } from 'api/updateLoanStatus';
import { useAppDispatch } from 'app/hooks';
import { transactionTypes } from 'constants/transactionTypes';

import { increment } from 'counter/counterSlice';
import { ErrorWithReason } from 'errors';
import { ethers } from 'ethers';
import { getEventFromReceipt } from 'helpers/getEventFromReceipt';
import { saveLoanInDb } from 'helpers/saveLoanInDb';
import { saveTransactionInDb } from 'helpers/saveTransactionInDb';
import { fetchLoanAuctionByNFT } from 'loan';
import NiftyApesLendingDeploymentJSON from '../generated/deployments/localhost/NiftyApesLending.json';
import { useChainId } from './useChainId';
import { useLendingContract, useSigLendingContract } from './useContracts';
import { useGetTransactionTimestamp } from './useGetTransactionTimestamp';

export const useRefinanceByBorrower = ({
  offer,
  signature,
  nftId,
  nftContractAddress,
  expectedLastUpdatedTimestamp,
}: {
  offer: any;
  signature: string;
  nftId?: string;
  nftContractAddress?: string;
  expectedLastUpdatedTimestamp: number;
}) => {
  // Needed to execute the refinance
  const sigLendingContract = useSigLendingContract();

  // Needed to get information about the old loan
  const lendingContract = useLendingContract();

  const dispatch = useAppDispatch();

  const { getTransactionTimestamp } = useGetTransactionTimestamp();

  const chainId = useChainId();

  if (
    !nftContractAddress ||
    !nftId ||
    !sigLendingContract ||
    !lendingContract
  ) {
    return {
      refinanceLoanByBorrower: undefined,
    };
  }

  return {
    refinanceLoanByBorrower: async () => {
      const oldLoan = await lendingContract.getLoanAuction(
        nftContractAddress,
        nftId,
      );

      const gasEstimate =
        await sigLendingContract.estimateGas.refinanceByBorrowerSignature(
          offer,
          signature,
          nftId,
          oldLoan.lastUpdatedTimestamp,
        );

      const tx = await sigLendingContract.refinanceByBorrowerSignature(
        offer,
        signature,
        nftId,
        expectedLastUpdatedTimestamp,
        {
          gasLimit: Math.ceil(1.2 * gasEstimate.toNumber()),
        },
      );

      const receipt: any = await tx.wait();

      if (receipt.status !== 1) {
        throw new ErrorWithReason('reason: revert');
      }

      const transactionTimestamp = await getTransactionTimestamp(receipt);

      const loanRefinancedEvent = getEventFromReceipt({
        eventName: 'Refinance',
        receipt,
        // event is emitted by the lending contract,
        // even though the function is called on the sig lending contract
        abi: NiftyApesLendingDeploymentJSON.abi,
      });

      const newLoan = loanRefinancedEvent.args.loanAuction;

      dispatch(
        fetchLoanAuctionByNFT({
          id: nftId,
          contractAddress: nftContractAddress,
        }),
      );

      await saveLoanInDb({
        chainId,
        nftContractAddress: ethers.utils.getAddress(nftContractAddress),
        nftId,
        creator: offer.creator,
        borrower: newLoan.nftOwner,
        lender: newLoan.lender,
        transactionHash: receipt.transactionHash,
        loanTerms: {
          amount: offer.amount.toString(),
          asset: 'ETH',
          interestRatePerSecond: offer.interestRatePerSecond.toString(),
          duration: offer.duration,
          loanBeginTimestamp: newLoan.loanBeginTimestamp,
          loanEndTimestamp: newLoan.loanEndTimestamp,
        },
      });

      await saveTransactionInDb({
        chainId,
        from: receipt.from,
        transactionType: transactionTypes.LOAN_REFINANCED_BY_BORROWER,
        timestamp: transactionTimestamp,
        transactionHash: receipt.transactionHash,
        lender: newLoan.lender,
        borrower: newLoan.nftOwner,
        data: {
          nftContractAddress: ethers.utils.getAddress(nftContractAddress),
          nftId,
          oldLoanBeginTimestamp: oldLoan.loanBeginTimestamp,
          newLoanBeginTimestamp: newLoan.loanBeginTimestamp,
        },
      });

      await updateLoanStatus({
        chainId,
        nftContractAddress,
        nftId,
        loanBeginTimestamp: oldLoan.loanBeginTimestamp,
        status: 'REFINANCED',
        transactionTimestamp,
        transactionHash: receipt.transactionHash,
      });

      dispatch(increment());

      return { receipt };
    },
  };
};
