import { ethers } from 'ethers';
import { getApiUrl } from 'helpers';

export async function updateSignatureOfferStatus({
  chainId,
  nftContractAddress,
  nftId,
  offerExpiration,
  offerHash,
  status,
  transactionTimestamp,
  transactionHash,
}: {
  chainId: string;
  nftContractAddress: string;
  nftId: string;
  offerExpiration: number;
  offerHash: string;
  status: string;
  transactionTimestamp?: number;
  transactionHash?: string;
}) {
  await fetch(getApiUrl(chainId, 'signature-offers'), {
    method: 'PATCH',
    body: JSON.stringify({
      nftContractAddress: ethers.utils.getAddress(nftContractAddress),
      nftId,
      offerExpiration,
      offerHash,
      transactionTimestamp,
      transactionHash,
      updateFields: { status },
    }),
  });
}
