import { updateLoanStatus } from 'api/updateLoanStatus';
import { useAppDispatch } from 'app/hooks';
import { transactionTypes } from 'constants/transactionTypes';

import { increment } from 'counter/counterSlice';
import { BigNumber, ethers } from 'ethers';
import { saveTransactionInDb } from 'helpers/saveTransactionInDb';
import { fetchLoanAuctionByNFT } from 'loan';
import { NFT } from 'nft';
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

      console.log('amount', amount.toString());

      const tx = await niftyApesContract.repayLoan(nftContractAddress, nftId, {
        value: amount,
      });

      const receipt: any = await tx.wait();

      const transactionTimestamp = await getTransactionTimestamp(receipt);

      const totalPayment =
        chainId === '0x7a69'
          ? receipt.events[6].args.totalPayment.toString()
          : chainId === '0x5'
          ? receipt.events[5].args.totalPayment.toString()
          : null;

      const loan =
        chainId === '0x7a69'
          ? receipt.events[6].args.loanAuction
          : chainId === '0x5'
          ? receipt.events[5].args.loanAuction
          : null;

      dispatch(fetchLoanAuctionByNFT({ id: nftId, contractAddress: nftContractAddress } as NFT));

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
    },
  };
};
