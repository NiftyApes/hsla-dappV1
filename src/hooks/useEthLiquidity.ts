import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { GNOSIS, GOERLI, LOCAL, MAINNET } from 'constants/contractAddresses';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useCEthContract } from './useCEthContract';
import { useChainId } from './useChainId';
import { useLiquidityContract } from './useContracts';
import { useWalletAddress } from './useWalletAddress';

export const useAvailableEthLiquidity = () => {
  const cacheCounter = useAppSelector((state: RootState) => state.counter);

  const address = useWalletAddress();

  const liquidityContract = useLiquidityContract();

  const cETHContract = useCEthContract();

  const [availableEthLiquidity, setAvailableEthLiquidity] = useState<number>();

  const chainId = useChainId();

  useEffect(() => {
    async function getETHLiquidity() {
      if (!address || !liquidityContract || !cETHContract) {
        return;
      }

      // This is address's balance in cEth
      const result = await liquidityContract.getCAssetBalance(
        address,
        chainId === '0x7a69'
          ? LOCAL.CETH.ADDRESS
          : chainId === '0x5'
          ? GOERLI.CETH.ADDRESS
          : chainId === '0x1'
          ? MAINNET.CETH.ADDRESS
          : chainId === '0x64'
          ? GNOSIS.CETH.ADDRESS
          : '0x0',
      );

      const exchangeRate = await cETHContract.exchangeRateStored();

      // We need to multiply by exchangeRate to get balance in Eth
      const liquidityInEth =
        Number(ethers.utils.formatEther(result)) *
        Number(ethers.utils.formatEther(exchangeRate));

      setAvailableEthLiquidity(Number(liquidityInEth.toFixed(5)));
    }

    getETHLiquidity();
  }, [address, liquidityContract, cETHContract, cacheCounter]);

  return {
    availableEthLiquidity,
  };
};
