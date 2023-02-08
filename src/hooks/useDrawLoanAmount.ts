import { useAppDispatch } from 'app/hooks';
import { increment } from 'counter/counterSlice';
import { ErrorWithReason } from 'errors';
import { BigNumber, ethers } from 'ethers';
import { logError } from 'logging/logError';
import { useState } from 'react';
import { useLendingContract } from './useContracts';

export const useDrawLoanAmount = () => {
  const dispatch = useAppDispatch();

  const lendingContract = useLendingContract();

  const [status, setStatus] = useState<
    'PENDING' | 'SUCCESS' | 'ERROR' | 'READY'
  >('READY');

  const [txObject, setTxObject] = useState<ethers.ContractTransaction | null>(
    null,
  );

  const [txReceipt, setTxReceipt] = useState<ethers.ContractReceipt | null>(
    null,
  );

  return {
    drawEthFromLoan: async ({
      cleanup,
      ethToWithdraw,
      nftContractAddress,
      nftId,
    }: {
      cleanup: () => void;
      ethToWithdraw: BigNumber;
      nftContractAddress: string;
      nftId: string;
    }) => {
      if (!lendingContract) {
        throw new Error('Contract is not defined');
      }

      setStatus('PENDING');

      try {
        const tx = await lendingContract.drawLoanAmount(
          nftContractAddress,
          BigNumber.from(nftId),
          ethToWithdraw,
        );

        setTxObject(tx);

        const receipt: any = await tx.wait();

        if (receipt.status !== 1) {
          throw new ErrorWithReason('reason: revert');
        }

        setTxReceipt(receipt);
        setStatus('SUCCESS');
        setTimeout(() => {
          setStatus('READY');
          setTxObject(null);
          setTxReceipt(null);
          cleanup();
        }, 3000);
      } catch (e: any) {
        logError(e);
        setStatus('ERROR');
        setTimeout(() => {
          setStatus('READY');
          setTxObject(null);
          setTxReceipt(null);
          cleanup();
        }, 3000);
        console.error(e);
      }

      dispatch(increment());
    },
    status,
    txObject,
    txReceipt,
  };
};
