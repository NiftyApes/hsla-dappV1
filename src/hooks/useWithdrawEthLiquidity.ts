import { useAppDispatch, useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { increment } from 'counter/counterSlice';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useNiftyApesContract } from './useNiftyApesContract';
import { useWalletAddress } from './useWalletAddress';
import { useCEthContract } from './useCEthContract';
import cEthJSON from '../external/cEth/cEth.json';

export const useWithdrawEthLiquidity = () => {
  const cacheCounter = useAppSelector((state: RootState) => state.counter);
  const dispatch = useAppDispatch();

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

  if (!niftyApesContract) {
    return {
      executeLoanByBorrower: undefined,
    };
  }

  return {
    withdrawETHLiquidity: async ({
      ethToWithdraw,
      onTxSubmitted,
      onTxMined,
      onError,
    }: {
      ethToWithdraw: string;
      onTxSubmitted: any;
      onTxMined: any;
      onError: any;
    }) => {
      if (isNaN(Number(ethToWithdraw))) {
        throw Error('Need to supply a numeric value for ETH quantity');
      }

      try {
        const tx = await niftyApesContract.withdrawEth(ethers.utils.parseEther(ethToWithdraw));
        onTxSubmitted(tx);
        const receipt = await tx.wait();
        onTxMined(receipt);
      } catch (e) {
        onError(e);
      }

      dispatch(increment());
    },

    ethLiquidity: ethLiquidity,
  };
};
