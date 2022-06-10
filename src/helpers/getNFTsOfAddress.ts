import { getJson } from 'helpers';
import { NFT, Contract, NiftyApesContract, nft } from '../nft/model';

export const getNFTsOfAddress = async ({
  walletAddress,
  contract,
  niftyApesContract,
}: {
  walletAddress: string;
  contract: Contract;
  niftyApesContract: NiftyApesContract;
}): Promise<NFT[] | undefined> => {
  if (!walletAddress || !contract || !contract.address) {
    return undefined;
  }

  const totalSupplyNumber = (await contract.totalSupply()).toNumber();

  const results = [];

  for (let i = 0; i < totalSupplyNumber; i++) {
    const tokenId = await contract.tokenByIndex(i);
    const tokenURI = await contract.tokenURI(tokenId);
    const owner = await contract.ownerOf(tokenId);
    const json = await getJson({ url: tokenURI });

    // Add NFT if directly owned by address
    // or in NiftyApes but indirectly owned by address
    if (owner.toUpperCase() === walletAddress.toUpperCase()) {
      results.push(nft(tokenId, contract.address, owner, json));
    } else if (niftyApesContract) {
      const niftyApesOwner = await niftyApesContract.ownerOf(contract.address, tokenId);

      if (niftyApesOwner.toUpperCase() === walletAddress.toUpperCase()) {
        results.push(nft(tokenId, contract.address, owner, json));
      }
    }
  }

  return results;
};
