import { useEffect, useState } from 'react';
import { useOffersContract } from './useContracts';

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
  const offersContract = useOffersContract();

  const [loanOffer, setLoanOffer] = useState<any>();

  useEffect(() => {
    async function getLoanOffer() {
      if (!offersContract) {
        return;
      }

      if (!nftContractAddress) {
        throw new Error('NFT Contract Address not specified');
      }

      const result = await offersContract.getOffer(
        nftContractAddress,
        nftId,
        offerHash,
        floorTerm,
      );

      setLoanOffer(result);
    }

    if (offersContract && nftContractAddress) {
      getLoanOffer();
    }
  }, [offersContract, nftContractAddress]);

  return loanOffer;
};
