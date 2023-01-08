import { ethers } from 'ethers';
import { getApiUrl } from 'helpers';

// Currently not used anywhere, but we have it
export const getSignatureOffersForCollectionExcludingTokenSpecific = async ({
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
