import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';

import CollectionCard from './CollectionCard';

const DisconnectedView: React.FC = () => {
  return (
    <Box>
      <Text>Collection Offers</Text>
      <Flex gap="40px" flexWrap="wrap" px="30px" mt="65px" justifyContent="center">
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
      </Flex>
    </Box>
  );
};

export default DisconnectedView;
