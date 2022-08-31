import { useAppDispatch } from 'app/hooks';
import { transactionTypes } from 'constants/transactionTypes';
import { increment } from 'counter/counterSlice';
import { saveLoanInDb } from 'helpers/saveLoanInDb';
import { saveTransactionInDb } from 'helpers/saveTransactionInDb';
import { useLendingContract } from './useContracts';
import { useGetTransactionTimestamp } from './useGetTransactionTimestamp';
import { useWalletAddress } from './useWalletAddress';

export const useExecuteLoanByBorrower = ({
  nftContractAddress,
  nftId,
  offerHash,
  floorTerm = false,
}: {
  nftContractAddress?: string;
  nftId: string;
  offerHash: string;
  floorTerm?: boolean;
}) => {
  const address = useWalletAddress();
  const niftyApesContract = useLendingContract();

  const dispatch = useAppDispatch();

  const { getTransactionTimestamp } = useGetTransactionTimestamp();

  if (!niftyApesContract) {
    return {
      executeLoanByBorrower: undefined,
    };
  }

  return {
    executeLoanByBorrower: async () => {
      if (!address) {
        throw new Error('No address to send txn from');
      }

      if (!nftContractAddress) {
        throw new Error('NFT Contract Address not specified');
      }

      const tx = await niftyApesContract.executeLoanByBorrower(
        nftContractAddress,
        nftId,
        offerHash,
        floorTerm,
      );

      const receipt: any = await tx.wait();

      const offer = receipt.events[6].args[2];

      const loan = await niftyApesContract.getLoanAuction(nftContractAddress, nftId);

      await saveLoanInDb({
        nftContractAddress,
        nftId,
        lastUpdatedTimestamp: loan.lastUpdatedTimestamp,
        creator: offer.creator,
        borrower: address,
        lender: offer.creator,
        loanTerms: {
          amount: offer.amount.toString(),
          asset: 'ETH',
          interestRatePerSecond: offer.interestRatePerSecond.toString(),
          duration: offer.duration,
          loanBeginTimestamp: loan.loanBeginTimestamp,
          loanEndTimestamp: loan.loanEndTimestamp,
        },
      });

      const timestamp = await getTransactionTimestamp(receipt);

      await saveTransactionInDb({
        transactionHash: receipt.transactionHash,
        from: receipt.from,
        transactionType: transactionTypes.LOAN_CREATED,
        timestamp,
        borrower: offer.nftOwner,
        lender: offer.creator,
        data: {
          lender: offer.creator,
          nftContractAddress: offer.nftContractAddress,
          nftId,
          floorTerm,
          amount: offer.amount.toString(),
          asset: 'ETH',
          interestRatePerSecond: offer.interestRatePerSecond.toString(),
          duration: offer.duration,
        },
      });

      dispatch(increment());
    },
  };
};
