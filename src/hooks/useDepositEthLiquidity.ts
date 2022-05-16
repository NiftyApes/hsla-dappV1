import { useAppDispatch } from 'app/hooks';
import { increment } from 'counter/counterSlice';
import { ethers } from 'ethers';
import { useNiftyApesContract } from './useNiftyApesContract';
import { useEthLiquidity } from './useEthLiquidity';

export const useDepositEthLiquidity = () => {
  const dispatch = useAppDispatch();

  const { ethLiquidity } = useEthLiquidity();

  const niftyApesContract = useNiftyApesContract();

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

    ethLiquidity,
  };
};
