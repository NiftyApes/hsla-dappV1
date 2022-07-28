import { Box, Grid, Input } from '@chakra-ui/react';

import CollapseWrapper from '../CollapseWrapper';
import CollectionItem from './CollectionItem';

import { useBorrowerSearch } from 'hooks/useBorrowerSearch';
import { useWalletAddress } from 'hooks/useWalletAddress';

const Collections: React.FC = () => {
  const walletAddress = useWalletAddress();
  const { getFilterableCollections } = useBorrowerSearch(walletAddress);
  const collections = getFilterableCollections();

  return (
    <CollapseWrapper name="COLLECTIONS">
      <Box p="12px">
        <Input placeholder="Filter" borderColor="gray.100" />
        <Grid rowGap="11px" p="12px" mt="12px">
          {collections.map((item) => {
            return (
              <CollectionItem
                name={item.collection.name}
                count={item.count}
                key={item.collection.contractAddress}
              />
            );
          })}
        </Grid>
      </Box>
    </CollapseWrapper>
  );
};

export default Collections;
