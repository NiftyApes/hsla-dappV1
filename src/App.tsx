import React, { Suspense } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import theme from './theme';
import Marketing from 'routes/Marketing';
import LoadingIndicator from 'components/atoms/LoadingIndicator';
import Borrowers from 'routes/Borrowers';
import Lenders from 'routes/Lenders';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const App: React.FC = () => (
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense fallback={<LoadingIndicator fullScreen />}>
          <Routes>
            {Marketing}
            {Borrowers}
            {Lenders}
          </Routes>
        </Suspense>
      </Router>
    </QueryClientProvider>
  </ChakraProvider>
);

export { App };
