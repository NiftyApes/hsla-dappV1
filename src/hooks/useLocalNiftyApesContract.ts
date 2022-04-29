import { useWalletProvider } from './useWalletProvider';
import { getLocalNiftyApesContract } from 'helpers/getLocalNiftyApesContract';

export const useLocalNiftyApesContract = () => {
  const provider = useWalletProvider();

  if (!provider) {
    return undefined;
  }

  return getLocalNiftyApesContract({ provider });
};
