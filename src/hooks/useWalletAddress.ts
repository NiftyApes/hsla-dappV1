import { useConnectWallet } from '@web3-onboard/react';
import { ethers } from 'ethers';

export const useWalletAddress = () => {
  const [{ wallet }] = useConnectWallet();

  if (!wallet) {
    return undefined;
  }

  return wallet?.accounts[0] && ethers.utils.getAddress(wallet?.accounts[0].address);
};
