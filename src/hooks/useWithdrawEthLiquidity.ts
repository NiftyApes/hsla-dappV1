import { useAppDispatch } from 'app/hooks';
import { transactionTypes } from 'constants/transactionTypes';
import { increment } from 'counter/counterSlice';
import { ethers } from 'ethers';
import { saveTransactionInDb } from 'helpers/saveTransactionInDb';
import { useState } from 'react';
import { useChainId } from './useChainId';
import { useLiquidityContract } from './useContracts';
import { useAvailableEthLiquidity } from './useEthLiquidity';
import { useGetTransactionTimestamp } from './useGetTransactionTimestamp';

export const useWithdrawEthLiquidity = () => {
  const dispatch = useAppDispatch();

  const { availableEthLiquidity } = useAvailableEthLiquidity();

  const liquidityContract = useLiquidityContract();

  const [withdrawStatus, setWithdrawStatus] = useState<
    'PENDING' | 'SUCCESS' | 'ERROR' | 'READY'
  >('READY');

  const [txObject, setTxObject] = useState<ethers.ContractTransaction | null>(
    null,
  );

  const [txReceipt, setTxReceipt] = useState<ethers.ContractReceipt | null>(
    null,
  );

  const { getTransactionTimestamp } = useGetTransactionTimestamp();

  const chainId = useChainId();

  return {
    withdrawETHLiquidity: async ({
      ethToWithdraw,
      cleanup,
    }: {
      ethToWithdraw: number;
      cleanup: () => void;
    }) => {
      if (!liquidityContract) {
        throw new Error('Contract is not defined');
      }

      setWithdrawStatus('PENDING');

      try {
        const tx = await liquidityContract.withdrawEth(
          ethers.utils.parseEther(ethToWithdraw.toString()),
        );

        setTxObject(tx);

        const receipt: any = await tx.wait();

        const timestamp = await getTransactionTimestamp(receipt);

        await saveTransactionInDb({
          chainId,
          from: receipt.from,
          transactionType: transactionTypes.LIQUIDITY_WITHDRAWN,
          timestamp,
          transactionHash: receipt.transactionHash,
          lender: receipt.from,
          data: {
            amount: ethers.utils
              .parseEther(ethToWithdraw.toString())
              .toString(),
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
