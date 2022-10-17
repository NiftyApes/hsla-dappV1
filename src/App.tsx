import { ChakraProvider } from '@chakra-ui/react';
import { useConnectWallet, useSetChain } from '@web3-onboard/react';
import {
  setStoreCEthContract,
  setStoreLendingContract,
  setStoreLiquidityContract,
  setStoreOffersContract,
  setStoreWallet,
} from 'app/store';
import LoadingIndicator from 'components/atoms/LoadingIndicator';
import { useCEthContract } from 'hooks/useCEthContract';
import { useChainId } from 'hooks/useChainId';
import { useLendingContract, useLiquidityContract, useOffersContract } from 'hooks/useContracts';
import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import Borrowers from 'routes/Borrowers';
import Lenders from 'routes/Lenders';
import Marketing from 'routes/Marketing';
import theme from './theme';

const App: React.FC = () => {
  const [{ wallet }] = useConnectWallet();
  const [, setChain] = useSetChain();
  const lendingContract = useLendingContract();
  const offersContract = useOffersContract();
  const liquidityContract = useLiquidityContract();
  const cEthContract = useCEthContract();

  setStoreWallet(wallet);

  setStoreLendingContract(lendingContract);
  setStoreOffersContract(offersContract);
  setStoreLiquidityContract(liquidityContract);
  setStoreCEthContract(cEthContract);

  const chainId = useChainId();

  useEffect(() => {
    if (!chainId || (chainId !== '0x7a69' && chainId !== '0x5')) {
      setChain({ chainId: '0x5' });
    }
  }, [chainId]);

  if (!chainId || (chainId !== '0x7a69' && chainId !== '0x5')) {
    return (
      <div>
        NiftyApes currently doesn't support this chain. Please switch to Goerli to explore the
        testnet version.
      </div>
    );
  }

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
