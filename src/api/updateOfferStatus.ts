import { getApiUrl } from 'helpers';

export async function updateOfferStatus({
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
  const result = await fetch(getApiUrl(chainId, 'offers'), {
    method: 'PATCH',
    body: JSON.stringify({
      nftContractAddress,
      nftId,
      offerExpiration,
      offerHash,
      transactionTimestamp,
      transactionHash,
      updateFields: { status },
    }),
  });
}
