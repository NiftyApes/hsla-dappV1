/* eslint-disable consistent-return */
import { OffersContract } from 'nft/model';

export async function getFloorSignatureOfferCountLeftFromSignature({
  offersContract,
  signature,
}: {
  offersContract: OffersContract;
  signature: string;
}) {
  if (!offersContract) {
    return;
  }

  const result = await offersContract.getSigFloorOfferCount(signature);

  return result;
}
