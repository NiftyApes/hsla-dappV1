import { useAppDispatch } from 'app/hooks';
import { increment } from 'counter/counterSlice';
import { saveLoanInDb } from 'helpers/saveLoanInDb';
import { saveTransactionInDb } from 'helpers/saveTransactionInDb';
import { useLendingContract } from './useContracts';
import { useWalletProvider } from './useWalletProvider';

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
  const walletProvider = useWalletProvider();

  const niftyApesContract = useLendingContract();

  const dispatch = useAppDispatch();

  if (!niftyApesContract) {
    return {
      executeLoanByBorrower: undefined,
    };
  }

  return {
    executeLoanByBorrower: async () => {
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

      const offerObj = {
        creator: offer.creator,
        nftContractAddress: offer.nftContractAddress,
        nftId: offer.nftId.toString(),
        amount: offer.amount.toString(),
      };

      await saveLoanInDb({
        loanObj: offerObj,
      });

      const block: any = await walletProvider?.request({
        method: 'eth_getBlockByNumber',
        params: [`0x${receipt.blockNumber.toString(16)}`, false],
      });

      const timestamp = Number(block.timestamp);

      await saveTransactionInDb({
        transactionHash: receipt.transactionHash,
        from: receipt.from,
        transactionType: 'LOAN_EXECUTED_BY_BORROWER',
        timestamp,
        borrower: offer.nftOwner,
        lender: offer.creator,
        args: {
          lender: offer.creator,
          nftContractAddress: offer.nftContractAddress,
          nftId,
          floorTerm,
          amount: offer.amount.toString(),
          asset: 'ETH',
          interestRatePerSecond: offer.interestRatePerSecond.toString(),
          duration: offer.duration.toString(),
        },
      });

      dispatch(increment());
    },
  };
};
