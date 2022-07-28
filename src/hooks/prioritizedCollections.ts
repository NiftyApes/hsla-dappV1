import { Collection } from './useBorrowerSearch';

// prioritized Collections
const prioritizedCollections: Collection[] = [
  {
    name: 'ver',
    chainId: '0x04',
    contractAddress: '0x885d6ab5e78b93b271fa3efd57bf0109bc273fa9',
    tokenType: 'ERC-1155',
  },
  {
    name: 'Rarible',
    chainId: '0x04',
    contractAddress: '0x1af7a7555263f275433c6bb0b8fdcd231f89b1d7',
    tokenType: 'ERC-1155',
  },
  {
    name: 'MultiFaucet NFT',
    chainId: '0x04',
    contractAddress: '0xf5de760f2e916647fd766b4ad9e85ff943ce3a2b',
    tokenType: 'ERC-721',
  },
  {
    name: 'OpenSea Collections',
    chainId: '0x04',
    contractAddress: '0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656',
    tokenType: 'ERC-721',
  },
];

export default prioritizedCollections;
