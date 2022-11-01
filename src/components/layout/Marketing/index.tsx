import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Header from './Header';

const MarketingLayout: React.FC = () => {
  return (
    <Box>
      <Header />
      <Outlet />
    </Box>
  );
};

export default MarketingLayout;
