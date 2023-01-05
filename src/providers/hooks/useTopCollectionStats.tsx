/* eslint-disable */
import { ethers } from 'ethers';
import _ from 'lodash';
import {
  useCollections,
  useOnChainOffers,
  useSignatureOffers,
} from '../NiftyApesProvider';
import { getActiveOffersInfoForCollection } from '../__helpers/getActiveOffersInfoForCollection';
import { getStatsForCollection } from '../__helpers/getStatsForCollection';

export function useTopCollectionStats({
  sortBy = 'TOTAL_LIQUIDITY',
  offset = 0,
  limit = 10,
}: {
  sortBy?: 'TOTAL_LIQUIDITY' | 'PRINCIPAL';
  offset?: number;
  limit?: number;
} = {}) {
  const { collections, loading: isLoadingCollections } = useCollections();
  const { onChainOffers, loading: isLoadingOnChainOffers } = useOnChainOffers();
  const { signatureOffers, loading: isLoadingSignatureOffers } =
    useSignatureOffers();

  if (
    isLoadingCollections ||
    isLoadingOnChainOffers ||
    isLoadingSignatureOffers
  ) {
    return { loading: true, topCollectionStats: undefined };
  }

  const collectionsWithActiveOffers = collections.filter(
    (collectionAddress: string) => {
      const {
        activeOnChainCollectionOffers,
        activeSignatureCollectionOffers,
        allActiveCollectionOffers,
      } = getActiveOffersInfoForCollection({
        collectionAddress,
        onChainOffers,
        signatureOffers,
      });

      return allActiveCollectionOffers.length > 0;
    },
  );

  const sortedCollections = _.sortBy(
    collectionsWithActiveOffers,
    (collectionAddress) => {
      const {
        activeOnChainCollectionOffers,
        activeSignatureCollectionOffers,
        allActiveCollectionOffers,
      } = getActiveOffersInfoForCollection({
        collectionAddress,
        onChainOffers,
        signatureOffers,
      });

      if (sortBy === 'TOTAL_LIQUIDITY') {
        const activeOnChainCollectionOffersAggregateAmount =
          activeOnChainCollectionOffers.reduce(
            (a: any, b: any) =>
              a +
              (b?.offer?.floorTerm
                ? Number(ethers.utils.formatEther(b?.offer?.amount)) *
                  (b?.offer?.floorTermLimit - b?.loans.length)
                : Number(ethers.utils.formatEther(b?.offer?.amount))),
            0,
          );

        const activeSignatureCollectionOffersAggregateAmount =
          activeSignatureCollectionOffers.reduce(
            (a: any, b: any) =>
              a +
              (b?.Offer?.floorTerm
                ? Number(ethers.utils.formatEther(b?.Offer?.amount)) *
                  (b?.Offer?.floorTermLimit - (b?.loans ? b?.loans.length : 0))
                : Number(ethers.utils.formatEther(b?.Offer?.amount))),
            0,
          );

        return -(
          activeOnChainCollectionOffersAggregateAmount +
          activeSignatureCollectionOffersAggregateAmount
        );
      } else if (sortBy === 'PRINCIPAL') {
        return -Math.max(
          ...allActiveCollectionOffers.map((o: any) => {
            if (o.Signature) {
              return Number(ethers.utils.formatEther(o.Offer.amount));
            }

            return Number(ethers.utils.formatEther(o.offer.amount));
          }),
        );
      }
    },
  );

  return {
    loading: false,
    topCollectionStats: sortedCollections
      .slice(offset, limit)
      .map((collectionAddress) =>
        getStatsForCollection({
          collectionAddress,
          onChainOffers,
          signatureOffers,
        }),
      ),
  };
}
