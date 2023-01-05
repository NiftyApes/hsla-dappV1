import { BigNumber, ethers } from 'ethers';
import { getApiUrl } from 'helpers';

export const getOffersByCollection = async ({
  chainId,
  nftContractAddress,
}: {
  chainId: string;
  nftContractAddress: string;
}) => {
  const result = await fetch(
    getApiUrl(
      chainId,
      `offers?collection=${ethers.utils.getAddress(nftContractAddress)}`,
    ),
  );

  const json = await result.json();

  const processedOffers = json.map((item: any) => {
    return {
      offer: {
        amount: BigNumber.from(String(item.OfferTerms.Amount)),
        duration: Number(item.OfferTerms.Duration),
        expiration: Number(item.OfferTerms.Expiration),
        interestRatePerSecond: item.OfferTerms.InterestRatePerSecond,
        floorTerm: item.OfferTerms.FloorTerm,
        creator: item.OfferTerms.LenderOffer ? item.Lender : item.Borrower,
        offerHash: item.OfferHash,
        nftId: item.OfferTerms.NftId,
      },
      offerHash: item.OfferHash,
    };
  });

  return processedOffers;
};
