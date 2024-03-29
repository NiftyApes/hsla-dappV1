import { ethers } from 'ethers';
import { getApiUrl } from 'helpers';

export async function updateLoanStatus({
  chainId,
  nftContractAddress,
  nftId,
  loanBeginTimestamp,
  status,
  transactionTimestamp,
  transactionHash,
}: {
  chainId: string;
  nftContractAddress: string;
  nftId: string;
  loanBeginTimestamp: number;
  status: string;
  transactionTimestamp?: number;
  transactionHash?: string;
}) {
  await fetch(getApiUrl(chainId, 'loans'), {
    method: 'PATCH',
    body: JSON.stringify({
      nftContractAddress: ethers.utils.getAddress(nftContractAddress),
      nftId,
      loanBeginTimestamp,
      transactionTimestamp,
      transactionHash,
      updateFields: { status },
    }),
  });
}
