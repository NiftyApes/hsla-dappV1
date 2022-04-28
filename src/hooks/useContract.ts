import { useConnectWallet } from '@web3-onboard/react';
import { ContractInterface, ethers } from 'ethers';

export const useContract = ({ address, abi }: { address: string; abi: ContractInterface }) => {
  const [{ wallet }] = useConnectWallet();

  if (!wallet) {
    return undefined;
  }

  // The Web3Provider can be used to wrap a EIP-1193 Provider,
  // which is what Block Native's @web-onboard returns.
  const provider = new ethers.providers.Web3Provider(wallet.provider);
  const contract = new ethers.Contract(address, abi, provider.getUncheckedSigner());
  return contract;
};
