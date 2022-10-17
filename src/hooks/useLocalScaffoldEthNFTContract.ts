import { getLocalScaffoldEthMintingContract } from 'helpers/getLocalScaffoldEthMintingContract';
import { useWalletProvider } from './useWalletProvider';

export const useLocalScaffoldEthNFTContract = () => {
  const provider: any = useWalletProvider();

  if (!provider) {
    return undefined;
  }

  return getLocalScaffoldEthMintingContract({ provider });
};
