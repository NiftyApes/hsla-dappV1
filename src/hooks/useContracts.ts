import { useChainId } from './useChainId';
import {
  getLendingContract,
  getLiquidityContract,
  getOffersContract,
} from 'helpers/getLendingContract';
import { useWalletProvider } from './useWalletProvider';

const i18n = {
  noContract: (cid: string | undefined) =>
    `App not currently configured to connect to NiftyApes contract on current chain id: ${cid}`,
};

const isLocalChain = (cid: string | undefined): boolean | undefined => {
  if (cid === '0x7a69') {
    return true;
  } else if (cid) {
    throw Error(i18n.noContract(cid));
  }
  return false;
};

export const useLiquidityContract = () => {
  const provider = useWalletProvider();
  const chainId = useChainId();

  if (provider && isLocalChain(chainId)) {
    return getLiquidityContract({ provider });
  }
};

export const useOffersContract = () => {
  const provider = useWalletProvider();
  const chainId = useChainId();

  if (provider && isLocalChain(chainId)) {
    return getOffersContract({ provider });
  }
};

export const useLendingContract = () => {
  const provider = useWalletProvider();
  const chainId = useChainId();

  if (provider && isLocalChain(chainId)) {
    return getLendingContract({ provider });
  }
};
