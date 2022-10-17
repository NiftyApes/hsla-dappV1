import { useAppDispatch } from 'app/hooks';
import { useChainId } from 'hooks/useChainId';
import { useLocalBaycContract } from 'hooks/useLocalBaycContract';
import { useLocalDoodlesContract } from 'hooks/useLocalDoodleContract';
import { useLocalMaycContract } from 'hooks/useLocalMaycContract';
import { useLocalNounsContract } from 'hooks/useLocalNounsContract';
import { useLocalScaffoldEthNFTContract } from 'hooks/useLocalScaffoldEthNFTContract';
import { useWalletAddress } from 'hooks/useWalletAddress';
import {
  fetchLocalNFTsByWalletAddress,
  resetNFTsByWalletAddress,
} from 'nft/state/nfts.slice';
import React, { useEffect, useState } from 'react';
import { WalletNFTs } from './WalletNFTs';

export const LocalhostContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const walletAddress = useWalletAddress();
  const chainId = useChainId();
  const baycContract = useLocalBaycContract();
  const maycContract = useLocalMaycContract();
  const doodlesContract = useLocalDoodlesContract();
  const nounsContract = useLocalNounsContract();
  const localScaffoldEthNftContract = useLocalScaffoldEthNFTContract();

  const [hasFetchedBaycNfts, setHasFetchedBaycNfts] = useState(false);
  const [hasFetchedMaycNfts, setHasFetchedMaycNfts] = useState(false);
  const [hasFetchedDoodleNfts, setHasFetchedDoodleNfts] = useState(false);
  const [hasFetchedNounsNfts, setHasFetchedNounsNfts] = useState(false);
  const [hasFetchedLocalNfts, setHasFetchedLocalNfts] = useState(false);

  useEffect(() => {
    if (walletAddress && baycContract && !hasFetchedBaycNfts) {
      dispatch(
        fetchLocalNFTsByWalletAddress({
          walletAddress,
          contract: baycContract,
        }),
      );
      setHasFetchedBaycNfts(true);
    }

    if (walletAddress && maycContract && !hasFetchedMaycNfts) {
      dispatch(
        fetchLocalNFTsByWalletAddress({
          walletAddress,
          contract: maycContract,
        }),
      );
      setHasFetchedMaycNfts(true);
    }

    if (walletAddress && doodlesContract && !hasFetchedDoodleNfts) {
      dispatch(
        fetchLocalNFTsByWalletAddress({
          walletAddress,
          contract: doodlesContract,
        }),
      );
      setHasFetchedDoodleNfts(true);
    }

    if (walletAddress && nounsContract && !hasFetchedNounsNfts) {
      dispatch(
        fetchLocalNFTsByWalletAddress({
          walletAddress,
          contract: nounsContract,
        }),
      );
      setHasFetchedNounsNfts(true);
    }

    if (walletAddress && localScaffoldEthNftContract && !hasFetchedLocalNfts) {
      dispatch(
        fetchLocalNFTsByWalletAddress({
          walletAddress,
          contract: localScaffoldEthNftContract,
        }),
      );
      setHasFetchedLocalNfts(true);
    }

    return () => {
      dispatch(resetNFTsByWalletAddress());
    };
  }, [
    walletAddress,
    chainId,
    baycContract?.address,
    maycContract?.address,
    doodlesContract?.address,
    nounsContract?.address,
    localScaffoldEthNftContract?.address,
  ]);

  return <WalletNFTs />;
};
