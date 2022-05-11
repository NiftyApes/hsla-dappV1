import { useChainId } from './useChainId';
import { getLocalNiftyApesContract } from 'helpers/getLocalNiftyApesContract';
import { useWalletProvider } from './useWalletProvider';

export const useNiftyApesContract = () => {
  const chainId = useChainId();

  const provider = useWalletProvider();

  if (!provider) {
    return;
  }

  if (chainId === '0x7a69') {
    return getLocalNiftyApesContract({ provider });
  }

  throw Error(
    `App not currently configured to connect to NiftyApes contract on current chain id: ${chainId}`,
  );
};
