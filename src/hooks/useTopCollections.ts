export interface NFTCollection {
  address: string;
  image: string;
  name: string;
  symbol?: string;
}

export const useTopCollections = () => {
  const collections: Array<NFTCollection> = [
    {
      address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
      image: '/assets/images/collections/collection_bayc.png',
      name: 'Bored Ape Yacht Club',
    },
    {
      address: '0x282bdd42f4eb70e7a9d9f40c8fea0825b7f68c5d',
      image: '/assets/images/collections/collection_cpw.png',
      name: 'CryptoPunks (Wrapped)',
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

  return { collections };
};