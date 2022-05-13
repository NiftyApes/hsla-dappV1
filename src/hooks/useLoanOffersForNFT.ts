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
        `https://qqxeqsrt39.execute-api.us-west-2.amazonaws.com/api/offer?status=ACTIVE&nftId=${nftId}&nftContractAddress=${nftContractAddress}`,
      );

      const json = await result.json();

      const processedOffers = json.Items.map((item: any) => {
        return {
          offer: {
            amount: BigNumber.from(String(item.D.terms.amount)),
            expiration: Number(item.D.terms.expiration),
            interestRatePerSecond: item.D.terms.interestRatePerSecond,
          },
          offerHash: item.G4,
        };
      });

      for (let i = 0; i < processedOffers.length; i++) {
        const offerHash = processedOffers[i].offerHash;
        const offerFromChain = await getLoanOfferFromHash({
          niftyApesContract,
          nftContractAddress,
          nftId,
          offerHash,
        });

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
