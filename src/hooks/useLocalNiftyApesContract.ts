import { getLocalLendingContract } from 'helpers/getContracts';
import { useWalletProvider } from './useWalletProvider';

export const useLocalNiftyApesContract = () => {
  const provider = useWalletProvider();

  if (!provider) {
    return undefined;
  }

  return getLocalLendingContract({ provider });
};
