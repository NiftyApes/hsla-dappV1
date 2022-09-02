import { getApiUrl } from 'helpers';

export async function setLoanStatus({
  nftContractAddress,
  nftId,
  loanBeginTimestamp,
  status,
}: {
  nftContractAddress: string;
  nftId: string;
  loanBeginTimestamp: number;
  status: string;
}) {
  const result = await fetch(getApiUrl('loans'), {
    method: 'PATCH',
    body: JSON.stringify({
      nftContractAddress,
      nftId,
      loanBeginTimestamp,
      updateFields: { status },
    }),
  });
}
