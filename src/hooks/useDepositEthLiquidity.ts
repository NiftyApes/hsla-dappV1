import { useAppDispatch } from 'app/hooks';
import { transactionTypes } from 'constants/transactionTypes';
import { increment } from 'counter/counterSlice';
import { ethers } from 'ethers';
import { useState } from 'react';
import { saveTransactionInDb } from '../helpers/saveTransactionInDb';
import { useChainId } from './useChainId';
import { useLiquidityContract } from './useContracts';
import { useAvailableEthLiquidity } from './useEthLiquidity';
import { useGetTransactionTimestamp } from './useGetTransactionTimestamp';

export const useDepositEthLiquidity = () => {
  const dispatch = useAppDispatch();

  const { availableEthLiquidity } = useAvailableEthLiquidity();

  const liquidityContract = useLiquidityContract();

  const [depositStatus, setDepositStatus] = useState<'PENDING' | 'SUCCESS' | 'ERROR' | 'READY'>(
    'READY',
  );

  const [txObject, setTxObject] = useState<ethers.ContractTransaction | null>(null);

  const [txReceipt, setTxReceipt] = useState<ethers.ContractReceipt | null>(null);

  const { getTransactionTimestamp } = useGetTransactionTimestamp();

  const chainId = useChainId();

  return {
    depositETHLiquidity: async ({
      ethToDeposit,
      cleanup,
    }: {
      ethToDeposit: number;
      cleanup: () => void;
    }) => {
      if (!liquidityContract) {
        throw new Error('Contract is not defined');
      }

      setDepositStatus('PENDING');

      try {
        const tx = await liquidityContract.supplyEth({
          value: ethers.utils.parseEther(ethToDeposit.toString()),
        });

        setTxObject(tx);

        const receipt: any = await tx.wait();

        const timestamp = await getTransactionTimestamp(receipt);

        await saveTransactionInDb({
          chainId,
          from: receipt.from,
          transactionType: transactionTypes.LIQUIDITY_DEPOSITED,
          timestamp,
          transactionHash: receipt.transactionHash,
          lender: receipt.from,
          data: {
            amount: ethers.utils.parseEther(ethToDeposit.toString()).toString(),
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
