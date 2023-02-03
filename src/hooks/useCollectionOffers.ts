/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-await-in-loop */
import { getOffersByCollection } from 'api/getOffersByCollection';
import { getSignatureOffersForCollectionIncludingTokenSpecific } from 'api/getSignatureOffersForCollectionIncludingTokenSpecific';
import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { getLoanOfferFromHash } from 'helpers/getLoanOfferFromHash';
import { getFloorOfferCountFromHash } from 'helpers/getOfferCountLeftFromHash';
import { getFloorSignatureOfferCountLeftFromSignature } from 'helpers/getSignatureOfferCountLeftFromSignature';
import { loanOffer } from 'loan';
import _ from 'lodash';
import { useFilterSignatureOffersByPunches } from 'providers/hooks/useFilterSignatureOffersByPunches';
import { useEffect, useState } from 'react';
import { useChainId } from './useChainId';
import { isMainnet, useOffersContract } from './useContracts';

export const useCollectionOffers = ({
  nftContractAddress,
}: {
  nftContractAddress?: string;
}) => {
  const [offers, setOffers] = useState<any>();

  const cacheCounter = useAppSelector((state: RootState) => state.counter);
  const offersContract = useOffersContract();

  const chainId = useChainId();

  const { filterSignatureOffers } = useFilterSignatureOffersByPunches();

  useEffect(() => {
    async function fetchLoanOffersForNFT() {
      if (
        !nftContractAddress ||
        (isMainnet(chainId) && !filterSignatureOffers)
      ) {
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
          nftId: offers[i].offer.nftId,
          offerHash,
          floorTerm: offers[i].offer.floorTerm,
        });

        // Remove offer if any of the following obtains
        if (offerFromChain === undefined || floorOfferCount === undefined) {
          offers[i] = undefined;
        } else if (
          // This happens when there isn't an offer with this hash
          offerFromChain.creator ===
          '0x0000000000000000000000000000000000000000'
        ) {
          offers[i] = undefined;
        } else if (
          // Ignore offers that are out of punches
          offerFromChain.floorTerm &&
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

      const sigOffers =
        await getSignatureOffersForCollectionIncludingTokenSpecific({
          chainId,
          nftContractAddress,
        });

      // if on mainnet, filter using provider
      // when we expand dApp provider to Goerli,
      // we can drop chain restriction
      let filteredSigOffers = sigOffers;
      if (isMainnet(chainId) && filterSignatureOffers) {
        filteredSigOffers = filterSignatureOffers(sigOffers);
      }

      for (let i = 0; i < filteredSigOffers.length; i++) {
        const sigOffer = filteredSigOffers[i];

        // if not on mainnet, filter using on-chain data about punches
        if (!isMainnet(chainId)) {
          const floorOfferCount =
            await getFloorSignatureOfferCountLeftFromSignature({
              offersContract,
              signature: sigOffer.Signature,
            });

          // Ignore offers that are out of punches
          if (
            sigOffer.Offer.floorTerm &&
            floorOfferCount &&
            floorOfferCount.toNumber() >= sigOffer.Offer.floorTermLimit
          ) {
            continue;
          }
        }

        const offerWithAddedFields = loanOffer({
          offer: {
            ...sigOffer.Offer,
            offerHash: sigOffer.OfferHash,
          },
          ...sigOffer.Offer,

          OfferAttempt: sigOffer.Offer,
          OfferTerms: {
            Amount: sigOffer.Offer.amount,
            InterestRatePerSecond: sigOffer.Offer.interestRatePerSecond,
            Expiration: sigOffer.Offer.expiration,
            Duration: sigOffer.Offer.duration,
            OfferStatus: 'ACTIVE',
            FloorTerm: sigOffer.Offer.floorTerm,
          },
          OfferHash: sigOffer.OfferHash,
          signature: sigOffer.Signature,
        });

        filteredOffers.push(offerWithAddedFields);
      }

      setOffers(filteredOffers);
    }

    fetchLoanOffersForNFT();
  }, [
    nftContractAddress,
    offersContract,
    chainId,
    filterSignatureOffers,
    cacheCounter,
  ]);

  if (!offers) {
    return undefined;
  }

  // sort by createdAt, but components that use this hook, like OfferBook
  // probably have their own sorting method
  return _.sortBy(offers, (o) => -o.offer.expiration).map((o) => o.offer);
};
