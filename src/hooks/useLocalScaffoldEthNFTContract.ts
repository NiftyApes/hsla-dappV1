import { useWalletProvider } from './useWalletProvider';
import { getLocalScaffoldEthMintingContract } from 'helpers/getLocalScaffoldEthMintingContract';

export const useLocalScaffoldEthNFTContract = () => {
  const provider = useWalletProvider();

  if (!provider) {
    return undefined;
  }

  return getLocalScaffoldEthMintingContract({ provider });
};
