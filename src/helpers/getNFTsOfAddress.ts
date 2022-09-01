import { BAYC_CONTRACT_ADDRESS, MAYC_CONTRACT_ADDRESS } from 'constants/contractAddresses';
import { BigNumber } from 'ethers';
import { getJson } from 'helpers';
import _ from 'lodash';
import { Contract, LendingContract, NFT, nft } from '../nft/model';
import { getNFTMetadataUsingAlchemy } from './getNFTMetadataUsingAlchemy';
import { getTokenIdRangeForLocalForksOfNftContracts } from './getTokenIdRangeForLocalForksOfNftContracts';

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

  const totalSupply = (await contract.totalSupply()).toNumber();

  // Which tokenIds to iterate over depends on which collection we're using
  let [startI, endI] = getTokenIdRangeForLocalForksOfNftContracts({
    nftContractAddress: contract.address,
    totalSupply,
  });

  const results = [];
  for (let i = startI; i < endI; i++) {
    const tokenId = BigNumber.from(i);

    // Some collections (e.g., MAYC) skip tokenIds, presumably if not minted
    let tokenURI;
    try {
      tokenURI = await contract.tokenURI(tokenId);
    } catch (e) {
      // if not associated token, skip to next
      continue;
    }

    const owner = await contract.ownerOf(tokenId);

    let nftMetadata;
    if (contract.address.toUpperCase() === BAYC_CONTRACT_ADDRESS.toUpperCase()) {
      nftMetadata = await getNFTMetadataUsingAlchemy({
        nftContractAddress: BAYC_CONTRACT_ADDRESS,
        nftTokenId: tokenId.toNumber(),
      });
    } else if (contract.address.toUpperCase() === MAYC_CONTRACT_ADDRESS.toUpperCase()) {
      nftMetadata = await getNFTMetadataUsingAlchemy({
        nftContractAddress: MAYC_CONTRACT_ADDRESS,
        nftTokenId: tokenId.toNumber(),
      });
    }

    // Add NFT if directly owned by address
    // or in NiftyApes but indirectly owned by address
    if (owner.toUpperCase() === walletAddress.toUpperCase()) {
      const haveAlchemyMetadata = !_.isNil(nftMetadata);

      // Scaffold ETH contract won't have Alchemy metadata
      const json = haveAlchemyMetadata ? nftMetadata : await getJson({ url: tokenURI });

      // If
      results.push(
        nft(tokenId, contract.address, owner, {
          ...json,
          ...(haveAlchemyMetadata
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
        const haveAlchemyMetadata = !_.isNil(nftMetadata);

        const json = nftMetadata ? nftMetadata : await getJson({ url: tokenURI });
        results.push(
          nft(tokenId, contract.address, owner, {
            ...json,
            ...(haveAlchemyMetadata
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

  return results;
};
