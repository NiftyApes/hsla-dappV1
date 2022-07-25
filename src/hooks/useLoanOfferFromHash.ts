import { useEffect, useState } from 'react';
import { useWalletProvider } from './useWalletProvider';
import { getOffersContract } from '../helpers/getLendingContract';

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
  const provider = useWalletProvider();
  const niftyApesContract = provider ? getOffersContract({ provider }) : null;

  const [loanOffer, setLoanOffer] = useState<any>();

  useEffect(() => {
    if (niftyApesContract && nftContractAddress) {
      getLoanOffer();
    }

    async function getLoanOffer() {
      if (!niftyApesContract) {
        return;
      }

      if (!nftContractAddress) {
        throw new Error('NFT Contract Address not specified');
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
