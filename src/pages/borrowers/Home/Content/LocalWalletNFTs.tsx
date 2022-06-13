import React, { useEffect } from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import { fetchNFTsByWalletAddress, useNFTsByWalletAddress } from 'nft/state/nfts.slice';
import { useAppDispatch } from 'app/hooks';
import { useLocalScaffoldEthNFTContract } from 'hooks/useLocalScaffoldEthNFTContract';
import { NFTCardContainer } from './NFTCardContainer';
import SectionHeader from 'components/molecules/SectionHeader';
import { useWalletAddress } from 'hooks/useWalletAddress';
import { useChainId } from 'hooks/useChainId';

export const LocalhostContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const walletAddress = useWalletAddress();
  const chainId = useChainId();
  const contract = useLocalScaffoldEthNFTContract();
  const nfts = useNFTsByWalletAddress(walletAddress || '');

  useEffect(() => {
    if (walletAddress && contract && !nfts?.fetching) {
      dispatch(fetchNFTsByWalletAddress({ walletAddress, contract }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddress, chainId]);

  const walletNfts = nfts?.content || [];

  if (!contract) {
    return null;
  }

  return (
    <>
      <SectionHeader headerText="NFTs with Offers"></SectionHeader>
      <SimpleGrid minChildWidth="200px" spacing={10} style={{ padding: '16px' }}>
        {walletNfts?.map((item: any) => (
          <NFTCardContainer contract={contract} item={item} key={item.id} />
        ))}
      </SimpleGrid>
    </>
  );
};
