import { ethers } from 'ethers';
import { getApiUrl } from 'helpers';

export const getActiveLoansByLender = async ({
  chainId,
  lenderAddress,
}: {
  chainId: string;
  lenderAddress: string;
}) => {
  const result = await fetch(
    getApiUrl(
      chainId,
      `loans?lender=${ethers.utils.getAddress(lenderAddress)}&status=active`,
    ),
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
