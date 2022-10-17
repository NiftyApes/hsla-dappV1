import { ethers } from 'ethers';
import { getAPR } from 'helpers/getAPR';
import { roundForDisplay } from 'helpers/roundForDisplay';
import _ from 'lodash';
import { useCollectionOffers } from './useCollectionOffers';

export const useEasyOfferForCollection = ({
  nftContractAddress,
}: {
  nftContractAddress?: string;
}) => {
  const offers = useCollectionOffers({ nftContractAddress });

  if (!offers) {
    return { easyOfferAmount: 0, easyOfferDuration: 0, easyOfferApr: 0 };
  }

  const bestOffer =
    offers.length > 0 &&
    _.sortBy(offers, (o) =>
      getAPR({
        amount: o.amount,
        interestRatePerSecond: o.interestRatePerSecond,
      }),
    )[0];

  if (!bestOffer) {
    return {
      easyOfferAmount: 0,
      easyOfferDuration: 0,
      easyOfferApr: 0,
    };
  }

  return {
    easyOfferAmount: ethers.utils.formatEther(bestOffer.amount),
    easyOfferDuration: bestOffer.duration / (3600 * 24),
    easyOfferApr: roundForDisplay(
      getAPR({
        amount: bestOffer.amount,
        interestRatePerSecond: bestOffer.interestRatePerSecond,
      }) - 0.25,
    ),
  };
};
