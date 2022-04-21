import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import React from 'react';
import LockedLiquidity from './LockedLiquidity';
import PlatformInfo from './PlatformInfo';
import TransactionHistoryTable from './TransactionHistoryTable';

const Liquidity: React.FC = () => {
  return (
    <Box p="21px">
      <Text fontSize="xl" fontWeight="bold" color="solid.gray0">
        💧 Your Liquidity
      </Text>
      <Grid gridTemplateColumns="repeat(3, minmax(0, 1fr))" columnGap="20px" mt="36px">
        <GridItem colSpan={2}>
          <LockedLiquidity />
        </GridItem>
        <GridItem colSpan={1}>
          <PlatformInfo />
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
