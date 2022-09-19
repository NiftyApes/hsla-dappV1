import { getApiUrl } from 'helpers';

export async function updateLoanStatus({
  nftContractAddress,
  nftId,
  loanBeginTimestamp,
  status,
  transactionTimestamp,
  transactionHash,
}: {
  nftContractAddress: string;
  nftId: string;
  loanBeginTimestamp: number;
  status: string;
  transactionTimestamp?: number;
  transactionHash?: string;
}) {
  const result = await fetch(getApiUrl('loans'), {
    method: 'PATCH',
    body: JSON.stringify({
      nftContractAddress,
      nftId,
      loanBeginTimestamp,
      transactionTimestamp,
      transactionHash,
      updateFields: { status },
    }),
  });
}
