import { getApiUrl } from './getApiUrl';

export async function saveLoanInDb({
  nftContractAddress,
  nftId,
  lastUpdatedTimestamp,
  creator,
  amount,
  borrower,
  lender,
}: {
  nftContractAddress: string;
  nftId: string;
  lastUpdatedTimestamp: number;
  creator: string;
  amount: number;
  borrower: string;
  lender: string;
}) {
  const result = await fetch(getApiUrl('loans'), {
    method: 'POST',
    body: JSON.stringify({
      nftContractAddress,
      nftId,
      lastUpdatedTimestamp,
      creator,
      amount,
      borrower,
      lender,
    }),
  });
}
