import { useConnectWallet } from '@web3-onboard/react';
import { ContractInterface, ethers } from 'ethers';

export const useContract = ({ address, abi }: { address: string; abi: ContractInterface }) => {
  const [{ wallet }] = useConnectWallet();

  if (!wallet) {
    return undefined;
  }

  const provider = new ethers.providers.Web3Provider(wallet.provider, 'any');
  const contract = new ethers.Contract(address, abi, provider.getUncheckedSigner());
  return contract;
};
