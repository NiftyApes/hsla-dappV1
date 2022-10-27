import { Box, Center, Link, SimpleGrid, Text } from '@chakra-ui/react';
import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import SectionHeader from 'components/molecules/SectionHeader';
import { useWalletAddress } from 'hooks/useWalletAddress';
import _ from 'lodash';
import { NFT } from 'nft';
import { useNFTsByWalletAddress } from 'nft/state/nfts.slice';
import React, { useContext } from 'react';
import { WalletContext } from 'lib/contexts/WalletProvider';
import LoadingIndicator from '../../../../components/atoms/LoadingIndicator';
import { NFTCardContainer } from './NFTCardContainer';

export const WalletNFTs: React.FC = () => {
  const { connectWallet } = useContext(WalletContext);
  const walletAddress = useWalletAddress();
  const nfts = useNFTsByWalletAddress(walletAddress || '');
  const offers = useAppSelector(
    (state: RootState) => state.loans.loanOffersByNFT,
  );
  const loans = useAppSelector(
    (state: RootState) => state.loans.loanAuctionByNFT,
  );

  const nftsWithLoans =
    nfts?.content?.filter((nft: NFT) => {
      return (
        loans[`${nft.contractAddress}_${nft.id}`] &&
        loans[`${nft.contractAddress}_${nft.id}`].content
      );
    }) ?? [];

  const nftsWithOffers =
    nfts?.content?.filter((nft: NFT) => {
      const offersContent =
        offers[`${nft.contractAddress}_${nft.id}`] &&
        offers[`${nft.contractAddress}_${nft.id}`].content;

      return offersContent && offersContent.length > 0;
    }) ?? [];

  const walletNfts = nfts?.content || [];

  const NFTsWithOffers = _.difference(nftsWithOffers, nftsWithLoans);

  const NFTsWithNoOffers = _.difference(walletNfts, [
    ...nftsWithLoans,
    ...nftsWithOffers,
  ]);

  console.log({ NFTsWithNoOffers });

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

      <Box my="16px">
        <SectionHeader headerText="NFTs With Offers" />
      </Box>
      {_.isEmpty(NFTsWithOffers) ? (
        <Box my={10}>
          {walletAddress ? (
            <>
              <Center>
                <Text fontStyle="italic" color="gray.500">
                  😢 No Offers Found For Your NFT 😢
                </Text>
              </Center>
              <Center mt={4}>
                <Link
                  target="_blank"
                  href="https://docs.niftyapes.money/borrowers-dapp-guide/borrow-page"
                  fontWeight="bold"
                  color="purple"
                >
                  How Does Borrowing Work?
                </Link>
              </Center>
            </>
          ) : (
            <>
              <Center>
                <Text fontStyle="italic" color="gray.500">
                  Connect Your Wallet to See All Liquidity Offers
                </Text>
              </Center>
              <Center mt={4}>
                <Link onClick={connectWallet} fontWeight="bold" color="purple">
                  CONNECT YOUR WALLET
                </Link>
              </Center>
            </>
          )}
        </Box>
      ) : (
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
      )}

      <Box my="16px">
        <SectionHeader headerText="NFTs With No Offers" />
      </Box>
      {_.isEmpty(NFTsWithNoOffers) ? (
        <Center my={10}>
          <Text fontStyle="italic" color="gray.500">
            No NFTs With No Offers
          </Text>
        </Center>
      ) : (
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
      )}
    </>
  );
};
