import { useAppDispatch } from 'app/hooks';
import { increment } from 'counter/counterSlice';
import { ethers } from 'ethers';
import { useNiftyApesContract } from './useNiftyApesContract';
import { useEthLiquidity } from './useEthLiquidity';

export const useWithdrawEthLiquidity = () => {
  const dispatch = useAppDispatch();

  const { ethLiquidity } = useEthLiquidity();

  const niftyApesContract = useNiftyApesContract();

  return {
    withdrawETHLiquidity: async ({
      ethToWithdraw,
      onTxSubmitted,
      onTxMined,
      onPending,
      onSuccess,
      onError,
    }: {
      ethToWithdraw: string;
      onTxSubmitted?: any;
      onTxMined?: any;
      onPending?: any;
      onSuccess?: any;
      onError?: any;
    }) => {
      if (isNaN(Number(ethToWithdraw))) {
        alert('Need to supply a numeric value for ETH quantity');
        return;
      }

      onPending && onPending();

      if (!niftyApesContract) {
        throw new Error('Contract is not defined');
      }

      try {
        const tx = await niftyApesContract.withdrawEth(ethers.utils.parseEther(ethToWithdraw));
        onTxSubmitted && onTxSubmitted(tx);
        const receipt = await tx.wait();
        onTxMined && onTxMined(receipt);
        onSuccess && onSuccess();
      } catch (e: any) {
        if (onError) {
          onError(e);
        } else {
          alert(e.message);
        }
      }

      dispatch(increment());
    },

    ethLiquidity,
  };
};
