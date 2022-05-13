import { Contract } from 'ethers';

export async function getLoanOfferFromHash({
  niftyApesContract,
  nftContractAddress,
  nftId,
  offerHash,
  floorTerm = false,
}: {
  niftyApesContract: Contract;
  nftContractAddress?: string;
  nftId: number;
  offerHash: string;
  floorTerm?: boolean;
}) {
  if (!niftyApesContract || !nftContractAddress) {
    return;
  }

  const result = await niftyApesContract.getOffer(nftContractAddress, nftId, offerHash, floorTerm);

  return result;
}
