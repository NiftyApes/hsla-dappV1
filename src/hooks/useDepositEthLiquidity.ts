import { useAppDispatch } from 'app/hooks';
import { increment } from 'counter/counterSlice';
import { ethers } from 'ethers';
import { useEthLiquidity } from './useEthLiquidity';
import { useWalletProvider } from './useWalletProvider';
import { getLiquidityContract } from '../helpers/getContracts';

export const useDepositEthLiquidity = () => {
  const dispatch = useAppDispatch();

  const { ethLiquidity } = useEthLiquidity();

  const provider = useWalletProvider();
  const niftyApesContract = provider ? getLiquidityContract({ provider }) : null;

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

      if (!niftyApesContract) {
        throw new Error('Contract is not defined');
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
