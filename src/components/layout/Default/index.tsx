import { Box } from '@chakra-ui/react';
import React from 'react';
import Footer from './Footer';
import Header from './Header';

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

const DefaultLayout: React.FC<Props> = ({ children }) => {
  return (
    <Box>
      <Header />
      {children}
      <Footer />
    </Box>
  );
};

export default DefaultLayout;
