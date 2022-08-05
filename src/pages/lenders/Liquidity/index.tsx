import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import { LiquidityManager } from 'components/molecules/LiquidityManager';
import React from 'react';
import LockedLiquidity from './LockedLiquidity';
import TransactionHistoryTable from './TransactionHistoryTable';

const Liquidity: React.FC = () => {
  return (
    <Box p="1.5rem">
      <Grid gridTemplateColumns="repeat(3, minmax(0, 1fr))" columnGap="20px" mt="36px">
        <GridItem colSpan={2}>
          <LockedLiquidity />
        </GridItem>
        <GridItem colSpan={1}>
          <LiquidityManager />
        </GridItem>
      </Grid>
      <Text fontSize="xl" fontWeight="bold" color="solid.gray0" textAlign="center" mt="50px">
        TRANSACTION HISTORY
      </Text>
      <TransactionHistoryTable />
    </Box>
  );
};

export default Liquidity;
