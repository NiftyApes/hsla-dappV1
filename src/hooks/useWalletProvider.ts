import { useConnectWallet } from '@web3-onboard/react';

export const useWalletProvider = () => {
  const [{ wallet }] = useConnectWallet();

  return wallet?.provider;
};
