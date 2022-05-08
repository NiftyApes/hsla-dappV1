export function getOfferHashForNFT({
  nftContractAddress,
  nftId,
}: {
  nftContractAddress: string;
  nftId: string;
}) {
  const offersString = localStorage.getItem('nifty-apes-offers');

  if (!offersString) {
    return;
  }

  const offers = JSON.parse(offersString);

  const offersForCollection = offers[nftContractAddress];

  if (!offersForCollection) {
    return;
  }

  const offerHashesForNft = offersForCollection[nftId];

  return offerHashesForNft;
}
