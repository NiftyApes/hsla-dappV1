import { useAppDispatch } from 'app/hooks';
import { transactionTypes } from 'constants/transactionTypes';
import { increment } from 'counter/counterSlice';
import { ethers } from 'ethers';
import { saveTransactionInDb } from 'helpers/saveTransactionInDb';
import { useState } from 'react';
import { getLiquidityContract } from '../helpers/getContracts';
import { useAvailableEthLiquidity } from './useEthLiquidity';
import { useGetTransactionTimestamp } from './useGetTransactionTimestamp';
import { useWalletProvider } from './useWalletProvider';

export const useWithdrawEthLiquidity = () => {
  const dispatch = useAppDispatch();

  const { availableEthLiquidity } = useAvailableEthLiquidity();

  const provider = useWalletProvider();
  const niftyApesContract = provider ? getLiquidityContract({ provider }) : null;

  const [withdrawStatus, setWithdrawStatus] = useState<'PENDING' | 'SUCCESS' | 'ERROR' | 'READY'>(
    'READY',
  );

  const [txObject, setTxObject] = useState<ethers.ContractTransaction | null>(null);

  const [txReceipt, setTxReceipt] = useState<ethers.ContractReceipt | null>(null);

  const { getTransactionTimestamp } = useGetTransactionTimestamp();

  return {
    withdrawETHLiquidity: async ({
      ethToWithdraw,
      cleanup,
    }: {
      ethToWithdraw: number;
      cleanup: () => void;
    }) => {
      if (!niftyApesContract) {
        throw new Error('Contract is not defined');
      }

      setWithdrawStatus('PENDING');

      try {
        const tx = await niftyApesContract.withdrawEth(
          ethers.utils.parseEther(ethToWithdraw.toString()),
        );

        setTxObject(tx);

        const receipt: any = await tx.wait();

        const timestamp = await getTransactionTimestamp(receipt);

        await saveTransactionInDb({
          from: receipt.from,
          transactionType: transactionTypes.WITHDRAW_LIQUIDITY,
          timestamp,
          transactionHash: receipt.transactionHash,
          args: {
            amount: ethers.utils.parseEther(ethToWithdraw.toString()).toString(),
            asset: 'ETH',
          },
        });

        setTxReceipt(receipt);
        setWithdrawStatus('SUCCESS');
        setTimeout(() => {
          setWithdrawStatus('READY');
          setTxObject(null);
          setTxReceipt(null);
          cleanup();
        }, 3000);
      } catch (e: any) {
        setWithdrawStatus('ERROR');
        setTimeout(() => {
          setWithdrawStatus('READY');
          setTxObject(null);
          setTxReceipt(null);
          cleanup();
        }, 3000);
        console.error(e);
      }

      dispatch(increment());
    },
    withdrawStatus,
    txObject,
    txReceipt,
    availableEthLiquidity,
  };
};
