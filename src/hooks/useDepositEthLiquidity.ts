import { useAppDispatch } from 'app/hooks';
import { increment } from 'counter/counterSlice';
import { ethers } from 'ethers';
import { useState } from 'react';
import { getLiquidityContract } from '../helpers/getContracts';
import { saveTransactionInDb } from '../helpers/saveTransactionInDb';
import { useAvailableEthLiquidity } from './useEthLiquidity';
import { useGetTransactionTimestamp } from './useGetTransactionTimestamp';
import { useWalletProvider } from './useWalletProvider';

export const useDepositEthLiquidity = () => {
  const dispatch = useAppDispatch();

  const { availableEthLiquidity } = useAvailableEthLiquidity();

  const provider = useWalletProvider();
  const niftyApesContract = provider ? getLiquidityContract({ provider }) : null;

  const [depositStatus, setDepositStatus] = useState<'PENDING' | 'SUCCESS' | 'ERROR' | 'READY'>(
    'READY',
  );

  const [txObject, setTxObject] = useState<ethers.ContractTransaction | null>(null);

  const [txReceipt, setTxReceipt] = useState<ethers.ContractReceipt | null>(null);

  const { getTransactionTimestamp } = useGetTransactionTimestamp();

  return {
    depositETHLiquidity: async ({
      ethToDeposit,
      cleanup,
    }: {
      ethToDeposit: number;
      cleanup: () => void;
    }) => {
      if (!niftyApesContract) {
        throw new Error('Contract is not defined');
      }

      setDepositStatus('PENDING');

      try {
        const tx = await niftyApesContract.supplyEth({
          value: ethers.utils.parseEther(ethToDeposit.toString()),
        });

        setTxObject(tx);

        const receipt: any = await tx.wait();

        const timestamp = await getTransactionTimestamp(receipt);

        await saveTransactionInDb({
          from: receipt.from,
          transactionType: 'DEPOSIT_LIQUIDITY',
          timestamp,
          transactionHash: receipt.transactionHash,
          args: {
            amount: receipt.events[4].args.amount.toString(),
            asset: 'ETH',
          },
        });

        setTxReceipt(receipt);
        setDepositStatus('SUCCESS');
        setTimeout(() => {
          setDepositStatus('READY');
          setTxObject(null);
          setTxReceipt(null);
          cleanup();
        }, 3000);
      } catch (e: any) {
        setDepositStatus('ERROR');
        setTimeout(() => {
          setDepositStatus('READY');
          setTxObject(null);
          setTxReceipt(null);
          cleanup();
        }, 3000);
        console.error(e);
      }

      dispatch(increment());
    },
    depositStatus,
    txObject,
    txReceipt,
    availableEthLiquidity,
  };
};
