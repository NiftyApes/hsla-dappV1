import { getApiUrl } from './getApiUrl';

export async function saveLoanInDb({
  nftContractAddress,
  nftId,
  lastUpdatedTimestamp,
  creator,
  loanTerms,
  borrower,
  lender,
}: {
  nftContractAddress: string;
  nftId: string;
  lastUpdatedTimestamp: number;
  creator: string;
  borrower: string;
  lender: string;
  loanTerms: {
    amount: number;
    asset: 'ETH';
    interestRatePerSecond: number;
    duration: number;
    loanBeginTimestamp: number;
    loanEndTimestamp: number;
  };
}) {
  const result = await fetch(getApiUrl('loans'), {
    method: 'POST',
    body: JSON.stringify({
      nftContractAddress,
      nftId,
      lastUpdatedTimestamp: loanTerms.loanBeginTimestamp,
      creator,
      loanTerms,
      borrower,
      lender,
    }),
  });
}
