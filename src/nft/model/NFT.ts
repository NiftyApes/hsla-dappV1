import { BigNumber } from 'ethers';
import { getNFTCardImage } from 'helpers/getNFTCardImage';

export type NFTId = string | BigNumber;
export type TokenType = 'ERC-721' | 'ERC-1155';

export interface NFT {
  id: string;
  owner: string;
  contractAddress: string;
  description: string;
  name: string;
  image: string;
  external_url: string;
  attributes: NFTAttribute[];
  uniqueKey: string;
  tokenType: TokenType;
}

export interface NFTAttribute {
  trait_type: string;
  value: string;
}

export interface AlchemyNFTObject {
  id: AlchemyNFTID;
  metadata: AlchemyNFTMetadata;
  title: string;
  contract: AlchemyContract;
}
interface AlchemyNFTID {
  tokenId: string;
  tokenMetadata: AlchemyTokenMetadata;
}

interface AlchemyTokenMetadata {
  tokenType: TokenType;
}

interface AlchemyContract {
  address: string;
}

interface AlchemyNFTMetadata {
  image: string;
  image_url: string;
}

export interface AlchemyGetNFTsResponse extends JSON {
  blockhash: string;
  ownedNfts: AlchemyNFTObject[];
  totalCount: number;
}

export const getTokenId = (tokenId: NFTId) =>
  tokenId instanceof BigNumber ? tokenId.toString() : tokenId;

export const getNFTHash = (nft: NFT) => {
  return `${nft.contractAddress}_${nft.id}`;
};

export const nftFromAlchemy = (nft: AlchemyNFTObject, owner: string): NFT => {
  return {
    id: nft.id.tokenId,
    contractAddress: nft.contract.address,
    owner,
    name: nft.title,
    description: nft.title,
    image: getNFTCardImage(nft.metadata.image),
    external_url: nft.metadata.image_url,
    attributes: [],
    tokenType: nft.id.tokenMetadata.tokenType,
    uniqueKey: `${nft.contract.address}_${nft.id.tokenId}`,
  };
};

const nft = (tokenId: NFTId, nftContractAddress: string, owner: string, json: any): NFT => {
  return {
    ...json,
    id: getTokenId(tokenId),
    contractAddress: nftContractAddress,
    owner,
    uniqueKey: `${nftContractAddress}_${getTokenId(tokenId)}`,
  };
};

export default nft;
