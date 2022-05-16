import { getCEthContract } from 'helpers/getCEthContract';
import { useWalletProvider } from './useWalletProvider';

export const useCEthContract = () => {
  const provider = useWalletProvider();

  if (!provider) {
    return;
  }

  return getCEthContract({ provider });
};
