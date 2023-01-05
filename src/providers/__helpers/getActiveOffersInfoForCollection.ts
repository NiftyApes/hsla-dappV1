/* eslint-disable */
import { ethers } from 'ethers';

export function getActiveOffersInfoForCollection({
  collectionAddress,
  onChainOffers,
  signatureOffers,
}: any) {
  const activeOnChainCollectionOffers = onChainOffers.filter(
    (o: any) =>
      o.nftContractAddress.toLowerCase() === collectionAddress.toLowerCase() &&
      o.offer.floorTerm &&
      Date.now() <= o.offer.expiration * 1000 &&
      !o.hasBeenCanceled,
  );

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

  console.log('collectionAddress', collectionAddress);
  console.log('signatureOffers', signatureOffers);

  const activeSignatureCollectionOffers = signatureOffers.filter(
    (o: any) =>
      o.Collection.toLowerCase() === collectionAddress.toLowerCase() &&
      o.Offer.floorTerm &&
      Date.now() <= o.Offer.expiration * 1000 &&
      !o.hasBeenUsed,
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

  const allActiveCollectionOffers = [
    ...activeOnChainCollectionOffers,
    ...activeSignatureCollectionOffers,
  ];

  return {
    activeOnChainCollectionOffers,
    activeOnChainCollectionOffersAggregateAmount,
    activeSignatureCollectionOffers,
    activeSignatureCollectionOffersAggregateAmount,
    allActiveCollectionOffers,
  };
}
