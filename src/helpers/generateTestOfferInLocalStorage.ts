export function generateTestOfferInLocalStorage({
  nftContractAddress,
  nftId,
  offer,
  offerHash,
}: {
  nftContractAddress: string;
  nftId: string;
  offer: any;
  offerHash: string;
}) {
  let offersString = localStorage.getItem('nifty-apes-offers');

  if (!offersString) {
    localStorage.setItem('nifty-apes-offers', JSON.stringify({}));
    offersString = localStorage.getItem('nifty-apes-offers');
  }

  const offers = JSON.parse(offersString as string);

  let offersForCollection = offers[nftContractAddress];
  if (!offersForCollection) {
    offers[nftContractAddress] = {};
    offersForCollection = offers[nftContractAddress];
  }

  let offersForNFT = offersForCollection[nftId];
  if (!offersForNFT) {
    offersForCollection[nftId] = [];
    offersForNFT = offersForCollection[nftId];
  }

  offersForNFT.push({
    offer,
    offerHash,
  });

  const stringifiedUpdatedOffers = JSON.stringify(offers);

  localStorage.setItem('nifty-apes-offers', stringifiedUpdatedOffers);
}
