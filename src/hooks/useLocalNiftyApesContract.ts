import { useWalletProvider } from './useWalletProvider';
import { getLendingContract } from 'helpers/getLendingContract';

export const useLocalNiftyApesContract = () => {
  const provider = useWalletProvider();

  if (!provider) {
    return undefined;
  }

  return getLendingContract({ provider });
};
