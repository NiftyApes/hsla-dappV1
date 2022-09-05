import { Box, Center, Flex } from '@chakra-ui/react';
import { LenderTransactionHistory } from 'components/molecules/LenderTransactionHistory';
import { LiquidityInfo } from 'components/molecules/LiquidityInfo';
import { LiquidityManager } from 'components/molecules/LiquidityManager';
import React from 'react';

const Liquidity: React.FC = () => {
  return (
    <Box p="21px">
      <Center mb="100px">
        <Flex>
          <Box mr="100px">
            <LiquidityInfo />
          </Box>
          <LiquidityManager />
        </Flex>
      </Center>
      <LenderTransactionHistory />
    </Box>
  );
};

export default Liquidity;
