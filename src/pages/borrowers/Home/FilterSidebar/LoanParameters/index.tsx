import { Box, Grid } from '@chakra-ui/react';
import React from 'react';

import CollapseWrapper from '../CollapseWrapper';
import AmountInUSD from './AmountInUSD';
import Apr from './Apr';
import Assets from './Assets';
import Time from './Time';

const LoanParameters: React.FC = () => {
  return (
    <CollapseWrapper name="LOAN PARAMETERS">
      <Box mt="18px">
        <Grid rowGap="28px">
          <Assets />
          <AmountInUSD />
          <Time />
          <Apr />
        </Grid>
      </Box>
    </CollapseWrapper>
  );
};

export default LoanParameters;
