import { getForkedNounsContract } from 'helpers/getForkedNounsContract';
import { useWalletProvider } from './useWalletProvider';

export const useLocalNounsContract = () => {
  const provider = useWalletProvider();

  if (!provider) {
    return undefined;
  }

  return getForkedNounsContract({ provider });
};
