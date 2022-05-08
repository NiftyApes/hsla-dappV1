import { useEffect } from 'react';
import { useNiftyApesContract } from './useNiftyApesContract';

export const useLoanOfferFromHash = ({
  nftContractAddress,
  nftId,
  offerHash,
  floorTerm = false,
}: {
  nftContractAddress?: string;
  nftId: number;
  offerHash: string;
  floorTerm?: boolean;
}) => {
  const niftyApesContract = useNiftyApesContract();

  useEffect(() => {
    if (niftyApesContract && nftContractAddress) {
      getLoanOffer();
    }

    async function getLoanOffer() {
      if (!niftyApesContract) {
        return;
      }

      const result = await niftyApesContract.getOffer(
        nftContractAddress,
        nftId,
        offerHash,
        floorTerm,
      );
      console.log(nftContractAddress, nftId, offerHash, floorTerm, result);
    }
  }, [niftyApesContract, nftContractAddress]);

  return {};
};
