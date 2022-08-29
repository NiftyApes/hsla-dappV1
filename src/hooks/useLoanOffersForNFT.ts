import { getOffersByNft } from 'api/getOffersByNft';
import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { getLoanOfferFromHash } from 'helpers/getLoanOfferFromHash';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { getOffersContract } from '../helpers/getContracts';
import { useWalletProvider } from './useWalletProvider';

export const useLoanOffersForNFT = ({
  nftContractAddress,
  nftId,
}: {
  nftContractAddress?: string;
  nftId: string;
}) => {
  const [offers, setOffers] = useState<any>();

  const cacheCounter = useAppSelector((state: RootState) => state.counter);

  const provider = useWalletProvider();
  const niftyApesContract = provider ? getOffersContract({ provider }) : null;

  useEffect(() => {
    async function fetchLoanOffersForNFT() {
      if (!niftyApesContract || !nftId || !nftContractAddress) {
        return;
      }

      const offers = await getOffersByNft({ nftContractAddress, nftId });

      // remove any offers not found on-chain
      for (let i = 0; i < offers.length; i++) {
        const offerHash = offers[i].offerHash;

        const offerFromChain = await getLoanOfferFromHash({
          offersContract: niftyApesContract,
          nftContractAddress,
          nftId,
          offerHash,
          floorTerm: offers[i].offer.floorTerm,
        });

        if (!offerFromChain || offerFromChain[0] === '0x0000000000000000000000000000000000000000') {
          offers[i] = undefined;
        }
      }

      const filteredOffers = _.compact(offers);

      setOffers(filteredOffers);
    }

    fetchLoanOffersForNFT();
  }, [nftId, nftContractAddress, niftyApesContract, cacheCounter]);

  if (!offers) {
    return undefined;
  }

  return offers;
};
