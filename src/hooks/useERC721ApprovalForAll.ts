import { Contract } from 'ethers';
import { useEffect, useState } from 'react';
import { useWalletAddress } from './useWalletAddress';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { increment } from '../counter/counterSlice';
import { RootState } from 'app/store';

export const useERC721ApprovalForAll = ({
  contract,
  operator,
}: {
  contract?: Contract;
  operator?: string;
}) => {
  const owner = useWalletAddress();

  const [hasApprovalForAll, setHasApprovalForAll] = useState<boolean>();
  const [hasCheckedApproval, setHasCheckedApproval] = useState(false);

  const dispatch = useAppDispatch();

  const cacheCounter = useAppSelector((state: RootState) => state.counter);

  useEffect(() => {
    checkWhetherHasApprovalForAll();

    async function checkWhetherHasApprovalForAll() {
      if (!contract || !operator || !owner) {
        return;
      }

      const result = await contract.isApprovedForAll(owner, operator);

      setHasApprovalForAll(result);
      setHasCheckedApproval(true);
    }
  }, [owner, contract, cacheCounter]);

  return {
    hasApprovalForAll,
    hasCheckedApproval,
    grantApprovalForAll: async ({
      onTxSubmitted,
      onTxMined,
      onPending,
      onSuccess,
      onError,
    }: {
      onTxSubmitted?: any;
      onTxMined?: any;
      onPending?: any;
      onSuccess?: any;
      onError?: any;
    }) => {
      onPending && onPending();
      try {
        const tx = await contract?.setApprovalForAll(operator, true);
        onTxSubmitted && onTxSubmitted(tx);
        const receipt = await tx.wait();
        onTxMined && onTxMined(receipt);
        onSuccess && onSuccess();
      } catch (e: any) {
        if (onError) {
          onError(e);
        } else {
          alert(e.message);
        }
      }
      dispatch(increment());
    },
    revokeApprovalForAll: async ({
      onTxSubmitted,
      onTxMined,
      onPending,
      onSuccess,
      onError,
    }: {
      onTxSubmitted?: any;
      onTxMined?: any;
      onPending?: any;
      onSuccess?: any;
      onError?: any;
    }) => {
      onPending && onPending();
      try {
        const tx = await contract?.setApprovalForAll(operator, false);
        onTxSubmitted && onTxSubmitted(tx);
        const receipt = await tx.wait();
        onTxMined && onTxMined(receipt);
        onSuccess && onSuccess();
      } catch (e: any) {
        if (onError) {
          onError(e);
        } else {
          alert(e.message);
        }
      }
      dispatch(increment());
    },
  };
};
