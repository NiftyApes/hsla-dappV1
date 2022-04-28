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
    grantApprovalForAll: async ({ onTxSubmitted, onTxMined, onError }: any) => {
      try {
        const tx = await contract?.setApprovalForAll(operator, true);
        onTxSubmitted(tx);
        const receipt = await tx.wait();
        onTxMined(receipt);
      } catch (e) {
        if (onError) {
          onError(e);
        } else {
          alert(e);
        }
      }
      dispatch(increment());
    },
    revokeApprovalForAll: async ({ onTxSubmitted, onTxMined, onError }: any) => {
      try {
        const tx = await contract?.setApprovalForAll(operator, false);
        onTxSubmitted(tx);
        const receipt = await tx.wait();
        onTxMined(receipt);
      } catch (e) {
        if (onError) {
          onError(e);
        } else {
          alert(e);
        }
      }
      dispatch(increment());
    },
  };
};
