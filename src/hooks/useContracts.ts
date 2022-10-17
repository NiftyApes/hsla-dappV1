/* eslint-disable consistent-return */
import {
  getGoerliLendingContract,
  getGoerliLiquidityContract,
  getGoerliOffersContract,
  getLocalLendingContract,
  getLocalLiquidityContract,
  getLocalOffersContract,
} from 'helpers/getContracts';
import { useChainId } from './useChainId';
import { useWalletProvider } from './useWalletProvider';

<<<<<<< HEAD
const isLocalChain = (cid: string | undefined): boolean | undefined => {
=======
const i18n = {
  noContract: (cid: string | undefined) =>
    `App not currently configured to connect to NiftyApes contract on current chain id: ${cid}`,
};

export const isLocalChain = (cid: string | undefined): boolean | undefined => {
>>>>>>> master
  return cid === '0x7a69';
};

export const isGoerli = (cid: string | undefined): boolean | undefined => {
  return cid === '0x5';
};

export const useLiquidityContract = () => {
  const provider: any = useWalletProvider();
  const chainId = useChainId();

  if (provider && isLocalChain(chainId)) {
    return getLocalLiquidityContract({ provider });
  }

  if (provider && isGoerli(chainId)) {
    return getGoerliLiquidityContract({ provider });
  }
};

export const useOffersContract = () => {
  const provider: any = useWalletProvider();
  const chainId = useChainId();

  if (provider && isLocalChain(chainId)) {
    return getLocalOffersContract({ provider });
  }

  if (provider && isGoerli(chainId)) {
    return getGoerliOffersContract({ provider });
  }
};

export const useLendingContract = () => {
  const provider: any = useWalletProvider();
  const chainId = useChainId();

  if (provider && isLocalChain(chainId)) {
    return getLocalLendingContract({ provider });
  }

  if (provider && isGoerli(chainId)) {
    return getGoerliLendingContract({ provider });
  }
};
