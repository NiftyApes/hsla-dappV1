import React, { Suspense } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { useConnectWallet } from '@web3-onboard/react';
import { setStoreLendingContract, setStoreWallet } from 'app/store';
import { useNiftyApesContract } from 'hooks/useNiftyApesContract';
import theme from './theme';
import LoadingIndicator from 'components/atoms/LoadingIndicator';
import Marketing from 'routes/Marketing';
import Borrowers from 'routes/Borrowers';
import Lenders from 'routes/Lenders';

const App: React.FC = () => {
  const [{ wallet }] = useConnectWallet();
  const niftyApesContract = useNiftyApesContract();
  setStoreWallet(wallet);
  setStoreLendingContract(niftyApesContract);

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Suspense fallback={<LoadingIndicator fullScreen />}>
          <Routes>
            {Marketing}
            {Borrowers}
            {Lenders}
          </Routes>
        </Suspense>
      </Router>
    </ChakraProvider>
  );
};

export { App };
