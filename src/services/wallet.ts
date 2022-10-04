import injectedModule from '@web3-onboard/injected-wallets';
import { init } from '@web3-onboard/react';
import walletConnectModule from '@web3-onboard/walletconnect';

// Replace with your DApp's Infura ID
const INFURA_ID = process.env.REACT_APP_INFURA_ID;
const injected = injectedModule();

const walletConnect = walletConnectModule();

export const initWeb3Onboard = init({
  wallets: [injected, walletConnect],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
    },
    {
      id: '0x3',
      token: 'tROP',
      label: 'Ethereum Ropsten Testnet',
      rpcUrl: `https://ropsten.infura.io/v3/${INFURA_ID}`,
    },
    {
      id: '0x4',
      token: 'rETH',
      label: 'Ethereum Rinkeby Testnet',
      rpcUrl: `https://rinkeby.infura.io/v3/${INFURA_ID}`,
    },
    {
      id: '0x5',
      token: 'GoerliETH',
      label: 'Ethereum Goerli Testnet',
      rpcUrl: `https://goerli.infura.io/v3/${INFURA_ID}`,
    },
    {
      id: '0x38',
      token: 'BNB',
      label: 'Binance Smart Chain',
      rpcUrl: 'https://bsc-dataseed.binance.org/',
    },
    {
      id: '0x89',
      token: 'MATIC',
      label: 'Matic Mainnet',
      rpcUrl: 'https://matic-mainnet.chainstacklabs.com',
    },
    {
      id: '0xfa',
      token: 'FTM',
      label: 'Fantom Mainnet',
      rpcUrl: 'https://rpc.ftm.tools/',
    },
    {
      id: '0x7a69',
      token: 'ETH',
      label: 'Localhost',
      rpcUrl: 'http://localhost:8545',
    },
  ],
  appMetadata: {
    name: 'Niftyapes',
    description: 'Niftyapes',
    icon: '/assets/images/header_logo.png',
    logo: '/assets/images/header_logo.png',
    recommendedInjectedWallets: [
      { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
      { name: 'MetaMask', url: 'https://metamask.io' },
    ],
  },
});
