/* eslint-disable */
import { ethers } from 'ethers';
import { getActiveOffersInfoForCollection } from './getActiveOffersInfoForCollection';

export function getStatsForCollection({
  onChainOffers,
  signatureOffers,
  collectionAddress,
}: any) {
  const {
    allActiveCollectionOffers,
    activeOnChainCollectionOffersAggregateAmount,
    activeSignatureCollectionOffersAggregateAmount,
  } = getActiveOffersInfoForCollection({
    collectionAddress,
    onChainOffers,
    signatureOffers,
  });

  if (allActiveCollectionOffers.length === 0) {
    return {
      address: undefined,
      highestPrincipal: undefined,
      lowestApr: undefined,
      longestDuration: undefined,
      numberOfOffers: undefined,
      totalLiquidity: undefined,
    };
  }

  const highestPrincipal = Math.max(
    ...allActiveCollectionOffers.map((o: any) => {
      if (o.Signature) {
        return Number(ethers.utils.formatEther(o.Offer.amount));
      }
      return Number(ethers.utils.formatEther(o.offer.amount));
    }),
  );

  const SECONDS_IN_YEAR = 3.154e7;

  const lowestApr = Math.min(
    ...allActiveCollectionOffers.map((o: any) => {
      if (o.Signature) {
        const amount = Number(ethers.utils.formatEther(o.Offer.amount));
        const interestRatePerSecond = Number(
          ethers.utils.formatEther(o.Offer.interestRatePerSecond),
        );

        return ((interestRatePerSecond * SECONDS_IN_YEAR) / amount) * 100;
      }

      const amount = Number(ethers.utils.formatEther(o.offer.amount));
      const interestRatePerSecond = Number(
        ethers.utils.formatEther(o.offer.interestRatePerSecond),
      );

      return ((interestRatePerSecond * SECONDS_IN_YEAR) / amount) * 100;
    }),
  );

  return {
    address: collectionAddress,
    highestPrincipal,
    lowestApr,
    longestDuration: Math.max(
      ...allActiveCollectionOffers.map(
        (o) => o.offer?.duration || o.Offer?.duration,
      ),
    ),
    numberOfOffers: allActiveCollectionOffers.length,
    totalLiquidity:
      activeOnChainCollectionOffersAggregateAmount +
      activeSignatureCollectionOffersAggregateAmount,
  };
}
