import { LOCAL } from 'constants/contractAddresses';
import { useChainId } from './useChainId';
import { isGnosis, isGoerli, isLocalChain } from './useContracts';

export interface NFTCollection {
  address: string;
  image: string;
  name: string;
  symbol?: string;
}

export const useTopCollections = () => {
  const chainId = useChainId();

  let collections: Array<NFTCollection> = [
    {
      address: '0xd4e4078ca3495DE5B1d4dB434BEbc5a986197782',
      image: '/assets/images/collections/autoglyphs.png',
      name: 'Autoglyphs',
    },
    {
      address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
      image: '/assets/images/collections/boredapeyachtclub.png',
      name: 'Bored Ape Yacht Club',
    },
    {
      address: '0x9c8ff314c9bc7f6e59a9d9225fb22946427edc03',
      image: '/assets/images/collections/nouns.png',
      name: 'Nouns',
    },
    {
      address: '0xED5AF388653567Af2F388E6224dC7C4b3241C544',
      image: '/assets/images/collections/azuki.png',
      name: 'Azuki',
    },
    {
      address: '0x60e4d786628fea6478f785a6d7e704777c86a7c6',
      image: '/assets/images/collections/mutant-ape-yacht-club.png',
      name: 'Mutant Ape Yacht Club',
    },
    {
      address: '0xba30e5f9bb24caa003e9f2f0497ad287fdf95623',
      image: '/assets/images/collections/bored-ape-kennel-club.png',
      name: 'Bored Ape Kennel Club',
    },
    {
      address: '0x23581767a106ae21c074b2276d25e5c3e136a68b',
      image: '/assets/images/collections/proof-moonbirds.png',
      name: 'Moonbirds',
    },
    {
      address: '0x8a90cab2b38dba80c64b7734e58ee1db38b8992e',
      image: '/assets/images/collections/doodles-official.png',
      name: 'Doodles',
    },
    {
      address: '0x49cF6f5d44E70224e2E23fDcdd2C053F30aDA28B',
      image: '/assets/images/collections/clonex.png',
      name: 'Clone X',
    },
    {
      address: '0x7Bd29408f11D2bFC23c34f18275bBf23bB716Bc7',
      image: '/assets/images/collections/meebits.png',
      name: 'Meebits',
    },
    {
      address: '0xbd3531da5cf5857e7cfaa92426877b022e612cf8',
      image: '/assets/images/collections/pudgypenguins.png',
      name: 'Pudgy Penguins',
    },
    {
      address: '0x42069abfe407c60cf4ae4112bedead391dba1cdb',
      image: '/assets/images/collections/cryptodickbutts-s3.png',
      name: 'CryptoDickbutts S3',
    },
    {
      address: '0x1A92f7381B9F03921564a437210bB9396471050C',
      image: '/assets/images/collections/cool-cats-nft.png',
      name: 'Cool Cats',
    },
    {
      address: '0xe785E82358879F061BC3dcAC6f0444462D4b5330',
      image: '/assets/images/collections/world-of-women-nft.png',
      name: 'World of Women',
    },
    {
      address: '0x60bb1e2aa1c9acafb4d34f71585d7e959f387769',
      image: '/assets/images/collections/artgobblers.png',
      name: 'Art Gobblers',
    },
    {
      address: '0x1cb1a5e65610aeff2551a50f76a87a7d3fb649c6',
      image: '/assets/images/collections/cryptoadz-by-gremplin.png',
      name: 'CrypToadz',
    },
    {
      address: '0x79fcdef22feed20eddacbb2587640e45491b757f',
      image: '/assets/images/collections/mfers.png',
      name: 'mfer',
    },
    {
      address: '0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d',
      image: '/assets/images/collections/decentraland.png',
      name: 'Decentraland',
    },
    {
      address: '0x306b1ea3ecdf94ab739f1910bbda052ed4a9f949',
      image: '/assets/images/collections/beanzofficial.png',
      name: 'BEANZ Official',
    },
    {
      address: '0x39ee2c7b3cb80254225884ca001f57118c8f21b6',
      image: '/assets/images/collections/thepotatoz.png',
      name: 'Potatoz',
    },
    {
      address: '0x34d85c9cdeb23fa97cb08333b511ac86e1c4e258',
      image: '/assets/images/collections/otherdeed.png',
      name: 'Otherdeed for Otherside',
    },
    {
      address: '0x7f36182dee28c45de6072a34d29855bae76dbe2f',
      image: '/assets/images/collections/wolf-game.png',
      name: 'Wolf Game',
    },
    {
      address: '0xbce3781ae7ca1a5e050bd9c4c77369867ebc307e',
      image: '/assets/images/collections/goblintownwtf.png',
      name: 'goblintown',
    },
    {
      address: '0x33fd426905f149f8376e227d0c9d3340aad17af1',
      image: '/assets/images/collections/thememes6529.png',
      name: 'The Memes by 6529',
    },
    {
      address: '0x4b10701Bfd7BFEdc47d50562b76b436fbB5BdB3B',
      image: '/assets/images/collections/lil-nouns.png',
      name: 'Lil Nouns',
    },
    {
      address: '0xef1a89cbfabe59397ffda11fc5df293e9bc5db90',
      image: '/assets/images/collections/based-ghouls.png',
      name: 'Based Ghouls',
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

  if (isGnosis(chainId)) {
    collections = [
      {
        address: '0x2AA5d15Eb36E5960d056e8FeA6E7BB3e2a06A351',
        image: '/assets/images/collections/hedgeys.png',
        name: 'Hedgeys (Gnosis)',
      },
    ];
  }

  return { collections };
};
