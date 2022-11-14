import injectedModule from '@web3-onboard/injected-wallets';
import { init } from '@web3-onboard/react';

const injected = injectedModule();

export const initWeb3Onboard = init({
  wallets: [injected],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl:
        'https://eth-mainnet.g.alchemy.com/v2/_8-YJwskeUfHw9RMaQufSFupoqkd_ukD',
    },
    {
      id: '0x5',
      token: 'GoerliETH',
      label: 'Ethereum Goerli Testnet',
      rpcUrl:
        'https://eth-goerli.g.alchemy.com/v2/_8-YJwskeUfHw9RMaQufSFupoqkd_ukD',
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
