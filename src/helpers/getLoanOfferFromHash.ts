import { NiftyApesContract } from 'nft/model';

export async function getLoanOfferFromHash({
  niftyApesContract,
  nftContractAddress,
  nftId,
  offerHash,
  floorTerm = false,
}: {
  niftyApesContract: NiftyApesContract;
  nftContractAddress?: string;
  nftId: string;
  offerHash: string;
  floorTerm?: boolean;
}) {
  if (!niftyApesContract || !nftContractAddress) {
    return;
  }

  const result = await niftyApesContract.getOffer(nftContractAddress, nftId, offerHash, floorTerm);

  return result;
}
