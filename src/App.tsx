import React from 'react';
import { ChakraProvider, Box, theme } from '@chakra-ui/react';

const App: React.FC = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      Nifty Apes
    </Box>
  </ChakraProvider>
);

export { App };
