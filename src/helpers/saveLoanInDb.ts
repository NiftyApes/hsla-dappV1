import { getApiUrl } from './getApiUrl';

export async function saveLoanInDb({
  loanObj,
}: {
  loanObj: {
    nftContractAddress: string;
    nftId: string;
    creator: string;
    amount: number;
  };
}) {
  const { nftContractAddress, nftId, creator, amount } = loanObj;

  const result = await fetch(getApiUrl('loans'), {
    method: 'POST',
    body: JSON.stringify({
      nftContractAddress,
      nftId,
      creator,
      amount,
    }),
  });

  console.log('result', result);
}
