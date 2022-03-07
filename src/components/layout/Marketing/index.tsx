import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

import Footer from './Footer';
import Header from './Header';

const MarketingLayout: React.FC = () => {
  return (
    <Box>
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
};

export default MarketingLayout;
