import React, { Suspense } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { EthComponentsSettingsContext, IEthComponentsSettings } from 'eth-components/models';
import { EthersAppContext } from 'eth-hooks/context';

import { ContractsAppContext } from './config/contractContext';

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

const BLOCKNATIVE_DAPPID = '0b58206a-f3c0-4701-a62f-73c7243e8c77';

// create eth components context for options and API keys
const ethComponentsSettings: IEthComponentsSettings = {
  apiKeys: {
    BlocknativeDappId: BLOCKNATIVE_DAPPID,
  },
};

const App: React.FC = () => (
  <EthComponentsSettingsContext.Provider value={ethComponentsSettings}>
    <ContractsAppContext>
      <EthersAppContext>
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
      </EthersAppContext>
    </ContractsAppContext>
  </EthComponentsSettingsContext.Provider>
);

export { App };
