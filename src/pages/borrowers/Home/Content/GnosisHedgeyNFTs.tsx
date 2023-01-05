import { useAppDispatch } from 'app/hooks';
import { useChainId } from 'hooks/useChainId';
import { useGnosisHedgeyContract } from 'hooks/useGnosisHedgeyContract';
import { useWalletAddress } from 'hooks/useWalletAddress';
import { fetchHedgeysByWalletAddress, resetNFTsByWalletAddress } from 'nft';
import React, { useEffect, useState } from 'react';
import { WalletNFTs } from './WalletNFTs';

export const GnosisHedgeyNFTs: React.FC = () => {
  const dispatch = useAppDispatch();
  const walletAddress = useWalletAddress();
  const chainId = useChainId();
  const hedgeyContract = useGnosisHedgeyContract();

  const [hasFetchedHedgeys] = useState(false);

  useEffect(() => {
    if (walletAddress && hedgeyContract && !hasFetchedHedgeys) {
      dispatch(
        fetchHedgeysByWalletAddress({
          walletAddress,
          contract: hedgeyContract,
        }),
      );
    }

    return () => {
      dispatch(resetNFTsByWalletAddress());
    };
  }, [walletAddress, chainId]);

  return <WalletNFTs />;
};
