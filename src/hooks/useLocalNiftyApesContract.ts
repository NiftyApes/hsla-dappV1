import { getLocalLendingContract } from 'helpers/getContracts';
import { useWalletProvider } from './useWalletProvider';

export const useLocalNiftyApesContract = () => {
  const provider: any = useWalletProvider();

  if (!provider) {
    return undefined;
  }

  return getLocalLendingContract({ provider });
};
