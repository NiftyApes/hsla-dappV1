import { ethers } from 'ethers';
import { getApiUrl } from 'helpers';

export const getActiveSignatureOffersByLender = async ({
  chainId,
  lenderAddress,
}: {
  chainId: string;
  lenderAddress: string;
}) => {
  const result = await fetch(
    getApiUrl(
      chainId,
      `signature-offers?lender=${ethers.utils.getAddress(
        lenderAddress,
      )}&status=active`,
    ),
  );

  const json = await result.json();

  return json;
};
