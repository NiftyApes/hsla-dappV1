export const useLoanOffersForNFT = ({
  nftContractAddress,
  nftId,
}: {
  nftContractAddress?: string;
  nftId: number;
}) => {
  if (!nftContractAddress || !nftId) {
    return undefined;
  }

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
  }

  return offersForCollection[nftId];
};
