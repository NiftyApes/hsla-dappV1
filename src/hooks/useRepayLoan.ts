import { updateLoanStatus } from 'api/updateLoanStatus';
import { useAppDispatch } from 'app/hooks';
import { transactionTypes } from 'constants/transactionTypes';

import { increment } from 'counter/counterSlice';
import { BigNumber } from 'ethers';
import { saveTransactionInDb } from 'helpers/saveTransactionInDb';
import { useLendingContract } from './useContracts';
import { useGetTransactionTimestamp } from './useGetTransactionTimestamp';

export const useRepayLoanByBorrower = ({
  nftContractAddress,
  nftId,
  amount,
}: {
  nftContractAddress?: string;
  nftId: string;
  amount: BigNumber;
}) => {
  const niftyApesContract = useLendingContract();

  const dispatch = useAppDispatch();

  const { getTransactionTimestamp } = useGetTransactionTimestamp();

  if (!niftyApesContract) {
    return {
      executeLoanByBorrower: undefined,
    };
  }

  return {
    repayLoanByBorrower: async () => {
      if (!nftContractAddress) {
        throw new Error('NFT Contract Address not specified');
      }

      const loan = await niftyApesContract.getLoanAuction(nftContractAddress, nftId);

      const tx = await niftyApesContract.repayLoan(nftContractAddress, nftId, {
        value: amount,
      });

      const receipt = await tx.wait();

      const transactionTimestamp = await getTransactionTimestamp(receipt);

      const totalPayment = (receipt as any).events[6].args.totalPayment.toString();

      await saveTransactionInDb({
        from: receipt.from,
        transactionType: transactionTypes.LOAN_FULLY_REPAID_BY_BORROWER,
        timestamp: transactionTimestamp,
        transactionHash: receipt.transactionHash,
        lender: (receipt as any).events[6].args.lender,
        borrower: (receipt as any).events[6].args.borrower,
        data: {
          amount: totalPayment,
          asset: 'ETH',
          nftContractAddress,
          nftId,
        },
      });

      await updateLoanStatus({
        nftContractAddress,
        nftId,
        loanBeginTimestamp: loan.loanBeginTimestamp,
        status: 'FULLY_REPAID',
        transactionTimestamp,
        transactionHash: receipt.transactionHash,
      });

      dispatch(increment());
    },
  };
};
