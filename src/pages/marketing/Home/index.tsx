import React from 'react';
import { Box, Center, Text, VStack } from '@chakra-ui/react';

const Home: React.FC = () => {
  return (
    <VStack spacing="5px">
      <Center>
        <Text fontSize="8xl" as="b" textTransform="uppercase">
          Loans for NFTs
        </Text>
        <Text fontSize="xl">Borrow ETH using your NFTs as collateral</Text>
      </Center>
      <Box mt="10px">Table here</Box>
    </VStack>
  );
};

export default Home;
