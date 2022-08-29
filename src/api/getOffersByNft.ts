import { BigNumber } from 'ethers';
import { getApiUrl } from 'helpers';

export const getOffersByNft = async ({
  nftContractAddress,
  nftId,
}: {
  nftContractAddress?: string;
  nftId: string;
}) => {
  const result = await fetch(getApiUrl(`offers?collection=${nftContractAddress}&nftId=${nftId}`));

  const json = await result.json();

  const processedOffers = json.map((item: any) => {
    return {
      offer: {
        amount: BigNumber.from(String(item.OfferTerms.Amount)),
        expiration: Number(item.OfferTerms.Expiration),
        interestRatePerSecond: item.OfferTerms.InterestRatePerSecond,
        floorTerm: item.OfferTerms.FloorTerm,
      },
      offerHash: item.OfferHash,
    };
  });

  return processedOffers;
};
