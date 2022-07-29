import { useWalletProvider } from './useWalletProvider';
import { getContracts } from 'helpers/getContracts';

export const useLocalNiftyApesContract = () => {
  const provider = useWalletProvider();

  if (!provider) {
    return undefined;
  }

  return getContracts({ provider });
};
