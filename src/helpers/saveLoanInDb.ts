import { ethers } from 'ethers';
import { getApiUrl } from './getApiUrl';

export async function saveLoanInDb({
  chainId,
  nftContractAddress,
  nftId,
  creator,
  borrower,
  lender,
  transactionHash,
  loanTerms,
}: {
  chainId: string;
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
  if (chainId === '0x1') {
    return;
  }

  await fetch(getApiUrl(chainId, 'loans'), {
    method: 'POST',
    body: JSON.stringify({
      nftContractAddress: ethers.utils.getAddress(nftContractAddress),
      nftId,
      lastUpdatedTimestamp: loanTerms.loanBeginTimestamp,
      creator: ethers.utils.getAddress(creator),
      loanTerms,
      borrower: ethers.utils.getAddress(borrower),
      lender: ethers.utils.getAddress(lender),
      transactionHash,
    }),
  });
}
