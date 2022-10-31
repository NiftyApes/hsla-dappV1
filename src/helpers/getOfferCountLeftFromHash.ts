/* eslint-disable consistent-return */
import { OffersContract } from 'nft/model';

export async function getFloorOfferCountFromHash({
  offersContract,
  offerHash,
}: {
  offersContract: OffersContract;
  offerHash: string;
}) {
  if (!offersContract) {
    return;
  }

  const result = await offersContract.getFloorOfferCount(offerHash);

  return result;
}
