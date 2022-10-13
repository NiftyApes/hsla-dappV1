import { getForkedMaycContract } from 'helpers/getForkedMaycContract';
import { useWalletProvider } from './useWalletProvider';

export const useLocalMaycContract = () => {
  const provider: any = useWalletProvider();

  if (!provider) {
    return undefined;
  }

  return getForkedMaycContract({ provider });
};
