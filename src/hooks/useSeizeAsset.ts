import { useToast } from '@chakra-ui/toast';
import { updateLoanStatus } from 'api/updateLoanStatus';
import { useAppDispatch } from 'app/hooks';
import { transactionTypes } from 'constants/transactionTypes';
import { increment } from 'counter/counterSlice';
import { ErrorWithReason } from 'errors';
import { ethers } from 'ethers';
import { saveTransactionInDb } from 'helpers/saveTransactionInDb';
import { logError } from 'logging/logError';
import { useState } from 'react';
import { useChainId } from './useChainId';
import { useLendingContract } from './useContracts';
import { useGetTransactionTimestamp } from './useGetTransactionTimestamp';

export const useSeizeAsset = ({
  nftContractAddress,
  nftId,
}: {
  nftContractAddress?: string;
  nftId: string;
}) => {
  const niftyApesContract = useLendingContract();

  const dispatch = useAppDispatch();

  const { getTransactionTimestamp } = useGetTransactionTimestamp();

  const [seizeStatus, setSeizeStatus] = useState<
    'PENDING' | 'SUCCESS' | 'ERROR' | 'READY'
  >('READY');

  const [txObject, setTxObject] = useState<ethers.ContractTransaction | null>(
    null,
  );

  const [txReceipt, setTxReceipt] = useState<ethers.ContractReceipt | null>(
    null,
  );

  const toast = useToast();

  const chainId = useChainId();

  if (!niftyApesContract || !chainId) {
    return {
      seizeAsset: undefined,
    };
  }

  return {
    seizeAsset: async () => {
      if (!nftContractAddress) {
        throw new Error('NFT Contract Address not specified');
      }

      setSeizeStatus('PENDING');

      try {
        const tx = await niftyApesContract.seizeAsset(
          nftContractAddress,
          nftId,
        );

        const receipt = await tx.wait();

        if (receipt.status !== 1) {
          throw new ErrorWithReason('reason: revert');
        }

        const loan = (receipt as any).events[2].args.loanAuction;

        const transactionTimestamp = await getTransactionTimestamp(receipt);

        setTxReceipt(receipt);

        setSeizeStatus('SUCCESS');

        await saveTransactionInDb({
          chainId,
          from: receipt.from,
          transactionType: transactionTypes.ASSET_SEIZED,
          timestamp: transactionTimestamp,
          transactionHash: receipt.transactionHash,
          lender: loan.lender,
          borrower: loan.borrower,
          data: {
            nftContractAddress,
            nftId,
            amount: loan.amount,
            asset: 'ETH',
          },
        });

        await updateLoanStatus({
          chainId,
          nftContractAddress,
          nftId,
          loanBeginTimestamp: loan.loanBeginTimestamp,
          status: 'ASSET_SEIZED',
          transactionTimestamp,
          transactionHash: receipt.transactionHash,
        });

        toast({
          title: 'Asset seized successfully',
          status: 'success',
          position: 'top-right',
          isClosable: true,
        });

        setTimeout(() => {
          setSeizeStatus('READY');
          setTxObject(null);
          setTxReceipt(null);
        }, 3000);
      } catch (e) {
        logError(e);
        setSeizeStatus('ERROR');

        setTimeout(() => {
          setSeizeStatus('READY');
          setTxObject(null);
          setTxReceipt(null);
        }, 3000);

        console.error(e);
      }

      dispatch(increment());
    },
    seizeStatus,
    txObject,
    txReceipt,
  };
};
