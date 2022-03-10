import { Grid } from '@chakra-ui/react';
import React from 'react';

import AssetItem from './AssetItem';
import Category from './Category';

const Assets: React.FC = () => {
  return (
    <Category name="Assets">
      <Grid rowGap="24px" p="18px 8px 0px 22px">
        <AssetItem symbol="eth" />
        <AssetItem symbol="dai" />
        <AssetItem symbol="usdc" />
      </Grid>
    </Category>
  );
};

export default Assets;
