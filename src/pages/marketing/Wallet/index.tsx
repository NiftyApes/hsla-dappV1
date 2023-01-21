import React, { useEffect } from 'react';
import { Box, Center, Text, VStack } from '@chakra-ui/react';
import { useRaribleWalletNFTs } from '../../../hooks/useRaribleWalletNFTs';
import LoadingIndicator from '../../../components/atoms/LoadingIndicator';
import { useTopNiftyApesCollections } from '../../../hooks/useCollectionsByLiquidity';

const i18n = {
  pageSubtitle: 'Details for wallet',
  pageTitle: 'Wallet Landing',
};

const WALLET_ADDRESS = '0xDdC0c711A642145785e03DFB9B39E04d1Dad3889';

const Wallet: React.FC = () => {
  const naCollectionsWithOffers: any = useTopNiftyApesCollections({
    limit: 1000,
  });
  const { items, loading } = useRaribleWalletNFTs({
    contractAddress: WALLET_ADDRESS,
  });

  useEffect(() => {
    if (!loading && naCollectionsWithOffers) {
      naCollectionsWithOffers.forEach((na: any) => {
        console.log(
          items.forEach((item) =>
            console.log(item.contractAddress === na.address),
          ),
        );
      });
    }
  }, [loading, naCollectionsWithOffers]);

  if (loading) {
    return <Box>Loading...</Box>;
  }

  return (
    <VStack spacing="50px">
      <Center>
        <VStack>
          <Text
            fontFamily="Work Sans"
            fontSize="8xl"
            fontWeight="black"
            textTransform="uppercase"
          >
            {i18n.pageTitle}
          </Text>
          <Text fontSize="xl" color="grey">
            {i18n.pageSubtitle} {WALLET_ADDRESS}
          </Text>
        </VStack>
      </Center>

      {items && !loading ? (
        <Box mt="10px">{items.length}</Box>
      ) : (
        <LoadingIndicator />
      )}
    </VStack>
  );
};

export default Wallet;
