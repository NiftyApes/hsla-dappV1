import { useAppDispatch } from 'app/hooks';
import { increment } from 'counter/counterSlice';
import { useLendingContract } from './useContracts';

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

      await tx.wait();

      dispatch(increment());
    },
  };
};
