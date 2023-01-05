import { ethers } from 'ethers';
import { getApiUrl } from 'helpers';

// Currently not used anywhere, but we have it
export const getTokenSpecificSignatureOffers = async ({
  chainId,
  nftContractAddress,
  nftId,
}: {
  chainId: string;
  nftContractAddress: string;
  nftId: string;
}) => {
  const result = await fetch(
    getApiUrl(
      chainId,
      `signature-offers?collection=${ethers.utils.getAddress(
        nftContractAddress,
      )}&nftId=${nftId}`,
    ),
  );

  const json = await result.json();

  return json;
};
