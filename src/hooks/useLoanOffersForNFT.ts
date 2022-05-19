import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { BigNumber } from 'ethers';
import { getLoanOfferFromHash } from 'helpers/getLoanOfferFromHash';
import { useEffect, useState } from 'react';
import { useNiftyApesContract } from './useNiftyApesContract';
import _ from 'lodash';

export const useLoanOffersForNFT = ({
  nftContractAddress,
  nftId,
}: {
  nftContractAddress?: string;
  nftId: number;
}) => {
  const [offers, setOffers] = useState<any>();

  const cacheCounter = useAppSelector((state: RootState) => state.counter);

  const niftyApesContract = useNiftyApesContract();

  useEffect(() => {
    async function fetchLoanOffersForNFT() {
      if (!niftyApesContract || !nftId || !nftContractAddress) {
        return;
      }

      const result = await fetch(
        `https://qqxeqsrt39.execute-api.us-west-2.amazonaws.com/DEV/api/offers?nftContractAddress=${nftContractAddress}`,
      );

      const json = await result.json();

      const processedOffers = json.Items.filter(
        (item: any) => item.OfferTerms.NftId == nftId || item.OfferTerms.FloorTerm,
      ).map((item: any) => {
        return {
          offer: {
            amount: BigNumber.from(String(item.OfferTerms.Amount)),
            expiration: Number(item.OfferTerms.Expiration),
            interestRatePerSecond: item.OfferTerms.InterestRatePerSecond,
            floorTerm: item.OfferTerms.FloorTerm,
          },
          offerHash: item.OfferHash,
        };
      });

      console.log('processedOffers', processedOffers);

      for (let i = 0; i < processedOffers.length; i++) {
        const offerHash = processedOffers[i].offerHash;

        console.log('INFO TO FETCH FROM CHAIN', {
          nftId: nftId,
          offerHash,
        });

        const offerFromChain = await getLoanOfferFromHash({
          niftyApesContract,
          nftContractAddress,
          nftId,
          offerHash,
          floorTerm: processedOffers[i].offer.floorTerm,
        });

        console.log('offerFromChain', offerFromChain);

        if (offerFromChain[0] === '0x0000000000000000000000000000000000000000') {
          processedOffers[i] = undefined;
        }
      }

      const filteredOffers = _.compact(processedOffers);

      setOffers(filteredOffers);
    }

    fetchLoanOffersForNFT();
  }, [nftId, nftContractAddress, niftyApesContract, cacheCounter]);

  if (!offers) {
    return undefined;
  }

  return offers;
};
