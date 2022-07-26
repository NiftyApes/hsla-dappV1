import { useChainId } from './useChainId';
import { getLendingContract, getOffersContract } from 'helpers/getLendingContract';
import { useWalletProvider } from './useWalletProvider';

export const useOffersContract = () => {
  const chainId = useChainId();
  const provider = useWalletProvider();

  if (!provider) {
    return;
  }

  if (chainId === '0x7a69') {
    return getOffersContract({ provider });
  }

  throw Error(
    `App not currently configured to connect to NiftyApes contract on current chain id: ${chainId}`,
  );
};

export const useNiftyApesContract = () => {
  const chainId = useChainId();
  const provider = useWalletProvider();

  if (!provider) {
    return;
  }

  if (chainId === '0x7a69') {
    return getLendingContract({ provider });
  }

  throw Error(
    `App not currently configured to connect to NiftyApes contract on current chain id: ${chainId}`,
  );
};
