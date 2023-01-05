import { getGnosisHedgeyNftContract } from 'helpers/getGnosisHedgeyNftContract';
import { useWalletProvider } from './useWalletProvider';

export const useGnosisHedgeyContract = () => {
  const provider: any = useWalletProvider();

  if (!provider) {
    return undefined;
  }

  return getGnosisHedgeyNftContract({ provider });
};
