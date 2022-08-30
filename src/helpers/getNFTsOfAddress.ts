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

  const totalSupplyNumber = (await contract.totalSupply()).toNumber();
  const results = [];

  for (
    let i = totalSupplyNumber < 10 ? 0 : 860;
    i < (totalSupplyNumber < 10 ? totalSupplyNumber : 870);
    i++
  ) {
    const tokenId = await contract.tokenByIndex(i);
    let tokenURI = await contract.tokenURI(tokenId);
    const owner = await contract.ownerOf(tokenId);

    // Add NFT if directly owned by address
    // or in NiftyApes but indirectly owned by address
    if (owner.toUpperCase() === walletAddress.toUpperCase()) {
      if (tokenURI.startsWith('ipfs://')) {
        tokenURI = `https://ipfs.io/ipfs/${tokenURI.slice(7)}`;
      }

      const nftMetadata = await (
        await fetch(
          `https://eth-mainnet.g.alchemy.com/v2/Of3Km_--Ow1fNnMhaETmwnmWBFFHF3ZY/getNFTMetadata?contractAddress=0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d&tokenId=${i}`,
        )
      ).json();

      const json = await getJson({ url: tokenURI });

      console.log('json', json, nftMetadata);

      results.push(
        nft(tokenId, contract.address, owner, {
          ...json,
          id: nftMetadata.id.tokenId,
          name: '',
          collectionName: nftMetadata.contractMetadata.symbol,
          image: nftMetadata.media[0].gateway,
        }),
      );
    } else if (lendingContract) {
      const niftyApesOwner = await lendingContract.ownerOf(contract.address, tokenId);

      if (niftyApesOwner.toUpperCase() === walletAddress.toUpperCase()) {
        if (tokenURI.startsWith('ipfs://')) {
          tokenURI = `https://ipfs.io/ipfs/${tokenURI.slice(7)}`;
        }
        const json = await getJson({ url: tokenURI });
        results.push(nft(tokenId, contract.address, owner, json));
      }
    }
  }

  console.log('results', results);

  return results;
};
