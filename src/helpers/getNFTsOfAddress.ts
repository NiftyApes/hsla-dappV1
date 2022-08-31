import { BigNumber } from 'ethers';
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

  const startI =
    contract.address.toUpperCase() === '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d'.toUpperCase()
      ? 860
      : contract.address.toUpperCase() ===
        '0x60e4d786628fea6478f785a6d7e704777c86a7c6'.toUpperCase()
      ? 11863
      : 0;

  const endI =
    contract.address.toUpperCase() === '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d'.toUpperCase()
      ? 870
      : contract.address.toUpperCase() ===
        '0x60e4d786628fea6478f785a6d7e704777c86a7c6'.toUpperCase()
      ? 11871
      : totalSupplyNumber;

  for (let i = startI; i < endI; i++) {
    const tokenId = BigNumber.from(i);

    let tokenURI;
    try {
      tokenURI = await contract.tokenURI(tokenId);
    } catch (e) {
      continue;
    }

    const owner = await contract.ownerOf(tokenId);

    console.log('owner', i, tokenId, owner);

    let nftMetadata;

    console.log(
      'contract.address',
      contract.address,
      contract.address.toUpperCase(),
      '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
    );

    if (
      contract.address.toUpperCase() === '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d'.toUpperCase()
    ) {
      nftMetadata = await (
        await fetch(
          `https://eth-mainnet.g.alchemy.com/v2/Of3Km_--Ow1fNnMhaETmwnmWBFFHF3ZY/getNFTMetadata?contractAddress=0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d&tokenId=${i}`,
        )
      ).json();
    } else if (
      contract.address.toUpperCase() === '0x60e4d786628fea6478f785a6d7e704777c86a7c6'.toUpperCase()
    ) {
      nftMetadata = await (
        await fetch(
          `https://eth-mainnet.g.alchemy.com/v2/Of3Km_--Ow1fNnMhaETmwnmWBFFHF3ZY/getNFTMetadata?contractAddress=0x60e4d786628fea6478f785a6d7e704777c86a7c6&tokenId=${i}`,
        )
      ).json();
    }

    // Add NFT if directly owned by address
    // or in NiftyApes but indirectly owned by address
    if (owner.toUpperCase() === walletAddress.toUpperCase()) {
      if (tokenURI.startsWith('ipfs://')) {
        tokenURI = `https://ipfs.io/ipfs/${tokenURI.slice(7)}`;
      }

      const json = nftMetadata ? nftMetadata : await getJson({ url: tokenURI });

      console.log('json', json, nftMetadata);

      results.push(
        nft(tokenId, contract.address, owner, {
          ...json,
          ...(nftMetadata
            ? {
                id: nftMetadata.id.tokenId,
                name: '',
                collectionName: nftMetadata.contractMetadata.symbol,
                image: nftMetadata.media[0].gateway,
              }
            : {}),
        }),
      );
    } else if (lendingContract) {
      const niftyApesOwner = await lendingContract.ownerOf(contract.address, tokenId);

      if (niftyApesOwner.toUpperCase() === walletAddress.toUpperCase()) {
        if (tokenURI.startsWith('ipfs://')) {
          tokenURI = `https://ipfs.io/ipfs/${tokenURI.slice(7)}`;
        }
        const json = nftMetadata ? nftMetadata : await getJson({ url: tokenURI });
        results.push(
          nft(tokenId, contract.address, owner, {
            ...json,
            ...(nftMetadata
              ? {
                  id: nftMetadata.id.tokenId,
                  name: '',
                  collectionName: nftMetadata.contractMetadata.symbol,
                  image: nftMetadata.media[0].gateway,
                }
              : {}),
          }),
        );
      }
    }
  }

  console.log('results', results);

  return results;
};
