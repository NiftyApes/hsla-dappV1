import { ethers } from 'ethers';
import { getApiUrl } from 'helpers';

export const getSignatureOffersForCollectionIncludingTokenSpecific = async ({
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
      )}&includeAll=true`,
    ),
  );

  const json = await result.json();

  return json;
};
