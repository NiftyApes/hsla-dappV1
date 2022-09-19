import { getApiUrl } from 'helpers';

export async function updateOfferStatus({
  nftContractAddress,
  nftId,
  offerExpiration,
  offerHash,
  status,
  transactionTimestamp,
  transactionHash,
}: {
  nftContractAddress: string;
  nftId: string;
  offerExpiration: number;
  offerHash: string;
  status: string;
  transactionTimestamp?: number;
  transactionHash?: string;
}) {
  const result = await fetch(getApiUrl('offers'), {
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
