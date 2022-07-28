import { SimpleGrid } from '@chakra-ui/react';
import { useLocalScaffoldEthNFTContract } from 'hooks/useLocalScaffoldEthNFTContract';
import { NFTCardContainer } from './NFTCardContainer';
import SectionHeader from 'components/molecules/SectionHeader';
import { useWalletAddress } from 'hooks/useWalletAddress';
import NFTCardLoading from 'components/molecules/NFTCardLoading';

export const LocalWalletNFTs: React.FC = () => {
  return null;
  // const walletAddress = useWalletAddress();
  // const contract = useLocalScaffoldEthNFTContract();
  // const nfts = useNFTsByWalletAddress(walletAddress, contract);

  // if (!contract || !nfts) {
  //   return null;
  // }

  // const walletNfts = nfts?.content || [];

  // return (
  //   <>
  //     <SectionHeader headerText="NFTs with Offers"></SectionHeader>
  //     <SimpleGrid minChildWidth="200px" spacing={10} style={{ padding: '16px' }}>
  //       {nfts?.fetching ? (
  //         <>
  //           <NFTCardLoading />
  //           <NFTCardLoading />
  //           <NFTCardLoading />
  //           <NFTCardLoading />
  //           <NFTCardLoading />
  //           <NFTCardLoading />
  //           <NFTCardLoading />
  //           <NFTCardLoading />
  //         </>
  //       ) : (
  //         walletNfts?.map((item: any) => (
  //           <NFTCardContainer contract={contract} item={item} key={item.id} />
  //         ))
  //       )}
  //     </SimpleGrid>
  //     <SectionHeader headerText="Your NFTs without Loan Offers"></SectionHeader>
  //     <SimpleGrid minChildWidth="200px" spacing={10} style={{ padding: '16px' }}>
  //       {nfts?.fetching ? (
  //         <NFTCardLoading />
  //       ) : (
  //         walletNfts?.map((item: any) => (
  //           <NFTCardContainer contract={contract} item={item} key={item.id} />
  //         ))
  //       )}
  //     </SimpleGrid>
  //   </>
  // );
};
