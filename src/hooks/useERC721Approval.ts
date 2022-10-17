/* eslint-disable @typescript-eslint/no-unused-expressions */
import { RootState } from 'app/store';
import { getEthersContractWithEIP1193Provider } from 'helpers/getEthersContractWithEIP1193Provider';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { increment } from '../counter/counterSlice';
import { useWalletAddress } from './useWalletAddress';
import { useWalletProvider } from './useWalletProvider';

export const useERC721Approval = ({
  tokenId,
  contractAddress,
  operator,
}: {
  contractAddress: string;
  operator?: string;
  tokenId?: string;
}) => {
  const owner = useWalletAddress();

  const [hasApproval, setHasApproval] = useState<boolean>();
  const [hasCheckedApproval, setHasCheckedApproval] = useState(false);

  const dispatch = useAppDispatch();

  const cacheCounter = useAppSelector((state: RootState) => state.counter);

  const provider: any = useWalletProvider();

  const minimumAbi = [
    {
      inputs: [
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      ],
      name: 'approve',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
      name: 'getApproved',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
  ];

  const contract = getEthersContractWithEIP1193Provider({
    abi: minimumAbi,
    address: contractAddress,
    provider,
  });

  useEffect(() => {
    async function checkWhetherHasApproval() {
      if (!contract || !tokenId) {
        return;
      }

      const result = await contract.getApproved(tokenId);

      setHasApproval(result === operator);
      setHasCheckedApproval(true);
    }

    checkWhetherHasApproval();
  }, [owner, contract, tokenId, cacheCounter]);

  return {
    hasApproval,
    hasCheckedApproval,

    grantApproval: async ({
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
        const tx = await contract?.approve(operator, tokenId);
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
