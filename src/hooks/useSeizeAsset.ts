import { useAppDispatch } from 'app/hooks';
import { increment } from 'counter/counterSlice';
import { ethers } from 'ethers';
import { useState } from 'react';
import { useLendingContract } from './useContracts';

export const useSeizeAsset = ({
  nftContractAddress,
  nftId,
}: {
  nftContractAddress?: string;
  nftId: string;
}) => {
  const niftyApesContract = useLendingContract();

  const dispatch = useAppDispatch();

  const [seizeStatus, setSeizeStatus] = useState<'PENDING' | 'SUCCESS' | 'ERROR' | 'READY'>(
    'READY',
  );

  const [txObject, setTxObject] = useState<ethers.ContractTransaction | null>(null);

  const [txReceipt, setTxReceipt] = useState<ethers.ContractReceipt | null>(null);

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
        const tx = await niftyApesContract.seizeAsset(nftContractAddress, nftId);

        const receipt = await tx.wait();

        setTxReceipt(receipt);
        setSeizeStatus('SUCCESS');
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
