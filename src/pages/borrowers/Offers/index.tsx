import React from 'react';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import Collateral from '../../../components/molecules/Collateral';
import OffersTable from '../../../components/molecules/OffersTable';

const Offers: React.FC = () => {
  return (
    <Box>
      <Grid gridTemplateColumns="repeat(6, minmax(0, 1fr))" flexGrow={1} p="13px" columnGap="22px">
        <GridItem colSpan={1}>
          <Collateral
            collectionName="Collection Name"
            tokenName="Token Name"
            img="/assets/mocks/bored_ape.png"
          />
        </GridItem>
        <GridItem colSpan={5}>
          <OffersTable />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Offers;
