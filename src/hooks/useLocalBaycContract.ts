import { getForkedBaycContract } from 'helpers/getForkedBaycContract';
import { useWalletProvider } from './useWalletProvider';

export const useLocalBaycContract = () => {
  const provider = useWalletProvider();

  if (!provider) {
    return undefined;
  }

  return getForkedBaycContract({ provider });
};
