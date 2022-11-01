/* eslint-disable consistent-return */
import { MAINNET } from 'constants/contractAddresses';
import { ethers } from 'ethers';
import {
  getGoerliLendingContract,
  getGoerliLiquidityContract,
  getGoerliOffersContract,
  getLocalLendingContract,
  getLocalLiquidityContract,
  getLocalOffersContract,
  getMainnetLendingContract,
  getMainnetLiquidityContract,
  getMainnetOffersContract,
} from 'helpers/getContracts';
import { useChainId } from './useChainId';
import { useWalletProvider } from './useWalletProvider';

let mainnetOffersContract: any;

export const isLocalChain = (cid: string | undefined): boolean | undefined => {
  return cid === '0x7a69';
};

export const isGoerli = (cid: string | undefined): boolean | undefined => {
  return cid === '0x5';
};

export const isMainnet = (cid: string | undefined): boolean | undefined => {
  return cid === '0x1';
};

export const useLiquidityContract = () => {
  const provider = useWalletProvider();
  const chainId = useChainId();

  if (provider && isLocalChain(chainId)) {
    return getLocalLiquidityContract({ provider });
  }

  if (provider && isGoerli(chainId)) {
    return getGoerliLiquidityContract({ provider });
  }

  if (provider && isMainnet(chainId)) {
    return getMainnetLiquidityContract({ provider });
  }
};

export const useOffersContract = () => {
  const provider = useWalletProvider();
  const chainId = useChainId();

  if (provider && isLocalChain(chainId)) {
    return getLocalOffersContract({ provider });
  }

  if (provider && isGoerli(chainId)) {
    return getGoerliOffersContract({ provider });
  }

  if (provider && isMainnet(chainId)) {
    return getMainnetOffersContract({ provider });
  }

  if (!provider && isMainnet(chainId)) {
    if (mainnetOffersContract) {
      return mainnetOffersContract;
    }

    const ethersProvider = new ethers.providers.AlchemyProvider(
      'mainnet',
      '_8-YJwskeUfHw9RMaQufSFupoqkd_ukD',
    );

    const contract = new ethers.Contract(
      MAINNET.OFFERS.ADDRESS,
      MAINNET.OFFERS.ABI,
      ethersProvider,
    );

    mainnetOffersContract = contract;

    return contract;
  }
};

export const useLendingContract = () => {
  const provider = useWalletProvider();
  const chainId = useChainId();

  if (provider && isLocalChain(chainId)) {
    return getLocalLendingContract({ provider });
  }

  if (provider && isGoerli(chainId)) {
    return getGoerliLendingContract({ provider });
  }

  if (provider && isMainnet(chainId)) {
    return getMainnetLendingContract({ provider });
  }
};
