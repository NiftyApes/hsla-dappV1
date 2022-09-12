import { getActiveOffersByLender } from 'api/getActiveOffersByLender';
import { getAllOffersByLender } from 'api/getAllOffersByLender';
import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { getLoanOfferFromHash } from 'helpers/getLoanOfferFromHash';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { getOffersContract } from '../helpers/getContracts';
import { useWalletProvider } from './useWalletProvider';

export const useOffersForLender = ({
  lenderAddress,
  onlyActive,
}: {
  lenderAddress?: string;
  onlyActive?: boolean;
}) => {
  const [offers, setOffers] = useState<any>();

  const cacheCounter = useAppSelector((state: RootState) => state.counter);

  const provider = useWalletProvider();
  const niftyApesContract = provider ? getOffersContract({ provider }) : null;

  useEffect(() => {
    async function fetchLoanOffersForNFT() {
      if (!niftyApesContract || !lenderAddress) {
        return;
      }

      const offers = onlyActive
        ? await getActiveOffersByLender({ lenderAddress })
        : await getAllOffersByLender({ lenderAddress });

      for (let i = 0; i < offers.length; i++) {
        const { offerHash, offer } = offers[i];

        const { nftId, nftContractAddress, floorTerm } = offer;

        const offerFromChain = await getLoanOfferFromHash({
          offersContract: niftyApesContract,
          nftContractAddress,
          nftId,
          offerHash,
          floorTerm,
        });

        if (!offerFromChain || offerFromChain[0] === '0x0000000000000000000000000000000000000000') {
          offers[i] = undefined;
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
