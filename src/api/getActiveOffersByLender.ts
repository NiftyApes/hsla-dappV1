import { BigNumber, ethers } from 'ethers';
import { getApiUrl } from 'helpers';

export const getActiveOffersByLender = async ({
  chainId,
  lenderAddress,
}: {
  chainId: string;
  lenderAddress: string;
}) => {
  const result = await fetch(
    getApiUrl(chainId, `offers?lender=${ethers.utils.getAddress(lenderAddress)}&status=active`),
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
        nftContractAddress: item.Collection,
        nftId: item.OfferTerms.NftId,
        offerHash: item.OfferHash,
      },
      offerHash: item.OfferHash,
    };
  });

  return processedOffers;
};
