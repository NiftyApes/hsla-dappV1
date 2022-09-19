import { ethers } from 'ethers';
import { getApiUrl } from 'helpers';

export const getActiveLoansByLender = async ({ lenderAddress }: { lenderAddress: string }) => {
  const result = await fetch(
    getApiUrl(`loans?lender=${ethers.utils.getAddress(lenderAddress)}&status=active`),
  );

  const json = await result.json();

  const processedLoans = json.map((item: any) => {
    return {
      amount: Number(ethers.utils.formatEther(item.LoanTerms.Amount)),
      nftId: item.NftId,
      nftContractAddress: item.Collection,
    };
  });

  return processedLoans;
};
