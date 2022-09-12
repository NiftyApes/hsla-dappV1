import { Box, Center, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import React from 'react';

import CryptoIcon from 'components/atoms/CryptoIcon';
import TopCard from 'components/molecules/DashboardTopCard';
import { useActiveLoansForLender } from 'hooks/useActiveLoansForLender';
import { useOffersForLender } from 'hooks/useOffersOfLender';
import { useWalletAddress } from 'hooks/useWalletAddress';
import LoansTable from './LoansTable';
import OffersTable from './OffersTable';

const Dashboard: React.FC = () => {
  const address = useWalletAddress();

  const offers = useOffersForLender({ lenderAddress: address, onlyActive: false });

  const activeLoans = useActiveLoansForLender();

  return (
    <Box>
      <Flex justifyContent="space-evenly" flexWrap="wrap" gap="24px" p="18px">
        <TopCard desc="ACTIVE LOAN">
          <Text fontSize="7xl">1</Text>
        </TopCard>
        <TopCard desc="TOTAL BORROWED">
          <CryptoIcon symbol="eth" size={40} />
          <Text fontSize="7xl" ml="8px">
            25.50Ξ
          </Text>
        </TopCard>
        <TopCard desc="TOTAL INTEREST OWED">
          <CryptoIcon symbol="eth" size={40} />
          <Text fontSize="7xl" ml="8px">
            0.026..Ξ
          </Text>
        </TopCard>
        <TopCard desc="NEXT PAYMENT DUE">
          <Text fontSize="5xl">⏰ 119 days, 23 hours, 59 minutes</Text>
        </TopCard>
      </Flex>
      <Center px="36px">
        <Grid templateColumns="800px 700px" columnGap="24px">
          <GridItem>
            <Text fontWeight="bold" fontSize="lg" mb="8px">
              Your Offers ({offers?.length})
            </Text>

            <OffersTable offers={offers} />
          </GridItem>

          <GridItem>
            <Text fontWeight="bold" fontSize="lg" mb="8px">
              Your Loans ({activeLoans?.length})
            </Text>
            <LoansTable activeLoans={activeLoans} />
          </GridItem>
        </Grid>
      </Center>
    </Box>
  );
};

export default Dashboard;
