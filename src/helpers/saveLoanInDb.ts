import { getApiUrl } from './getApiUrl';

export async function saveLoanInDb({
  nftContractAddress,
  nftId,
  lastUpdatedTimestamp,
  creator,
  data,
  borrower,
  lender,
}: {
  nftContractAddress: string;
  nftId: string;
  lastUpdatedTimestamp: number;
  creator: string;
  borrower: string;
  lender: string;
  data: {
    amount: number;
    asset: 'ETH';
    interestRatePerSecond: number;
    duration: number;
  };
}) {
  const result = await fetch(getApiUrl('loans'), {
    method: 'POST',
    body: JSON.stringify({
      nftContractAddress,
      nftId,
      lastUpdatedTimestamp,
      creator,
      data,
      borrower,
      lender,
    }),
  });
}
