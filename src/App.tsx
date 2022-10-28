import React, { Suspense } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { useConnectWallet } from '@web3-onboard/react';
import {
  setStoreLendingContract,
  setStoreLiquidityContract,
  setStoreOffersContract,
  setStoreWallet,
} from 'app/store';
import { useLendingContract, useLiquidityContract, useOffersContract } from 'hooks/useContracts';
import theme from './theme';
import LoadingIndicator from 'components/atoms/LoadingIndicator';
import Marketing from 'routes/Marketing';
import Borrowers from 'routes/Borrowers';
import Lenders from 'routes/Lenders';

const App: React.FC = () => {
  const [{ wallet }] = useConnectWallet();
  const lendingContract = useLendingContract();
  const offersContract = useOffersContract();
  const liquidityContract = useLiquidityContract();
  
  setStoreWallet(wallet);
  
  setStoreLendingContract(lendingContract);
  setStoreOffersContract(offersContract);
  setStoreLiquidityContract(liquidityContract);
  
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
