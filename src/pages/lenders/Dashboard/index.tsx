/* eslint-disable react/jsx-no-useless-fragment */
import { Box, Center, Grid, GridItem, Text } from '@chakra-ui/react';
import React from 'react';

import { useActiveLoansForLender } from 'hooks/useActiveLoansForLender';
import { useOffersForLender } from 'hooks/useOffersOfLender';
import { useWalletAddress } from 'hooks/useWalletAddress';
import LoansTable from './LoansTable';
import OffersTable from './OffersTable';
import TopBar from './TopBar';

const i18n = {
  noLoans: "You don't have any active loans...",
  noOffers: "You don't have any active offers...",
  offers: (count: number = 0) => `Your Offers (${count})`,
  loans: (count: number = 0) => `Your Active Loans (${count})`,
};

const Dashboard: React.FC = () => {
  const address = useWalletAddress();
  const offers = useOffersForLender({
    lenderAddress: address,
    onlyActive: false,
  });

  const activeLoans = useActiveLoansForLender();

  return (
    <Box>
      <TopBar />

      <Center px="36px">
        <Grid
          templateColumns={{ base: 'repeat(1)', xl: 'repeat(2, 1fr)' }}
          gap={6}
        >
          <GridItem w="100%">
            <Text fontWeight="bold" fontSize="lg" mb="8px">
              {i18n.offers(offers?.length)}
            </Text>

            <OffersTable offers={offers} />
          </GridItem>

          <GridItem w="100%">
            <Text fontWeight="bold" fontSize="lg" mb="8px">
              {i18n.loans(activeLoans?.length)}
            </Text>

            <LoansTable activeLoans={activeLoans} />
          </GridItem>
        </Grid>
      </Center>
    </Box>
  );
};

export default Dashboard;
