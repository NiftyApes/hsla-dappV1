import { useConnectWallet } from '@web3-onboard/react';
import { ethers } from 'ethers';

export const useWalletAddress = () => {
  const [{ wallet }] = useConnectWallet();

  if (!wallet) {
    return undefined;
  }

  // ethers.utils.getAddress converts address to checksum version.
  // We want to consistently use checksum address so string equality
  // equals address equality so, e.g., it's easy to filter by creator with
  // DynamoDB queries.
  return wallet?.accounts[0] && ethers.utils.getAddress(wallet?.accounts[0].address);
};
