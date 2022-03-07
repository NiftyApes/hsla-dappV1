import React from 'react';
import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import Header from './Header';

const BorrowersLayout: React.FC = () => {
  return (
    <Box>
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
};

export default BorrowersLayout;
