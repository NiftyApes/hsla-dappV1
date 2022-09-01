import { Center, SimpleGrid } from '@chakra-ui/react';
import { useAppDispatch } from 'app/hooks';
import SectionHeader from 'components/molecules/SectionHeader';
import {
  BAYC_CONTRACT_ADDRESS,
  DOODLES_CONTRACT_ADDRESS,
  MAYC_CONTRACT_ADDRESS,
} from 'constants/contractAddresses';
import { useChainId } from 'hooks/useChainId';
import { useLocalBaycContract } from 'hooks/useLocalBaycContract';
import { useLocalDoodlesContract } from 'hooks/useLocalDoodleContract';
import { useLocalMaycContract } from 'hooks/useLocalMaycContract';
import { useLocalScaffoldEthNFTContract } from 'hooks/useLocalScaffoldEthNFTContract';
import { useWalletAddress } from 'hooks/useWalletAddress';
import { fetchNFTsByWalletAddress, useNFTsByWalletAddress } from 'nft/state/nfts.slice';
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
  const localScaffoldEthNftContract = useLocalScaffoldEthNFTContract();
  const nfts = useNFTsByWalletAddress(walletAddress || '');

  const [hasFetchedBaycNfts, setHasFetchedBaycNfts] = useState(false);
  const [hasFetchedMaycNfts, setHasFetchedMaycNfts] = useState(false);
  const [hasFetchedDoodleNfts, setHasFetchedDoodleNfts] = useState(false);
  const [hasFetchedLocalNfts, setHasFetchedLocalNfts] = useState(false);

  useEffect(() => {
    if (walletAddress && baycContract && !hasFetchedBaycNfts) {
      dispatch(fetchNFTsByWalletAddress({ walletAddress, contract: baycContract }));
      setHasFetchedBaycNfts(true);
    }

    if (walletAddress && maycContract && !hasFetchedMaycNfts) {
      dispatch(fetchNFTsByWalletAddress({ walletAddress, contract: maycContract }));
      setHasFetchedMaycNfts(true);
    }

    if (walletAddress && doodlesContract && !hasFetchedDoodleNfts) {
      dispatch(fetchNFTsByWalletAddress({ walletAddress, contract: doodlesContract }));
      setHasFetchedMaycNfts(true);
    }

    if (walletAddress && localScaffoldEthNftContract && !hasFetchedLocalNfts) {
      dispatch(fetchNFTsByWalletAddress({ walletAddress, contract: localScaffoldEthNftContract }));
      setHasFetchedLocalNfts(true);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    walletAddress,
    chainId,
    baycContract?.address,
    maycContract?.address,
    doodlesContract?.address,
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
