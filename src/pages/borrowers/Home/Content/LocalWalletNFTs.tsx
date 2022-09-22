import { Center, SimpleGrid } from '@chakra-ui/react';
import { useAppDispatch } from 'app/hooks';
import SectionHeader from 'components/molecules/SectionHeader';
import {
  BAYC_CONTRACT_ADDRESS,
  DOODLES_CONTRACT_ADDRESS,
  MAYC_CONTRACT_ADDRESS,
  NOUNS_CONTRACT_ADDRESS,
} from 'constants/contractAddresses';
import { useChainId } from 'hooks/useChainId';
import { useLocalBaycContract } from 'hooks/useLocalBaycContract';
import { useLocalDoodlesContract } from 'hooks/useLocalDoodleContract';
import { useLocalMaycContract } from 'hooks/useLocalMaycContract';
import { useLocalNounsContract } from 'hooks/useLocalNounsContract';
import { useLocalScaffoldEthNFTContract } from 'hooks/useLocalScaffoldEthNFTContract';
import { useWalletAddress } from 'hooks/useWalletAddress';
import {
  fetchLocalNFTsByWalletAddress,
  useNFTsByWalletAddress,
  resetLocalNFTsByWalletAddress,
} from 'nft/state/nfts.slice';
import React, { useEffect, useState } from 'react';
import LoadingIndicator from '../../../../components/atoms/LoadingIndicator';
import { NFTCardContainer } from './NFTCardContainer';

const i18n = {
  loadingText: 'Loading NFTs...',
  sectionHeaderText: 'NFTs with Offers',
};

export const LocalhostContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const walletAddress = useWalletAddress();
  const chainId = useChainId();
  const baycContract = useLocalBaycContract();
  const maycContract = useLocalMaycContract();
  const doodlesContract = useLocalDoodlesContract();
  const nounsContract = useLocalNounsContract();
  const localScaffoldEthNftContract = useLocalScaffoldEthNFTContract();
  const nfts = useNFTsByWalletAddress(walletAddress || '');

  const [hasFetchedBaycNfts, setHasFetchedBaycNfts] = useState(false);
  const [hasFetchedMaycNfts, setHasFetchedMaycNfts] = useState(false);
  const [hasFetchedDoodleNfts, setHasFetchedDoodleNfts] = useState(false);
  const [hasFetchedNounsNfts, setHasFetchedNounsNfts] = useState(false);
  const [hasFetchedLocalNfts, setHasFetchedLocalNfts] = useState(false);

  useEffect(() => {
    if (walletAddress && baycContract && !hasFetchedBaycNfts) {
      dispatch(fetchLocalNFTsByWalletAddress({ walletAddress, contract: baycContract }));
      setHasFetchedBaycNfts(true);
    }

    if (walletAddress && maycContract && !hasFetchedMaycNfts) {
      dispatch(fetchLocalNFTsByWalletAddress({ walletAddress, contract: maycContract }));
      setHasFetchedMaycNfts(true);
    }

    if (walletAddress && doodlesContract && !hasFetchedDoodleNfts) {
      dispatch(fetchLocalNFTsByWalletAddress({ walletAddress, contract: doodlesContract }));
      setHasFetchedMaycNfts(true);
    }

    if (walletAddress && nounsContract && !hasFetchedNounsNfts) {
      dispatch(fetchLocalNFTsByWalletAddress({ walletAddress, contract: nounsContract }));
      setHasFetchedLocalNfts(true);
    }

    if (walletAddress && localScaffoldEthNftContract && !hasFetchedLocalNfts) {
      dispatch(
        fetchLocalNFTsByWalletAddress({ walletAddress, contract: localScaffoldEthNftContract }),
      );
      setHasFetchedLocalNfts(true);
    }

    return () => {
      dispatch(resetLocalNFTsByWalletAddress());
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    walletAddress,
    chainId,
    baycContract?.address,
    maycContract?.address,
    doodlesContract?.address,
    nounsContract?.address,
    localScaffoldEthNftContract?.address,
  ]);

  const walletNfts = nfts?.content || [];

  if (nfts?.fetching) {
    return (
      <Center>
        <LoadingIndicator />
      </Center>
    );
  }

  return (
    <>
      <SectionHeader headerText={i18n.sectionHeaderText}></SectionHeader>

      <SimpleGrid minChildWidth="240px" spacing={10} style={{ padding: '16px' }}>
        {walletNfts?.map((item: any) => {
          const contract =
            item.contractAddress === BAYC_CONTRACT_ADDRESS
              ? baycContract
              : item.contractAddress === MAYC_CONTRACT_ADDRESS
              ? maycContract
              : item.contractAddress === DOODLES_CONTRACT_ADDRESS
              ? doodlesContract
              : item.contractAddress === NOUNS_CONTRACT_ADDRESS
              ? nounsContract
              : localScaffoldEthNftContract;

          if (!contract) {
            return null;
          }

          return <NFTCardContainer contract={contract} item={item} key={item.id} />;
        })}
      </SimpleGrid>
    </>
  );
};
