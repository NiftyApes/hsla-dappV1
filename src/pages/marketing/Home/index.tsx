import React from 'react';
import { Box, Center, Text, VStack } from '@chakra-ui/react';
import LoadingIndicator from 'components/atoms/LoadingIndicator';
import { useTopNiftyApesCollections } from '../../../hooks/useCollectionsByLiquidity';
import CollectionList from './components/CollectionList';

const i18n = {
  pageSubtitle: 'Borrow ETH using your NFTs as collateral',
  pageTitle: 'Loans for NFTs',
};

const Home: React.FC = () => {
  const collections: any = useTopNiftyApesCollections();

  return (
    <VStack spacing="50px">
      <Center>
        <VStack>
          <Text fontSize="8xl" as="b" textTransform="uppercase">
            {i18n.pageTitle}
          </Text>
          <Text fontSize="xl" color="grey">
            {i18n.pageSubtitle}
          </Text>
        </VStack>
      </Center>

      {collections ? (
        <Box mt="10px">
          <CollectionList list={collections} />
        </Box>
      ) : (
        <LoadingIndicator />
      )}
    </VStack>
  );
};

export default Home;
