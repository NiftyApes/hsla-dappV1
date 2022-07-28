import React, { useEffect, Suspense } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { useConnectWallet } from '@web3-onboard/react';
import { setStoreNiftyApesContract, setStoreWallet } from 'app/store';
import { useNiftyApesContract } from 'hooks/useNiftyApesContract';
import theme from './theme';
import LoadingIndicator from 'components/atoms/LoadingIndicator';
import Marketing from 'routes/Marketing';
import Borrowers from 'routes/Borrowers';
import Lenders from 'routes/Lenders';

const App: React.FC = () => {
  const [{ wallet }] = useConnectWallet();
  const niftyApesContract = useNiftyApesContract();

  useEffect(() => {
    setStoreWallet(wallet);
  }, [wallet]);

  useEffect(() => {
    setStoreNiftyApesContract(niftyApesContract);
  }, [niftyApesContract]);

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
