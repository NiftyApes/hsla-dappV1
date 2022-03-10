import React from 'react';
import { Flex } from '@chakra-ui/react';

import Category from './Category';
import NumberCenterInput from 'components/atoms/Input/NumberCenterInput';

const AmountInUSD: React.FC = () => {
  return (
    <Category name="Amount in $USD">
      <Flex alignItems="center" justifyContent="space-between" pl="28px" fontSize="2xs" mt="12px">
        <NumberCenterInput placeholder="No Min" mr="8px" />
        to
        <NumberCenterInput placeholder="No Max" ml="8px" />
      </Flex>
    </Category>
  );
};

export default AmountInUSD;
