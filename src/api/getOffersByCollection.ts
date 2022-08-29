import { BigNumber } from 'ethers';
import { getApiUrl } from 'helpers';

export const getOffersByCollection = async ({
  nftContractAddress,
}: {
  nftContractAddress?: string;
}) => {
  const result = await fetch(getApiUrl(`offers?collection=${nftContractAddress}`));

  const json = await result.json();

  const processedOffers = json.map((item: any) => {
    return {
      offer: {
        amount: BigNumber.from(String(item.OfferTerms.Amount)),
        duration: Number(item.OfferTerms.Duration),
        expiration: Number(item.OfferTerms.Expiration),
        interestRatePerSecond: item.OfferTerms.InterestRatePerSecond,
        floorTerm: item.OfferTerms.FloorTerm,
        createdAt: item.CreatedAt,
        creator: item.Creator,
        offerHash: item.OfferHash,
      },
      offerHash: item.OfferHash,
    };
  });

  return processedOffers;
};
