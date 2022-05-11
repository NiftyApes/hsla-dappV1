import { useAppDispatch } from 'app/hooks';
import { increment } from 'counter/counterSlice';
import { useNiftyApesContract } from './useNiftyApesContract';

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
  const niftyApesContract = useNiftyApesContract();

  const dispatch = useAppDispatch();

  if (!niftyApesContract) {
    return {
      executeLoanByBorrower: undefined,
    };
  }

  return {
    executeLoanByBorrower: async () => {
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
