import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useCEthContract } from './useCEthContract';
import { useLiquidityContract } from './useContracts';
import { useWalletAddress } from './useWalletAddress';

export const useAvailableEthLiquidity = () => {
  const cacheCounter = useAppSelector((state: RootState) => state.counter);

  const address = useWalletAddress();

  const liquidityContract = useLiquidityContract();

  const cETHContract = useCEthContract();

  const [availableEthLiquidity, setAvailableEthLiquidity] = useState<number>();

  useEffect(() => {
    async function getETHLiquidity() {
      if (!address || !liquidityContract || !cETHContract) {
        return;
      }

      // This is address's balance in cEth
      const result = await liquidityContract.getCAssetBalance(
        address,
        '0x20572e4c090f15667cf7378e16fad2ea0e2f3eff',
      );

      const exchangeRate = await cETHContract.exchangeRateStored();

      // We need to divide by exchangeRate to get balance in Eth
      const liquidityInEth =
        Number(ethers.utils.formatEther(result)) * Number(ethers.utils.formatEther(exchangeRate));

      setAvailableEthLiquidity(Number(liquidityInEth.toFixed(5)));
    }

    getETHLiquidity();
  }, [address, liquidityContract, cETHContract, cacheCounter]);

  return {
    availableEthLiquidity,
  };
};
