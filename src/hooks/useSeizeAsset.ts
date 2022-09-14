import { useToast } from '@chakra-ui/toast';
import { updateLoanStatus } from 'api/updateLoanStatus';
import { useAppDispatch } from 'app/hooks';
import { transactionTypes } from 'constants/transactionTypes';
import { increment } from 'counter/counterSlice';
import { ethers } from 'ethers';
import { saveTransactionInDb } from 'helpers/saveTransactionInDb';
import { useState } from 'react';
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

  const [seizeStatus, setSeizeStatus] = useState<'PENDING' | 'SUCCESS' | 'ERROR' | 'READY'>(
    'READY',
  );

  const [txObject, setTxObject] = useState<ethers.ContractTransaction | null>(null);

  const [txReceipt, setTxReceipt] = useState<ethers.ContractReceipt | null>(null);

  const toast = useToast();

  if (!niftyApesContract) {
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
        const loan = await niftyApesContract.getLoanAuction(nftContractAddress, nftId);

        const tx = await niftyApesContract.seizeAsset(nftContractAddress, nftId);

        const receipt = await tx.wait();

        const transactionTimestamp = await getTransactionTimestamp(receipt);

        setTxReceipt(receipt);

        setSeizeStatus('SUCCESS');

        await saveTransactionInDb({
          from: receipt.from,
          transactionType: transactionTypes.ASSET_SEIZED,
          timestamp: transactionTimestamp,
          transactionHash: receipt.transactionHash,
          lender: (receipt as any).events[2].args.lender,
          borrower: (receipt as any).events[2].args.borrower,
          data: {
            nftContractAddress,
            nftId,
            amount: loan.amount,
            asset: 'ETH',
          },
        });

        await updateLoanStatus({
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