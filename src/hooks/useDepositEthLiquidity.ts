import { useAppDispatch } from 'app/hooks';
import { increment } from 'counter/counterSlice';
import { ethers } from 'ethers';
import { useState } from 'react';
import { getLiquidityContract } from '../helpers/getContracts';
import { useEthLiquidity } from './useEthLiquidity';
import { useWalletProvider } from './useWalletProvider';

export const useDepositEthLiquidity = () => {
  const dispatch = useAppDispatch();

  const { ethLiquidity } = useEthLiquidity();

  const provider = useWalletProvider();
  const niftyApesContract = provider ? getLiquidityContract({ provider }) : null;

  const [depositStatus, setDepositStatus] = useState<'PENDING' | 'SUCCESS' | 'ERROR' | 'READY'>(
    'READY',
  );

  const [txObject, setTxObject] = useState<ethers.ContractTransaction | null>(null);

  const [txReceipt, setTxReceipt] = useState<ethers.ContractReceipt | null>(null);

  return {
    depositETHLiquidity: async ({ ethToDeposit }: { ethToDeposit: number }) => {
      if (!niftyApesContract) {
        throw new Error('Contract is not defined');
      }

      setDepositStatus('PENDING');

      try {
        const tx = await niftyApesContract.supplyEth({
          value: ethers.utils.parseEther(ethToDeposit.toString()),
        });
        setTxObject(tx);
        const receipt = await tx.wait();
        setTxReceipt(receipt);
        setDepositStatus('SUCCESS');
        setTimeout(() => {
          setDepositStatus('READY');
          setTxObject(null);
          setTxReceipt(null);
        }, 3000);
      } catch (e: any) {
        setDepositStatus('ERROR');
        setTimeout(() => {
          setDepositStatus('READY');
          setTxObject(null);
          setTxReceipt(null);
        }, 3000);
        console.error(e);
      }

      dispatch(increment());
    },
    depositStatus,
    txObject,
    txReceipt,
    ethLiquidity,
  };
};
