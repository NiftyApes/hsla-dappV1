import { getForkedBaycContract } from 'helpers/getForkedBaycContract';
import { useWalletProvider } from './useWalletProvider';

export const useLocalBaycContract = () => {
  const provider: any = useWalletProvider();

  if (!provider) {
    return undefined;
  }

  return getForkedBaycContract({ provider });
};
