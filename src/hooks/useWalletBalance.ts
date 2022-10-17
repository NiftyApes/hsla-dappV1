import { formatEther } from '@ethersproject/units';
import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useWalletAddress } from './useWalletAddress';
import { useWalletProvider } from './useWalletProvider';

const DEFAULT_DECIMALS = 3;

export const useWalletBalance = () => {
  const address = useWalletAddress();

  const provider = useWalletProvider();

  const [balance, setBalance] = useState<number>();

  const cacheCounter = useAppSelector((state: RootState) => state.counter);

  useEffect(() => {
    async function getBalance() {
      if (!address || !provider) {
        return;
      }

      // Annoying amount of work to turn a BigNumber wei quantity
      // into an number Eth quantity w/ only so many decimals
      const ethersProvider = new ethers.providers.Web3Provider(provider);
      const balanceInWeiAsBigNum = await ethersProvider.getBalance(address);
      const balanceInEthAsStr = formatEther(balanceInWeiAsBigNum);
      const balanceInEthAsNum = Number(balanceInEthAsStr);
      const balanceInEthWithTrimmedDecimalsAsStr =
        balanceInEthAsNum.toFixed(DEFAULT_DECIMALS);
      const balanceInEthWithTrimmedDecimalsAsNum = Number(
        balanceInEthWithTrimmedDecimalsAsStr,
      );

      setBalance(balanceInEthWithTrimmedDecimalsAsNum);
    }

    getBalance();
  }, [address, provider, cacheCounter]);

  return balance;
};
