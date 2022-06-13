import { BigNumber } from 'ethers';

export type NFTId = string | BigNumber;

export interface NFT {
  id: string;
  owner: string;
  contractAddress: string;
  description: string;
  name: string;
  image: string;
  external_url: string;
  attributes: NFTAttribute[];
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
