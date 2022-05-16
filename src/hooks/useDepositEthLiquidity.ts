import { useAppDispatch, useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { increment } from 'counter/counterSlice';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useNiftyApesContract } from './useNiftyApesContract';
import { useWalletAddress } from './useWalletAddress';
import { useCEthContract } from './useCEthContract';
import cEthJSON from '../external/cEth/cEth.json';

export const useDepositEthLiquidity = () => {
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

  return {
    depositETHLiquidity: async ({
      ethToDeposit,
      onTxSubmitted,
      onTxMined,
      onPending,
      onSuccess,
      onError,
    }: {
      ethToDeposit: string;
      onTxSubmitted?: any;
      onTxMined?: any;
      onPending?: any;
      onSuccess?: any;
      onError?: any;
    }) => {
      if (isNaN(Number(ethToDeposit))) {
        alert('Need to supply a numeric value for ETH quantity');
        return;
      }

      onPending && onPending();

      try {
        const tx = await niftyApesContract.supplyEth({
          value: ethers.utils.parseEther(ethToDeposit),
        });
        onTxSubmitted && onTxSubmitted(tx);
        const receipt = await tx.wait();
        onTxMined && onTxMined(receipt);
        onSuccess && onSuccess();
      } catch (e) {
        if (onError) {
          onError(e);
        } else {
          alert(e);
        }
      }

      dispatch(increment());
    },

    ethLiquidity: ethLiquidity,
  };
};
