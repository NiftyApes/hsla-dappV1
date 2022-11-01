/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-shadow */
import { getActiveOffersByLender } from 'api/getActiveOffersByLender';
import { getAllOffersByLender } from 'api/getAllOffersByLender';
import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { getLoanOfferFromHash } from 'helpers/getLoanOfferFromHash';
import { getFloorOfferCountFromHash } from 'helpers/getOfferCountLeftFromHash';
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

      setOffers(filteredOffers);
    }

    fetchLoanOffersForNFT();
  }, [lenderAddress, cacheCounter]);

  if (!offers) {
    return undefined;
  }

  return offers;
};
