import { useAppDispatch } from 'app/hooks';
import { transactionTypes } from 'constants/transactionTypes';
import { increment } from 'counter/counterSlice';
import { ErrorWithReason } from 'errors';
import { BigNumber, ethers } from 'ethers';
import { saveTransactionInDb } from 'helpers/saveTransactionInDb';
import { logError } from 'logging/logError';
import { useState } from 'react';
import { useChainId } from './useChainId';
import { useLendingContract } from './useContracts';
import { useGetTransactionTimestamp } from './useGetTransactionTimestamp';

export const useDrawLoanAmount = () => {
  const dispatch = useAppDispatch();

  const lendingContract = useLendingContract();

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

      setWithdrawStatus('PENDING');

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
        logError(e);
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
  };
};
