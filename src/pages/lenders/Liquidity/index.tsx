import React from 'react';
import { Box, Center, VStack, HStack } from '@chakra-ui/react';
import { LiquidityInfo } from 'components/molecules/LiquidityInfo';
import { LiquidityManager } from 'components/molecules/LiquidityManager';
import { TransactionTable } from './components/TransactionTable';

const Liquidity: React.FC = () => {
  return (
    <Center mb="100px">
      <Box maxW="1600px" minW="700px">
        <VStack>
          <HStack spacing="100px" mb="50px">
            <LiquidityInfo />
            <LiquidityManager />
          </HStack>
          <TransactionTable />
        </VStack>
      </Box>
    </Center>
  );
};

export default Liquidity;
