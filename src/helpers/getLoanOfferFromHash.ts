<<<<<<< HEAD
/* eslint-disable consistent-return */
import { OffersContract } from 'nft/model';
=======
import {OffersContract} from 'nft/model';
>>>>>>> master

export async function getLoanOfferFromHash({
                                               offersContract,
                                               nftContractAddress,
                                               nftId,
                                               offerHash,
                                               floorTerm = false,
                                           }: {
    offersContract: OffersContract;
    nftContractAddress?: string;
    nftId: string;
    offerHash: string;
    floorTerm?: boolean;
}) {
    if (!offersContract || !nftContractAddress) {
        return;
    }

<<<<<<< HEAD
  const result = await offersContract.getOffer(
    nftContractAddress,
    nftId,
    offerHash,
    floorTerm,
  );
=======
    const result = await offersContract.getOffer(nftContractAddress, nftId, offerHash, floorTerm);
>>>>>>> master

    return result;
}
