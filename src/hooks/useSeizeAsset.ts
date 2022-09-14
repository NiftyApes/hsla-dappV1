import { useAppDispatch } from 'app/hooks';
import { increment } from 'counter/counterSlice';
import { useLendingContract } from './useContracts';

export const useSeizeAsset = ({
  nftContractAddress,
  nftId,
}: {
  nftContractAddress?: string;
  nftId: string;
}) => {
  const niftyApesContract = useLendingContract();

  const dispatch = useAppDispatch();

  if (!niftyApesContract) {
    return {
      seizeAsset: undefined,
    };
  }

  return {
    seizeAsset: async () => {
      if (!nftContractAddress) {
        throw new Error('NFT Contract Address not specified');
      }
      const tx = await niftyApesContract.seizeAsset(nftContractAddress, nftId);

      await tx.wait();

      dispatch(increment());
    },
  };
};
