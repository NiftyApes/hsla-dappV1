import { ethers } from 'ethers';
import { getApiUrl } from './getApiUrl';

export async function saveSignatureOfferInDb({
  chainId,
  nftContractAddress,
  nftId,
  creator,
  offer,
  offerHash,
  signature,
}: {
  chainId: string;
  nftContractAddress: string;
  nftId: number;
  creator: string;
  offer: any;
  offerHash: string;
  signature: string;
}) {
  await fetch(getApiUrl(chainId, 'signature-offers'), {
    method: 'POST',
    body: JSON.stringify({
      nftContractAddress: ethers.utils.getAddress(nftContractAddress),
      nftId,
      creator: ethers.utils.getAddress(creator),
      offer,
      offerHash,
      signature,
    }),
  });
}
