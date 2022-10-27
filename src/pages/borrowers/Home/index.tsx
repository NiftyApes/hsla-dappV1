import { Flex } from '@chakra-ui/react';
import React from 'react';

import Content from './Content';

const Borrowers: React.FC = () => {
  return (
    <Flex position="relative" flexGrow={1}>
      <Content width="100%" />
    </Flex>
  );
};

export default Borrowers;
