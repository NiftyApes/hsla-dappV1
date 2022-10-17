import { getForkedDoodlesContract } from 'helpers/getForkedDoodlesContract';
import { useWalletProvider } from './useWalletProvider';

export const useLocalDoodlesContract = () => {
  const provider: any = useWalletProvider();

  if (!provider) {
    return undefined;
  }

  return getForkedDoodlesContract({ provider });
};
