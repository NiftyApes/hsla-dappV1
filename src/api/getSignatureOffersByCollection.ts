import { ethers } from 'ethers';
import { getApiUrl } from 'helpers';

export const getSignatureOffersByCollection = async ({
  chainId,
  nftContractAddress,
}: {
  chainId: string;
  nftContractAddress: string;
}) => {
  const result = await fetch(
    getApiUrl(
      chainId,
      `signature-offers?collection=${ethers.utils.getAddress(
        nftContractAddress,
      )}`,
    ),
  );

  const json = await result.json();

  return json;
};
