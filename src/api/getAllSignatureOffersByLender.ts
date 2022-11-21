import { ethers } from 'ethers';
import { getApiUrl } from 'helpers';

export const getAllSignatureOffersByLender = async ({
  chainId,
  lenderAddress,
}: {
  chainId: string;
  lenderAddress: string;
}) => {
  const result = await fetch(
    getApiUrl(
      chainId,
      `signature-offers?lender=${ethers.utils.getAddress(lenderAddress)}`,
    ),
  );

  const json = await result.json();

  return json;
};
