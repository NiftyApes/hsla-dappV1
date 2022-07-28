import { SimpleGrid } from '@chakra-ui/react';
import SectionHeader from 'components/molecules/SectionHeader';
import NFTCardLoading from 'components/molecules/NFTCardLoading';
import NFTNoOfferCard from 'components/molecules/NFTNoOfferCard';
import { useBorrowerSearch } from 'hooks/useBorrowerSearch';
// import { useAppDispatch } from 'app/hooks';
// import {
//   AlchemyGetNFTsResponse,
//   AlchemyNFTObject,
//   fetchNFTsByWalletAddress,
//   fetchNFTsByWalletAddressAlchemy,
//   selectors,
//   useNFTsSelector,
// } from 'nft';
import { useWalletAddress } from 'hooks/useWalletAddress';

const renderNFTCardsLoading = () => {
  return (
    <>
      <NFTCardLoading />
      <NFTCardLoading />
      <NFTCardLoading />
      <NFTCardLoading />
      <NFTCardLoading />
      <NFTCardLoading />
      <NFTCardLoading />
      <NFTCardLoading />
    </>
  );
};

export const TestnetWalletNFTs: React.FC = () => {
  const walletAddress = useWalletAddress();
  const { getCurrentNFTs } = useBorrowerSearch(walletAddress);

  const walletNftsWithOffers = getCurrentNFTs({ hasOffer: true });
  const walletNftsWithoutOffers = getCurrentNFTs({ hasOffer: false });

  return (
    <>
      <SectionHeader headerText="NFTs with Offers"></SectionHeader>
      <SimpleGrid minChildWidth="200px" spacing={10} style={{ padding: '16px' }}>
        {walletNftsWithOffers.content === undefined || walletNftsWithOffers.fetching ? (
          renderNFTCardsLoading()
        ) : walletNftsWithOffers.content.length === 0 ? (
          <div>None of your NFTs currently have offers</div>
        ) : (
          // walletNfts?.ownedNfts?.map((item: any) => (
          //   <NFTCardContainer contract={contract} item={item} key={item.id} />
          // ))
          walletNftsWithOffers?.content?.map((item) => (
            <NFTNoOfferCard
              key={`${item.contractAddress}-${item.id}`}
              collectionName=""
              tokenName={`${item.name}`}
              id={`${item.id}`}
              img={item.image}
            />
          ))
        )}
      </SimpleGrid>
      <SectionHeader headerText="Your NFTs without Loan Offers"></SectionHeader>
      <SimpleGrid minChildWidth="200px" spacing={10} style={{ padding: '16px' }}>
        {walletNftsWithoutOffers === undefined ? (
          <NFTCardLoading />
        ) : (
          walletNftsWithoutOffers?.content?.map((item) => (
            <NFTNoOfferCard
              key={item.uniqueKey}
              collectionName=""
              tokenName={`${item.name}`}
              id={`${item.id}`}
              img={item.image}
            />
          ))
          // walletNfts?.ownedNfts.map((item: any) => (
          //   <NFTCardContainer contract={contract} item={item} key={item.id} />
          // ))
        )}
      </SimpleGrid>
    </>
  );
};
