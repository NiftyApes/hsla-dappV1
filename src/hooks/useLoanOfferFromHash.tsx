import { useEffect, useState } from 'react';
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

  const [loanOffer, setLoanOffer] = useState<any>();

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

      setLoanOffer(result);
    }
  }, [niftyApesContract, nftContractAddress]);

  return loanOffer;
};
