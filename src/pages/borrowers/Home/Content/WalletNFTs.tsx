import { Box, Center, SimpleGrid } from '@chakra-ui/react';
import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import SectionHeader from 'components/molecules/SectionHeader';
import { useWalletAddress } from 'hooks/useWalletAddress';
import _ from 'lodash';
import { NFT } from 'nft';
import { useNFTsByWalletAddress } from 'nft/state/nfts.slice';
import React, { useMemo } from 'react';
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

  const nftsWithLoans = useMemo(() => {
    return (
      nfts?.content?.filter((nft: NFT) => {
        return (
          loans[`${nft.contractAddress}_${nft.id}`] &&
          loans[`${nft.contractAddress}_${nft.id}`].content
        );
      }) ?? []
    );
  }, [nfts]);

  const nftsWithOffers = useMemo(() => {
    return (
      nfts?.content?.filter((nft: NFT) => {
        const offersContent =
          offers[`${nft.contractAddress}_${nft.id}`] &&
          offers[`${nft.contractAddress}_${nft.id}`].content;

        return offersContent && offersContent.length > 0;
      }) ?? []
    );
  }, []);

  const walletNfts = nfts?.content || [];

  const NFTsWithOffers = useMemo(
    () => _.difference(nftsWithOffers, nftsWithLoans),
    [nftsWithOffers, nftsWithLoans],
  );

  const NFTsWithNoOffers = useMemo(
    () => _.difference(walletNfts, [...nftsWithLoans, ...nftsWithOffers]),
    [walletNfts, nftsWithLoans, nftsWithOffers],
  );

  if (nfts?.fetching) {
    return (
      <Center>
        <LoadingIndicator />
      </Center>
    );
  }

  return (
    <>
      {_.isEmpty(nftsWithLoans) ? null : (
        <>
          <Box my="16px">
            <SectionHeader headerText="NFTs With Active Loans" />
          </Box>

          <SimpleGrid
            columns={{ xl: 5, lg: 4, md: 3, sm: 2, xs: 1 }}
            spacing={10}
            style={{ padding: '16px' }}
          >
            {nftsWithLoans?.map((item: any) => {
              return (
                <NFTCardContainer
                  item={item}
                  key={`${item.contractAddress}___${item.id}`}
                />
              );
            })}
          </SimpleGrid>
        </>
      )}

      {_.isEmpty(NFTsWithOffers) ? null : (
        <>
          <Box my="16px">
            <SectionHeader headerText="NFTs With Offers" />
          </Box>
          <SimpleGrid
            columns={{ xl: 5, lg: 4, md: 3, sm: 2, xs: 1 }}
            spacing={10}
            style={{ padding: '16px' }}
          >
            {NFTsWithOffers?.map((item: any) => {
              return (
                <NFTCardContainer
                  item={item}
                  key={`${item.contractAddress}___${item.id}`}
                />
              );
            })}
          </SimpleGrid>
        </>
      )}

      {_.isEmpty(NFTsWithNoOffers) ? null : (
        <>
          <Box my="16px">
            <SectionHeader headerText="NFTs With No Offers" />
          </Box>
          <SimpleGrid
            columns={{ xl: 5, lg: 4, md: 3, sm: 2, xs: 1 }}
            spacing={10}
            style={{ padding: '16px' }}
          >
            {NFTsWithNoOffers?.map((item: any) => {
              return (
                <NFTCardContainer
                  item={item}
                  key={`${item.contractAddress}___${item.id}`}
                />
              );
            })}
          </SimpleGrid>
        </>
      )}
    </>
  );
};
