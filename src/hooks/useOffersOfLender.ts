/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-shadow */
import { getActiveOffersByLender } from 'api/getActiveOffersByLender';
import { getActiveSignatureOffersByLender } from 'api/getActiveSignatureOffersByLender';
import { getAllOffersByLender } from 'api/getAllOffersByLender';
import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { getLoanOfferFromHash } from 'helpers/getLoanOfferFromHash';
import { getFloorOfferCountFromHash } from 'helpers/getOfferCountLeftFromHash';
import { getFloorSignatureOfferCountLeftFromSignature } from 'helpers/getSignatureOfferCountLeftFromSignature';

import { loanOffer } from 'loan';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useChainId } from './useChainId';
import { useOffersContract } from './useContracts';

export const useOffersForLender = ({
  lenderAddress,
  onlyActive,
}: {
  lenderAddress?: string;
  onlyActive?: boolean;
}) => {
  const [offers, setOffers] = useState<any>();

  const cacheCounter = useAppSelector((state: RootState) => state.counter);

  const offersContract = useOffersContract();

  const chainId = useChainId();

  useEffect(() => {
    async function fetchLoanOffersForNFT() {
      if (!offersContract || !lenderAddress) {
        return;
      }

      const offers = onlyActive
        ? await getActiveOffersByLender({ chainId, lenderAddress })
        : await getAllOffersByLender({ chainId, lenderAddress });

      for (let i = 0; i < offers.length; i++) {
        const { offerHash, offer } = offers[i];

        const { nftId, nftContractAddress, floorTerm } = offer;

        const floorOfferCount = await getFloorOfferCountFromHash({
          offersContract,
          offerHash,
        });

        const offerFromChain = await getLoanOfferFromHash({
          offersContract,
          nftContractAddress,
          nftId,
          offerHash,
          floorTerm,
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

      const sigOffers = await getActiveSignatureOffersByLender({
        chainId,
        lenderAddress,
      });

      for (let i = 0; i < sigOffers.length; i++) {
        const sigOffer = sigOffers[i];

        const isCanceledOrFinalized =
          await offersContract.getOfferSignatureStatus(sigOffer.Signature);

        if (isCanceledOrFinalized) {
          continue;
        }

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

        const offerWithAddedFields = loanOffer({
          offer: sigOffer.Offer,
          ...sigOffer.Offer,
          floorOfferCount,
          OfferAttempt: sigOffer.Offer,
          OfferTerms: {
            Amount: sigOffer.Offer.amount,
            InterestRatePerSecond: sigOffer.Offer.interestRatePerSecond,
            Expiration: sigOffer.Offer.expiration,
            Duration: sigOffer.Offer.duration,
            OfferStatus: 'ACTIVE',
            FloorTerm: true,
          },
          offerHash: sigOffer.OfferHash,
          signature: sigOffer.Signature,
        });

        filteredOffers.push({ offer: offerWithAddedFields });
      }

      setOffers(filteredOffers);
    }

    fetchLoanOffersForNFT();
  }, [lenderAddress, cacheCounter]);

  if (!offers) {
    return undefined;
  }

  return offers;
};
