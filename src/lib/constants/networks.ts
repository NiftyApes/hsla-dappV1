import { TNetworkInfo } from 'eth-hooks/models';

const INFURA_ID = '3ccea23c26224daf802cf31e4699d15e';

export type TNetworkNames =
  | 'localhost'
  | 'mainnet'
  | 'kovan'
  | 'rinkeby'
  | 'ropsten'
  | 'goerli'
  | 'xdai'
  | 'matic'
  | 'mumbai';

let hostname = '';
if (typeof window !== 'undefined') {
  hostname = window?.location?.hostname;
}

export const NETWORKS: Record<TNetworkNames, TNetworkInfo> = {
  localhost: {
    blockExplorer: '',
    chainId: 31337,
    color: '#666666',
    name: 'localhost',
    url: 'http://' + hostname + ':8545',
  },
  mainnet: {
    blockExplorer: 'https://etherscan.io/',
    chainId: 1,
    color: '#ff8b9e',
    name: 'mainnet',
    url: `https://mainnet.infura.io/v3/${INFURA_ID}`,
  },
  kovan: {
    blockExplorer: 'https://kovan.etherscan.io/',
    chainId: 42,
    color: '#7003DD',
    faucet: 'https://gitter.im/kovan-testnet/faucet', // https://faucet.kovan.network/
    name: 'kovan',
    url: `https://kovan.infura.io/v3/${INFURA_ID}`,
  },
  rinkeby: {
    blockExplorer: 'https://rinkeby.etherscan.io/',
    chainId: 4,
    color: '#e0d068',
    faucet: 'https://faucet.rinkeby.io/',
    name: 'rinkeby',
    url: `https://rinkeby.infura.io/v3/${INFURA_ID}`,
  },
  ropsten: {
    name: 'ropsten',
    color: '#F60D09',
    chainId: 3,
    faucet: 'https://faucet.ropsten.be/',
    blockExplorer: 'https://ropsten.etherscan.io/',
    url: `https://ropsten.infura.io/v3/${INFURA_ID}`,
  },
  goerli: {
    blockExplorer: 'https://goerli.etherscan.io/',
    chainId: 5,
    color: '#0975F6',
    faucet: 'https://goerli-faucet.slock.it/',
    name: 'goerli',
    url: `https://goerli.infura.io/v3/${INFURA_ID}`,
  },
  xdai: {
    blockExplorer: 'https://blockscout.com/poa/xdai/',
    chainId: 100,
    color: '#48a9a6',
    faucet: 'https://xdai-faucet.top/',
    gasPrice: 1000000000,
    name: 'xdai',
    price: 1,
    url: 'https://dai.poa.network',
  },
  matic: {
    blockExplorer: 'https://explorer-mainnet.maticvigil.com//',
    chainId: 137,
    color: '#2bbdf7',
    faucet: 'https://faucet.matic.network/',
    gasPrice: 1000000000,
    name: 'matic',
    price: 1,
    url: 'https://rpc-mainnet.maticvigil.com',
  },
  mumbai: {
    blockExplorer: 'https://mumbai-explorer.matic.today/',
    chainId: 80001,
    color: '#92D9FA',
    faucet: 'https://faucet.matic.network/',
    gasPrice: 1000000000,
    name: 'mumbai',
    price: 1,
    url: 'https://rpc-mumbai.maticvigil.com',
  },
};
