import { getCEthContract } from 'helpers/getCEthContract';
import { useChainId } from './useChainId';
import { useWalletProvider } from './useWalletProvider';

export const useCEthContract = () => {
  const provider = useWalletProvider();

  const chainId = useChainId();

  if (!provider || !chainId) {
    return;
  }

  return getCEthContract({ chainId, provider });
};
