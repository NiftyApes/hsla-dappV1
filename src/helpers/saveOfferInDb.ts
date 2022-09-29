import { getApiUrl } from './getApiUrl';

export async function saveOfferInDb({
  chainId,
  offerObj,
  offerHash,
}: {
  chainId: string;
  offerObj: {
    nftId: string;
    creator: string;
    interestRatePerSecond: number;
    amount: number;
    duration: number;
    expiration: number;
    floorTerm: boolean;
    nftContractAddress: string;
  };
  offerHash: string;
}) {
  const {
    nftId,
    creator,
    interestRatePerSecond,
    amount,
    duration,
    expiration,
    floorTerm,
    nftContractAddress,
  } = offerObj;

  await fetch(getApiUrl(chainId, 'offers'), {
    method: 'POST',
    body: JSON.stringify({
      nftId,
      creator,
      interestRatePerSecond,
      amount,
      duration,
      expiration,
      floorTerm,
      nftContractAddress,
      offerHash,
      // Will complicate this when we introduce borrower offers
      lenderOffer: true,
    }),
  });
}
