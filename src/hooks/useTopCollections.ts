import { useChainId } from './useChainId';
import { isGoerli, isLocalChain } from './useContracts';

export interface NFTCollection {
  address: string;
  image: string;
  name: string;
  symbol?: string;
}

export const useTopCollections = () => {
  const chainId = useChainId();

  const collections: Array<NFTCollection> = [
    {
      address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
      image: '/assets/images/collections/collection_bayc.png',
      name: 'Bored Ape Yacht Club',
    },
    {
      address: '0xb7f7f6c52f2e2fdb1963eab30438024864c313f6',
      image: '/assets/images/collections/collection_wrappedpunks.png',
      name: 'Wrapped Cryptopunks',
    },
    {
      address: '0x60e4d786628fea6478f785a6d7e704777c86a7c6',
      image: '/assets/images/collections/collection_mayc.png',
      name: 'Mutant Ape Yacht Club',
    },
    {
      address: '0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d',
      image: '/assets/images/collections/collection_decentraland.png',
      name: 'Decentraland',
    },
    {
      address: '0x9c8ff314c9bc7f6e59a9d9225fb22946427edc03',
      image: '/assets/images/collections/collection_nouns.png',
      name: 'Nouns',
    },
    {
      address: '0x34d85c9cdeb23fa97cb08333b511ac86e1c4e258',
      image: '/assets/images/collections/collection_otherdeeds.png',
      name: 'Otherdeed for Otherside',
    },
    {
      address: '0x23581767a106ae21c074b2276d25e5c3e136a68b',
      image: '/assets/images/collections/collection_moonbirds.png',
      name: 'Moonbirds',
    },
    {
      address: '0x8a90cab2b38dba80c64b7734e58ee1db38b8992e',
      image: '/assets/images/collections/collection_doodles.png',
      name: 'Doodles',
    },
    {
      address: '0x1cb1a5e65610aeff2551a50f76a87a7d3fb649c6',
      image: '/assets/images/collections/collection_cryptoadz.png',
      name: 'CrypToadz',
    },
  ];

  if (isLocalChain(chainId)) {
    collections.unshift({
      address: '0x3f9A1B67F3a3548e0ea5c9eaf43A402d12b6a273',
      image: '/assets/images/NA-BLACK.png',
      name: 'Dev Contract (Local)',
    });
  }

  if (isGoerli(chainId)) {
    collections.unshift({
      address: '0x01c7851AE4D42f7B649ce168716C78fC25fE3D16',
      image: '/assets/images/collections/bananaman.png',
      name: 'Bananaman (Goerli)',
    });
  }

  return { collections };
};
