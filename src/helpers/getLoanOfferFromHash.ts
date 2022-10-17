import {OffersContract} from 'nft/model';

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

    const result = await offersContract.getOffer(nftContractAddress, nftId, offerHash, floorTerm);

    return result;
}
