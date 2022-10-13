import { Box, Center, SimpleGrid } from '@chakra-ui/react';
import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import SectionHeader from 'components/molecules/SectionHeader';
import { useWalletAddress } from 'hooks/useWalletAddress';
import _ from 'lodash';
import { NFT } from 'nft';
import { useNFTsByWalletAddress } from 'nft/state/nfts.slice';
import React from 'react';
import LoadingIndicator from '../../../../components/atoms/LoadingIndicator';
import { NFTCardContainer } from './NFTCardContainer';

export const WalletNFTs: React.FC = () => {
  const walletAddress = useWalletAddress();
  const nfts = useNFTsByWalletAddress(walletAddress || '');
  const offers = useAppSelector(
    (state: RootState) => state.loans.loanOffersByNFT,
  );
  const loans = useAppSelector(
    (state: RootState) => state.loans.loanAuctionByNFT,
  );

  const nftsWithLoans = nfts?.content?.filter((nft: NFT) => {
    return (
      loans[`${nft.contractAddress}_${nft.id}`] &&
      loans[`${nft.contractAddress}_${nft.id}`].content
    );
  });

  const nftsWithOffers = nfts?.content?.filter((nft: NFT) => {
    const offersContent =
      offers[`${nft.contractAddress}_${nft.id}`] &&
      offers[`${nft.contractAddress}_${nft.id}`].content;

    return offersContent && offersContent.length > 0;
  });

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
      <Box my="16px">
        <SectionHeader headerText="NFTs With Active Loans" />
      </Box>

      <SimpleGrid
        minChildWidth="240px"
        spacing={10}
        style={{ padding: '16px' }}
      >
        {nftsWithLoans?.map((item: any) => {
          return <NFTCardContainer item={item} key={item.id} />;
        })}
      </SimpleGrid>

      <Box my="16px">
        <SectionHeader headerText="NFTs With Offers" />
      </Box>
      <SimpleGrid
        minChildWidth="240px"
        spacing={10}
        style={{ padding: '16px' }}
      >
        {nftsWithLoans &&
          nftsWithOffers &&
          _.difference(nftsWithOffers, nftsWithLoans)?.map((item: any) => {
            return <NFTCardContainer item={item} key={item.id} />;
          })}
      </SimpleGrid>

      <Box my="16px">
        <SectionHeader headerText="NFTs With No Offers" />
      </Box>
      <SimpleGrid
        minChildWidth="240px"
        spacing={10}
        style={{ padding: '16px' }}
      >
        {nftsWithLoans &&
          nftsWithOffers &&
          walletNfts &&
          _.difference(walletNfts, [...nftsWithLoans, ...nftsWithOffers])?.map(
            (item: any) => {
              return <NFTCardContainer item={item} key={item.id} />;
            },
          )}
      </SimpleGrid>
    </>
  );
};
