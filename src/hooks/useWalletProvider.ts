import { useConnectWallet } from '@web3-onboard/react';

export function useWalletProvider() {
  const [{ wallet }] = useConnectWallet();

  if (wallet?.provider) {
    return wallet?.provider;
  }

  return undefined;
}
