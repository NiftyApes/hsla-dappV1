import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { BigNumber } from 'ethers';
import { getApiUrl } from 'helpers';
import { getLoanOfferFromHash } from 'helpers/getLoanOfferFromHash';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { getOffersContract } from '../helpers/getContracts';
import { useWalletProvider } from './useWalletProvider';

export const useCollectionOffers = ({ nftContractAddress }: { nftContractAddress?: string }) => {
  const [offers, setOffers] = useState<any>();

  const cacheCounter = useAppSelector((state: RootState) => state.counter);

  const provider = useWalletProvider();
  const niftyApesContract = provider ? getOffersContract({ provider }) : null;

  useEffect(() => {
    async function fetchLoanOffersForNFT() {
      if (!niftyApesContract || !nftContractAddress) {
        return;
      }

      const result = await fetch(getApiUrl(`offers?nftContractAddress=${nftContractAddress}`));

      const json = await result.json();

      const processedOffers = json.Items.map((item: any) => {
        return {
          offer: {
            amount: BigNumber.from(String(item.OfferTerms.Amount)),
            duration: Number(item.OfferTerms.Duration),
            expiration: Number(item.OfferTerms.Expiration),
            interestRatePerSecond: item.OfferTerms.InterestRatePerSecond,
            floorTerm: item.OfferTerms.FloorTerm,
            createdAt: item.CreatedAt,
            creator: item.Creator,
            offerHash: item.OfferHash,
          },
          offerHash: item.OfferHash,
        };
      });

      for (let i = 0; i < processedOffers.length; i++) {
        const offerHash = processedOffers[i].offerHash;

        const offerFromChain = await getLoanOfferFromHash({
          offersContract: niftyApesContract,
          nftContractAddress,
          // all collection offers have nftId 0
          nftId: '0',
          offerHash,
          floorTerm: processedOffers[i].offer.floorTerm,
        });

        if (!offerFromChain || offerFromChain[0] === '0x0000000000000000000000000000000000000000') {
          processedOffers[i] = undefined;
        }
      }

      const filteredOffers = _.compact(processedOffers);

      setOffers(filteredOffers);
    }

    fetchLoanOffersForNFT();
  }, [nftContractAddress, niftyApesContract, cacheCounter]);

  if (!offers) {
    return undefined;
  }

  // sort by createdAt, but components that use this hook, like OfferBook
  // probably have their own sorting method
  return _.sortBy(offers, (o) => -o.offer.createdAt).map((o) => o.offer);
};
