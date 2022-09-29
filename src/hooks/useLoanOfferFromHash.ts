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
    if (offersContract && nftContractAddress) {
      getLoanOffer();
    }

    async function getLoanOffer() {
      if (!offersContract) {
        return;
      }

      if (!nftContractAddress) {
        throw new Error('NFT Contract Address not specified');
      }

      const result = await offersContract.getOffer(nftContractAddress, nftId, offerHash, floorTerm);

      setLoanOffer(result);
    }
  }, [offersContract, nftContractAddress]);

  return loanOffer;
};
