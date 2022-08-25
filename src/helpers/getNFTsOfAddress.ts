import { getJson } from 'helpers';
import { Contract, LendingContract, NFT, nft } from '../nft/model';

interface Props {
  walletAddress: string;
  contract: Contract;
  lendingContract: LendingContract;
}

export const getNFTsOfAddress = async ({
  walletAddress,
  contract,
  lendingContract,
}: Props): Promise<NFT[] | undefined> => {
  if (!walletAddress || !contract || !contract.address) {
    return undefined;
  }

  console.log('contract.address', contract.address);

  const totalSupplyNumber = (await contract.totalSupply()).toNumber();
  const results = [];

  for (let i = 0; i < totalSupplyNumber; i++) {
    const tokenId = await contract.tokenByIndex(i);
    const tokenURI = await contract.tokenURI(tokenId);
    const owner = await contract.ownerOf(tokenId);

    // Add NFT if directly owned by address
    // or in NiftyApes but indirectly owned by address
    if (owner.toUpperCase() === walletAddress.toUpperCase()) {
      const json = await getJson({ url: tokenURI });
      results.push(nft(tokenId, contract.address, owner, json));
    } else if (lendingContract) {
      const niftyApesOwner = await lendingContract.ownerOf(contract.address, tokenId);

      if (niftyApesOwner.toUpperCase() === walletAddress.toUpperCase()) {
        const json = await getJson({ url: tokenURI });
        results.push(nft(tokenId, contract.address, owner, json));
      }
    }
  }

  return results;
};
