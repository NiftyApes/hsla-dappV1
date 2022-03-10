import React from 'react';
import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import Header from './Header';

const BorrowersLayout: React.FC = () => {
  return (
    <Flex bg="linear-gradient(101.3deg, #F0F0F0 0.17%, #F8F3FF 85.61%)" h="100%" flexDir="column">
      <Header />
      <Outlet />
    </Flex>
  );
};

export default BorrowersLayout;
