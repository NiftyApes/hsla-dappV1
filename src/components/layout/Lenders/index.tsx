import React from 'react';
import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import { WalletProvider } from 'lib/contexts/WalletProvider';
import Header from './Header';

const LendersLayout: React.FC = () => {
  return (
    <Flex bg="gradient.primary" h="100%" flexDir="column" overflow="auto">
      <Header />
      <Outlet />
    </Flex>
  );
};

export default LendersLayout;
