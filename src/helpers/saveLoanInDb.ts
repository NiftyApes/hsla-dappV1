import { getApiUrl } from './getApiUrl';

export async function saveLoanInDb({
  nftContractAddress,
  nftId,
  creator,
  borrower,
  lender,
  transactionHash,
  loanTerms,
}: {
  nftContractAddress: string;
  nftId: string;
  creator: string;
  borrower: string;
  lender: string;
  transactionHash: string;
  loanTerms: {
    amount: string;
    asset: 'ETH';
    interestRatePerSecond: string;
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
      transactionHash,
    }),
  });
}
