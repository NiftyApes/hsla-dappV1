import { BigNumber } from 'ethers';
import { getJson } from 'helpers';
import _ from 'lodash';
import YourCollectibleDeploymentJSON from '../generated/deployments/localhost/YourCollectible.json';
import { Contract, LendingContract, NFT, nft } from '../nft/model';
import { getNFTMetadataUsingAlchemy } from './getNFTMetadataUsingAlchemy';
import { getTokenIdRangeForLocalForksOfNftContracts } from './getTokenIdRangeForLocalForksOfNftContracts';

interface Props {
  walletAddress: string;
  contract: Contract;
  lendingContract: LendingContract;
}

export const getLocalNFTsOfAddress = async ({
  walletAddress,
  contract,
  lendingContract,
}: Props): Promise<NFT[] | undefined> => {
  if (!walletAddress || !contract || !contract.address || !lendingContract) {
    return undefined;
  }

  // Which tokenIds to iterate over depends on which collection we're using
  const tokenIdRange = getTokenIdRangeForLocalForksOfNftContracts({
    nftContractAddress: contract.address,
  });

  const results = [];
  for (const i of tokenIdRange) {
    const tokenId = BigNumber.from(i);

    // Some collections (e.g., MAYC) skip tokenIds, presumably if not minted
    // So we do this check early and continue if token doesn't exist
    // Otherwise, things like the ownerOf call below throw an error
    let tokenURI;
    try {
      tokenURI = await contract.tokenURI(tokenId);
    } catch (e) {
      // if not associated token, skip to next
      continue;
    }

    const owner = await contract.ownerOf(tokenId);

    const isOwnedDirectlyByWallet = owner.toUpperCase() === walletAddress.toUpperCase();

    const niftyApesOwner = await lendingContract.ownerOf(contract.address, tokenId);

    const isOwnedByWalletButInNiftyApesEscrow =
      niftyApesOwner.toUpperCase() === walletAddress.toUpperCase();

    if (!isOwnedDirectlyByWallet && !isOwnedByWalletButInNiftyApesEscrow) {
      continue;
    }

    // If not Scaffold ETH NFT contract
    // Use Alchemy to get metadata
    let nftMetadata;
    if (contract.address.toUpperCase() !== YourCollectibleDeploymentJSON.address.toUpperCase()) {
      nftMetadata = await getNFTMetadataUsingAlchemy({
        nftContractAddress: contract.address,
        nftTokenId: tokenId.toNumber(),
      });
    }

    // If no metadata, fetch JSON using token URI
    const haveAlchemyMetadata = !_.isNil(nftMetadata);
    const jsonFromContractTokenUri = !haveAlchemyMetadata ? await getJson({ url: tokenURI }) : {};

    const json = {
      ...jsonFromContractTokenUri,
      ...(haveAlchemyMetadata
        ? {
            id: nftMetadata.id.tokenId,
            name: '',
            collectionName: nftMetadata.contractMetadata.symbol,
            image: nftMetadata.media[0].gateway,
          }
        : {}),
    };

    results.push(nft(tokenId, contract.address, owner, json));
  }

  return results;
};
