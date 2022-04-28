import { useConnectWallet } from '@web3-onboard/react';

export const useWalletAddress = () => {
  const [{ wallet }] = useConnectWallet();

  if (!wallet) {
    return undefined;
  }

  return wallet?.accounts[0] && wallet?.accounts[0].address;
};
