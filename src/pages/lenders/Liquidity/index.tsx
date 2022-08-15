import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import { LenderTransactionHistory } from 'components/molecules/LenderTransactionHistory';
import { LiquidityInfo } from 'components/molecules/LiquidityInfo';
import { LiquidityManager } from 'components/molecules/LiquidityManager';
import React from 'react';
import TransactionHistoryTable from './TransactionHistoryTable';

const Liquidity: React.FC = () => {
  return (
    <Box p="21px">
      <Text fontSize="xl" fontWeight="bold" color="solid.gray0">
        💧 Your Liquidity
      </Text>
      <Grid gridTemplateColumns="repeat(3, minmax(0, 1fr))" columnGap="20px" mt="36px" minW="960px">
        <GridItem colSpan={2}>
          <LiquidityInfo />
        </GridItem>
        <GridItem colSpan={1}>
          <LiquidityManager />
        </GridItem>
      </Grid>
      <Text fontSize="xl" fontWeight="bold" color="solid.gray0" textAlign="center" mt="50px">
        TRANSACTION HISTORY
      </Text>
      <LenderTransactionHistory />
      <TransactionHistoryTable />
    </Box>
  );
};

export default Liquidity;
