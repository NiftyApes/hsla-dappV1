import { updateLoanStatus } from 'api/updateLoanStatus';
import { useAppDispatch } from 'app/hooks';
import { transactionTypes } from 'constants/transactionTypes';

import { increment } from 'counter/counterSlice';
import { ErrorWithReason } from 'errors';
import { BigNumber, ethers } from 'ethers';
import { getEventFromReceipt } from 'helpers/getEventFromReceipt';
import { saveTransactionInDb } from 'helpers/saveTransactionInDb';
import { fetchLoanAuctionByNFT } from 'loan';
import { NFT } from 'nft';
import NiftyApesLendingDeploymentJSON from '../generated/deployments/localhost/NiftyApesLending.json';
import { useChainId } from './useChainId';
import { useLendingContract } from './useContracts';
import { useGetTransactionTimestamp } from './useGetTransactionTimestamp';

export const useRepayLoanByBorrower = ({
  nftContractAddress,
  nftId,
  amount,
}: {
  nftContractAddress?: string;
  nftId?: string;
  amount: BigNumber;
}) => {
  const niftyApesContract = useLendingContract();

  const dispatch = useAppDispatch();

  const { getTransactionTimestamp } = useGetTransactionTimestamp();

  const chainId = useChainId();

  if (!niftyApesContract || !nftId) {
    return {
      executeLoanByBorrower: undefined,
    };
  }

  return {
    repayLoanByBorrower: async () => {
      if (!nftContractAddress) {
        throw new Error('NFT Contract Address not specified');
      }

      const gasEstimate = await niftyApesContract.estimateGas.repayLoan(
        nftContractAddress,
        nftId,
        {
          value: amount,
        },
      );

      const tx = await niftyApesContract.repayLoan(nftContractAddress, nftId, {
        value: amount,
        gasLimit: Math.ceil(1.2 * gasEstimate.toNumber()),
      });

      const receipt: any = await tx.wait();

      if (receipt.status !== 1) {
        throw new ErrorWithReason('reason: revert');
      }

      const transactionTimestamp = await getTransactionTimestamp(receipt);

      const loanRepaidEvent = getEventFromReceipt({
        eventName: 'LoanRepaid',
        receipt,
        abi: NiftyApesLendingDeploymentJSON.abi,
      });

      const totalPayment = loanRepaidEvent.args.totalPayment.toString();

      const loan = loanRepaidEvent.args.loanAuction;

      dispatch(
        fetchLoanAuctionByNFT({
          id: nftId,
          contractAddress: nftContractAddress,
        } as NFT),
      );

      await saveTransactionInDb({
        chainId,
        from: receipt.from,
        transactionType: transactionTypes.LOAN_FULLY_REPAID_BY_BORROWER,
        timestamp: transactionTimestamp,
        transactionHash: receipt.transactionHash,
        lender: loan.lender,
        borrower: loan.nftOwner,
        data: {
          amount: totalPayment,
          asset: 'ETH',
          nftContractAddress: ethers.utils.getAddress(nftContractAddress),
          nftId,
        },
      });

      await updateLoanStatus({
        chainId,
        nftContractAddress,
        nftId,
        loanBeginTimestamp: loan.loanBeginTimestamp,
        status: 'FULLY_REPAID',
        transactionTimestamp,
        transactionHash: receipt.transactionHash,
      });

      dispatch(increment());

      return { receipt };
    },
  };
};
