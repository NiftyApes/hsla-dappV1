import { LOCAL } from 'constants/contractAddresses';
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
      address: '0xd4e4078ca3495DE5B1d4dB434BEbc5a986197782',
      image: '/assets/images/collections/collection_autoglyphs.png',
      name: 'Autoglyphs',
    },
    {
      address: '0x9c8ff314c9bc7f6e59a9d9225fb22946427edc03',
      image: '/assets/images/collections/collection_nouns.png',
      name: 'Nouns',
    },
    {
      address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
      image: '/assets/images/collections/collection_bayc.png',
      name: 'Bored Ape Yacht Club',
    },
    {
      address: '0x60e4d786628fea6478f785a6d7e704777c86a7c6',
      image: '/assets/images/collections/collection_mayc.png',
      name: 'Mutant Ape Yacht Club',
    },
    {
      address: '0xED5AF388653567Af2F388E6224dC7C4b3241C544',
      image: '/assets/images/collections/collection_azuki.png',
      name: 'Azuki',
    },
    {
      address: '0x49cF6f5d44E70224e2E23fDcdd2C053F30aDA28B',
      image: '/assets/images/collections/collection_clonex.png',
      name: 'Clone X',
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
      address: '0x7Bd29408f11D2bFC23c34f18275bBf23bB716Bc7',
      image: '/assets/images/collections/collection_meebits.png',
      name: 'Meebits',
    },
    {
      address: '0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d',
      image: '/assets/images/collections/collection_decentraland.png',
      name: 'Decentraland',
    },
    {
      address: '0xe785E82358879F061BC3dcAC6f0444462D4b5330',
      image: '/assets/images/collections/collection_wow.png',
      name: 'World of Women',
    },
    {
      address: '0x1cb1a5e65610aeff2551a50f76a87a7d3fb649c6',
      image: '/assets/images/collections/collection_cryptoadz.png',
      name: 'CrypToadz',
    },
    {
      address: '0x1A92f7381B9F03921564a437210bB9396471050C',
      image: '/assets/images/collections/collection_coolcats.png',
      name: 'Cool Cats',
    },
    {
      address: '0x34d85c9cdeb23fa97cb08333b511ac86e1c4e258',
      image: '/assets/images/collections/collection_otherdeeds.png',
      name: 'Otherdeed for Otherside',
    },
    {
      address: '0x4b10701Bfd7BFEdc47d50562b76b436fbB5BdB3B',
      image: '/assets/images/collections/collection_lilnouns.png',
      name: 'Lil Nouns',
    },
  ];

  if (isLocalChain(chainId)) {
    collections.unshift({
      address: LOCAL.YOUR_COLLECTIBLE.ADDRESS,
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
