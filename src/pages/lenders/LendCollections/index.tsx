import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import Collection from './Collection';

const LendCollections: React.FC = () => {
  return (
    <Box>
      <Text fontSize="lg" textAlign="center" mt="40px">
        🚀 LEND: Collections
      </Text>
      <Text fontSize="sm" mt="12px" textAlign="center" fontStyle="italic" color="solid.gray0">
        Select a collection to view Market Data and make collection offers, or Search
      </Text>

      <Flex gap="40px" flexWrap="wrap" px="30px" mt="65px" justifyContent="center">
        <Collection />
        <Collection />
        <Collection />
        <Collection />
        <Collection />
        <Collection />
        <Collection />
        <Collection />
        <Collection />
        <Collection />
        <Collection />
        <Collection />
        <Collection />
        <Collection />
      </Flex>
    </Box>
  );
};

export default LendCollections;
