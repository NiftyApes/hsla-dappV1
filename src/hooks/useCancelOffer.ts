import { useAppDispatch } from 'app/hooks';
import { increment } from 'counter/counterSlice';
import { useOffersContract } from './useContracts';

export const useCancelOffer = ({
  nftContractAddress,
  nftId,
  offerHash,
}: {
  nftContractAddress?: string;
  nftId: string;
  offerHash: string;
}) => {
  const niftyApesContract = useOffersContract();

  const dispatch = useAppDispatch();

  if (!niftyApesContract) {
    return {
      seizeAsset: undefined,
    };
  }

  return {
    cancelOffer: async () => {
      if (!nftContractAddress) {
        throw new Error('NFT Contract Address not specified');
      }
      const tx = await niftyApesContract.removeOffer(nftContractAddress, nftId, offerHash, true);

      await tx.wait();

      dispatch(increment());
    },
  };
};
