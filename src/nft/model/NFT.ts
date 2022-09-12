import { BigNumber } from 'ethers';

export type NFTId = string | BigNumber;

export interface NFT {
  attributes: NFTAttribute[];
  contractAddress: string;
  description: string;
  external_url: string;
  id: string;
  image: string;
  name: string;
  owner: string;
  collectionName?: string;
}

export interface NFTAttribute {
  trait_type: string;
  value: string;
}

export const getTokenId = (tokenId: NFTId) =>
  tokenId instanceof BigNumber ? tokenId.toString() : tokenId;

export const getNFTHash = (nft: NFT) => {
  return `${nft.contractAddress}_${nft.id}`;
};

const nft = (tokenId: NFTId, nftContractAddress: string, owner: string, json: any): NFT => {
  return {
    ...json,
    id: getTokenId(tokenId),
    contractAddress: nftContractAddress,
    owner,
  };
};

export default nft;
