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

export const usePartiallyRepayLoanByBorrower = ({
  nftContractAddress,
  nftId,
  amount,
}: {
  nftContractAddress?: string;
  nftId?: string;
  amount: number;
}) => {
  const lendingContract = useLendingContract();

  const dispatch = useAppDispatch();

  const { getTransactionTimestamp } = useGetTransactionTimestamp();

  const chainId = useChainId();

  // Constantly getting errors parsing into BigNumber
  let amountInWei: BigNumber;
  try {
    amountInWei = ethers.utils.parseEther(amount.toPrecision(2));
  } catch (e) {
    amountInWei = BigNumber.from(0);
    console.log('Error parsing amount: ', e);
  }

  if (!nftContractAddress || !nftId || !lendingContract) {
    return {
      partiallyRepayLoanByBorrower: undefined,
    };
  }

  return {
    partiallyRepayLoanByBorrower: async () => {
      if (!nftContractAddress) {
        throw new Error('NFT Contract Address not specified');
      }

      const gasEstimate = await lendingContract.estimateGas.partialRepayLoan(
        nftContractAddress,
        nftId,
        amountInWei,
        {
          value: amountInWei,
        },
      );

      const tx = await lendingContract.partialRepayLoan(
        nftContractAddress,
        nftId,
        amountInWei,
        {
          value: amountInWei,
          gasLimit: Math.ceil(1.2 * gasEstimate.toNumber()),
        },
      );

      const receipt: any = await tx.wait();

      if (receipt.status !== 1) {
        throw new ErrorWithReason('reason: revert');
      }

      const transactionTimestamp = await getTransactionTimestamp(receipt);

      const loanPartiallyRepaidEvent = getEventFromReceipt({
        eventName: 'PartialRepayment',
        receipt,
        abi: NiftyApesLendingDeploymentJSON.abi,
      });

      const partialPaymentAmount =
        loanPartiallyRepaidEvent.args.amount.toString();

      const loan = loanPartiallyRepaidEvent.args.loanAuction;

      dispatch(
        fetchLoanAuctionByNFT({
          id: nftId,
          contractAddress: nftContractAddress,
        } as NFT),
      );

      await saveTransactionInDb({
        chainId,
        from: receipt.from,
        transactionType: transactionTypes.LOAN_PARTIALLY_REPAID_BY_BORROWER,
        timestamp: transactionTimestamp,
        transactionHash: receipt.transactionHash,
        lender: loan.lender,
        borrower: loan.nftOwner,
        data: {
          amount: partialPaymentAmount,
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
        status: 'PARTIALLY_REPAID',
        transactionTimestamp,
        transactionHash: receipt.transactionHash,
      });

      dispatch(increment());

      return { receipt };
    },
  };
};
