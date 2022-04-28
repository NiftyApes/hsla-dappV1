import { ContractInterface } from 'ethers';
import { getEthersContractWithEIP1193Provider } from 'helpers/getEthersContractWithEIP1193Provider';
import { useWalletProvider } from './useWalletProvider';

export const useContract = ({ address, abi }: { address: string; abi: ContractInterface }) => {
  const provider = useWalletProvider();

  if (!provider) {
    return undefined;
  }

  return getEthersContractWithEIP1193Provider({ abi, address, provider });
};
