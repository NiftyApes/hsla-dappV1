import React from 'react';
import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import Header from './Header';

const BorrowersLayout: React.FC = () => {
  return (
    <Box bg="linear-gradient(101.3deg, #F0F0F0 0.17%, #F8F3FF 85.61%)" h="100%">
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
};

export default BorrowersLayout;
