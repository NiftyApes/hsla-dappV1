import { useConnectWallet } from '@web3-onboard/react';

export const useChainId = () => {
  const [{ wallet }] = useConnectWallet();

  if (!wallet) {
    return undefined;
  }

  return wallet.chains[0] && wallet.chains[0].id;
};
