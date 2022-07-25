import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useWalletAddress } from './useWalletAddress';
import { useCEthContract } from './useCEthContract';
import cEthJSON from '../external/cEth/cEth.json';
import { useWalletProvider } from './useWalletProvider';
import { getLiquidityContract } from '../helpers/getLendingContract';

export const useEthLiquidity = () => {
  const cacheCounter = useAppSelector((state: RootState) => state.counter);

  const address = useWalletAddress();

  const provider = useWalletProvider();
  const niftyApesContract = provider ? getLiquidityContract({ provider }) : null;

  const cETHContract = useCEthContract();

  const [ethLiquidity, setEthLiquidity] = useState<string>();

  useEffect(() => {
    async function getETHLiquidity() {
      if (!address || !niftyApesContract || !cETHContract) {
        return;
      }

      // This is address's balance in cEth
      const result = await niftyApesContract.getCAssetBalance(address, cEthJSON.address);

      const exchangeRate = await cETHContract.exchangeRateStored();

      // We need to divide by exchangeRate to get balance in Eth
      const liquidityInEth =
        Number(ethers.utils.formatEther(result)) * Number(ethers.utils.formatEther(exchangeRate));

      setEthLiquidity(String(Number(liquidityInEth.toFixed(5))));
    }

    getETHLiquidity();
  }, [address, niftyApesContract, cETHContract, cacheCounter]);

  return {
    ethLiquidity,
  };
};
