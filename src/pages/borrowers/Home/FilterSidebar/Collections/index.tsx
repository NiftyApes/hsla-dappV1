import { Box, Grid, Input } from '@chakra-ui/react';
import React from 'react';

import CollapseWrapper from '../CollapseWrapper';
import CollectionItem from './CollectionItem';

const Collections: React.FC = () => {
  return (
    <CollapseWrapper name="COLLECTIONS">
      <Box p="12px">
        <Input placeholder="Filter" borderColor="gray.100" />
        <Grid rowGap="11px" p="12px" mt="12px">
          <CollectionItem name="Bored Ape Yacht Club" count={2} />
          <CollectionItem name="Squiggles by Snowfro" count={1} />
          <CollectionItem name="ENS: Ethereum Name Services" count={1} />
          <CollectionItem name="CryptoManga Genesis" count={1} />
        </Grid>
      </Box>
    </CollapseWrapper>
  );
};

export default Collections;
