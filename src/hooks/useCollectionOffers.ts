/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-await-in-loop */
import { getOffersByCollection } from 'api/getOffersByCollection';
import { getSignatureOffersByCollection } from 'api/getSignatureOffersByCollection';
import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { getLoanOfferFromHash } from 'helpers/getLoanOfferFromHash';
import { getFloorOfferCountFromHash } from 'helpers/getOfferCountLeftFromHash';
import { loanOffer } from 'loan';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useChainId } from './useChainId';
import { useOffersContract } from './useContracts';

export const useCollectionOffers = ({
  nftContractAddress,
}: {
  nftContractAddress?: string;
}) => {
  const [offers, setOffers] = useState<any>();

  const cacheCounter = useAppSelector((state: RootState) => state.counter);
  const offersContract = useOffersContract();

  const chainId = useChainId();

  useEffect(() => {
    async function fetchLoanOffersForNFT() {
      if (!offersContract || !nftContractAddress) {
        return;
      }

      const offers = await getOffersByCollection({
        chainId,
        nftContractAddress,
      });

      // Don't load on-chain offers for disconnected wallets
      for (let i = 0; i < offers.length; i++) {
        const { offerHash } = offers[i];

        const floorOfferCount = await getFloorOfferCountFromHash({
          offersContract,
          offerHash,
        });

        const offerFromChain = await getLoanOfferFromHash({
          offersContract,
          nftContractAddress,
          // all collection offers have nftId 0
          nftId: '0',
          offerHash,
          floorTerm: offers[i].offer.floorTerm,
        });

        // Remove offer if any of the following obtains
        if (!floorOfferCount || !offerFromChain) {
          offers[i] = undefined;
        } else if (
          // This happens when there isn't an offer with this hash
          offerFromChain.creator ===
          '0x0000000000000000000000000000000000000000'
        ) {
          offers[i] = undefined;
        } else if (
          // Ignore offers that are out of punches
          floorOfferCount.toNumber() >= offerFromChain.floorTermLimit.toNumber()
        ) {
          offers[i] = undefined;
        } else {
          offers[i] = {
            ...offers[i],
            offer: {
              ...offers[i].offer,
              floorOfferCount: floorOfferCount.toNumber(),
              floorTermLimit: offerFromChain.floorTermLimit.toNumber(),
            },
          };
        }
      }

      const filteredOffers = _.compact(offers);

      const sigOffers = await getSignatureOffersByCollection({
        chainId,
        nftContractAddress,
      });

      for (let i = 0; i < sigOffers.length; i++) {
        const sigOffer = sigOffers[i];

        const isCancelledOrFinalized =
          await offersContract.getOfferSignatureStatus(sigOffer.Signature);

        if (isCancelledOrFinalized) {
          continue;
        }

        const offerWithAddedFields = loanOffer({
          offer: { ...sigOffer.Offer, offerHash: sigOffer.OfferHash },
          ...sigOffer.Offer,
          OfferAttempt: sigOffer.Offer,
          OfferTerms: {
            Amount: sigOffer.Offer.amount,
            InterestRatePerSecond: sigOffer.Offer.interestRatePerSecond,
            Expiration: sigOffer.Offer.expiration,
            Duration: sigOffer.Offer.duration,
            OfferStatus: 'ACTIVE',
            FloorTerm: true,
          },
          OfferHash: sigOffer.OfferHash,
          signature: sigOffer.Signature,
        });

        filteredOffers.push(offerWithAddedFields);
      }

      setOffers(filteredOffers);
    }

    fetchLoanOffersForNFT();
  }, [nftContractAddress, offersContract, chainId, cacheCounter]);

  if (!offers) {
    return undefined;
  }

  // sort by createdAt, but components that use this hook, like OfferBook
  // probably have their own sorting method
  return _.sortBy(offers, (o) => -o.offer.expiration).map((o) => o.offer);
};
