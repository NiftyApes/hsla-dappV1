import { BigNumber } from 'ethers';
import { getApiUrl } from 'helpers';

export const getActiveLoansByBorrower = async ({ address }: { address: string }) => {
  const result = await fetch(getApiUrl(`loans?borrower=${address}&status=active`));
  const json = await result.json();

  const processedLoans = json.map((item: any) => {
    return {
      amount: BigNumber.from(String(item.LoanTerms.Amount)),
      nftId: item.NftId,
      nftContractAddress: item.Collection,
    };
  });

  return processedLoans;
};
