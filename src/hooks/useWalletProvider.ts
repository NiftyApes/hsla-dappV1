import { useConnectWallet } from '@web3-onboard/react';

export const useWalletProvider = () => {
  const [{ wallet }] = useConnectWallet();

  if (!wallet) {
    return undefined;
  }

  return wallet.provider;
};
