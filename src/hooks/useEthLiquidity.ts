import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useNiftyApesContract } from './useNiftyApesContract';
import { useWalletAddress } from './useWalletAddress';
import { useCEthContract } from './useCEthContract';
import cEthJSON from '../external/cEth/cEth.json';

export const useEthLiquidity = () => {
  const cacheCounter = useAppSelector((state: RootState) => state.counter);

  const address = useWalletAddress();
  const niftyApesContract = useNiftyApesContract();
  const cETHContract = useCEthContract();

  const [ethLiquidity, setEthLiquidity] = useState<string>();

  useEffect(() => {
    async function getETHLiquidity() {
      if (!address || !niftyApesContract) {
        return;
      }

      // This is address's balance in cEth
      const result = await niftyApesContract.getCAssetBalance(address, cEthJSON.address);

      const exchangeRate = await cETHContract.exchangeRateStored();

      // We need to divide by exchangeRate to get balance in Eth
      const liquidityInEth =
        Number(ethers.utils.formatEther(result)) * Number(ethers.utils.formatEther(exchangeRate));

      setEthLiquidity(liquidityInEth.toFixed(2));
    }

    getETHLiquidity();
  }, [address, niftyApesContract, cacheCounter]);

  return {
    ethLiquidity,
  };
};
