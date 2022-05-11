import fetch from 'cross-fetch';

export async function saveOfferInDb({
  nftId,
  creator,
  interestRatePerSecond,
  amount,
  duration,
  expiration,
  floorTerm = false,
  nftContractAddress,
  offerHash,
}: {
  nftId: string;
  creator: string;
  interestRatePerSecond: number;
  amount: number;
  duration: number;
  expiration: number;
  floorTerm: boolean;
  nftContractAddress: string;
  offerHash: string;
}) {
  const searchParams = new URLSearchParams('');
  searchParams.append('nftId', nftId);
  searchParams.append('creator', creator);
  searchParams.append('interestRatePerSecond', String(interestRatePerSecond));
  searchParams.append('amount', String(amount));
  searchParams.append('duration', String(duration));
  searchParams.append('expiration', String(expiration));
  searchParams.append('floorTerm', String(floorTerm));
  searchParams.append('nftContractAddress', nftContractAddress);
  searchParams.append('offerHash', offerHash);

  const response = await fetch(`https://qqxeqsrt39.execute-api.us-west-2.amazonaws.com/api/offer?${searchParams}`, {
    method: 'post',
  });
}
