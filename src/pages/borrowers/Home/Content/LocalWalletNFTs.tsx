import { SimpleGrid } from '@chakra-ui/react';
import { useAppDispatch } from 'app/hooks';
import SectionHeader from 'components/molecules/SectionHeader';
import { useChainId } from 'hooks/useChainId';
import { useLocalBaycContract } from 'hooks/useLocalBaycContract';
import { useLocalMaycContract } from 'hooks/useLocalMaycContract';
import { useLocalScaffoldEthNFTContract } from 'hooks/useLocalScaffoldEthNFTContract';
import { useWalletAddress } from 'hooks/useWalletAddress';
import { fetchNFTsByWalletAddress, useNFTsByWalletAddress } from 'nft/state/nfts.slice';
import React, { useEffect, useState } from 'react';
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
  const localScaffoldEthNftContract = useLocalScaffoldEthNFTContract();
  const nfts = useNFTsByWalletAddress(walletAddress || '');
  const [walletNfts2, setWalletNfts] = useState<any>();

  const getMainnetWalletNFTs = async () => {
    // make api key an env variable
    const callWalletNfts = await fetch(
      `https://eth-mainnet.g.alchemy.com/v2/Of3Km_--Ow1fNnMhaETmwnmWBFFHF3ZY/getNFTs?owner=${walletAddress}`,
    );
    setWalletNfts(await callWalletNfts.json());
  };

  useEffect(() => {
    getMainnetWalletNFTs();
  }, [walletAddress]);

  const [hasFetchedBaycNfts, setHasFetchedBaycNfts] = useState(false);
  const [hasFetchedMaycNfts, setHasFetchedMaycNfts] = useState(false);
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
    localScaffoldEthNftContract?.address,
  ]);

  const walletNfts = nfts?.content || [];

  if (!baycContract) {
    return null;
  }

  if (nfts?.fetching) {
    return <>{i18n.loadingText}</>;
  }

  const nftContracts = [
    '0x1cb1a5e65610aeff2551a50f76a87a7d3fb649c6',
    '0x7fcbb823ff16110e5a14c3c897dc0af334423e4f',
  ];

  console.log('walletNfts2', walletNfts2);

  console.log('walletNfts', walletNfts);

  return (
    <>
      <SectionHeader headerText={i18n.sectionHeaderText}></SectionHeader>

      <SimpleGrid minChildWidth="240px" spacing={10} style={{ padding: '16px' }}>
        {walletNfts2?.ownedNfts
          .filter((nft: any) => nftContracts.includes(nft.contract.address))
          .map((nft: any, i: number) => (
            <NFTCardContainer
              key={i}
              contract={nft.contract.address}
              item={{
                attributes: nft.metadata.attributes,
                contractAddress: nft.contract.address,
                description: nft.metadata.description,
                external_url: nft.metadata.external_url,
                id: String(Number(nft.id.tokenId)),
                image: nft.metadata.image,
                name: nft.metadata.name,
                owner: walletAddress || '0x0',
                collectionName: nft.contractMetadata.name,
              }}
            />
          ))}
      </SimpleGrid>

      <SimpleGrid minChildWidth="240px" spacing={10} style={{ padding: '16px' }}>
        {walletNfts?.map((item: any) => (
          <NFTCardContainer contract={baycContract} item={item} key={item.id} />
        ))}
      </SimpleGrid>
    </>
  );
};
