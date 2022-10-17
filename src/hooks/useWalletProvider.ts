import { useConnectWallet } from '@web3-onboard/react';
import Provider from 'eip1193-provider';
import { useChainId } from './useChainId';

export const useWalletProvider = () => {
  const [{ wallet }] = useConnectWallet();

  const chainId = useChainId();

  if (wallet?.provider) {
    return wallet?.provider;
  }

  return chainId === '0x7a69'
    ? new Provider('http://localhost:8545')
    : chainId === '0x5'
    ? new Provider(
        'https://eth-goerli.g.alchemy.com/v2/_8-YJwskeUfHw9RMaQufSFupoqkd_ukD',
      )
    : new Provider(
        'https://eth-mainnet.g.alchemy.com/v2/jxUUn2DsYODlc68SEU_7eNGCn2hQ7b63',
      );
};
