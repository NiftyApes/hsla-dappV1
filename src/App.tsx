import React, { Suspense } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

// import { EthComponentsSettingsContext, IEthComponentsSettings } from 'eth-components/models';
// import { EthersAppContext } from 'eth-hooks/context';

// import { ContractsAppContext } from './config/contractContext';

import theme from './theme';
import Marketing from 'routes/Marketing';
import LoadingIndicator from 'components/atoms/LoadingIndicator';
import Borrowers from 'routes/Borrowers';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const App: React.FC = () => (
  // <EthersAppContext>
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense fallback={<LoadingIndicator fullScreen />}>
          <Routes>
            {Marketing}
            {Borrowers}
          </Routes>
        </Suspense>
      </Router>
    </QueryClientProvider>
  </ChakraProvider>
  // </EthersAppContext>
);

export { App };
