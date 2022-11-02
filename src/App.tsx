import ReactGA from 'react-ga';
import { Button, ChakraProvider, Link } from '@chakra-ui/react';
import { useConnectWallet, useSetChain } from '@web3-onboard/react';
import {
  setStoreCEthContract,
  setStoreLendingContract,
  setStoreLiquidityContract,
  setStoreOffersContract,
  setStoreWallet,
} from 'app/store';
import LoadingIndicator from 'components/atoms/LoadingIndicator';
import GlobalModal from 'components/organisms/GlobalModal';
import { useCEthContract } from 'hooks/useCEthContract';
import { useChainId } from 'hooks/useChainId';
import {
  isGoerli,
  isLocalChain,
  isMainnet,
  useLendingContract,
  useLiquidityContract,
  useOffersContract,
} from 'hooks/useContracts';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { WalletContext } from 'lib/contexts/WalletProvider';
import React, { Suspense, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import Borrowers from 'routes/Borrowers';
import Lenders from 'routes/Lenders';
import Marketing from 'routes/Marketing';
import RouteTracker from 'components/organisms/RouteTracker';
import theme from './theme';

// @ts-ignore
ReactGA.initialize(process.env.REACT_APP_GA_ID);

const App: React.FC = () => {
  const [{ wallet }] = useConnectWallet();
  const [, setChain] = useSetChain();
  const lendingContract = useLendingContract();
  const offersContract = useOffersContract();
  const liquidityContract = useLiquidityContract();
  const cEthContract = useCEthContract();

  setStoreWallet(wallet as any);

  setStoreLendingContract(lendingContract);
  setStoreOffersContract(offersContract);
  setStoreLiquidityContract(liquidityContract);
  setStoreCEthContract(cEthContract);

  const { connectWallet } = useContext(WalletContext);

  const chainId = useChainId();

  const [mainnetEnabled] = useLocalStorage('mainnet-enabled', null);

  useEffect(() => {
    if (
      !chainId ||
      (!isGoerli(chainId) && !isLocalChain(chainId) && !isMainnet(chainId))
    ) {
      setChain({ chainId: '0x1' });
    }
  }, [chainId, mainnetEnabled]);

  if (
    chainId &&
    !isGoerli(chainId) &&
    !isLocalChain(chainId) &&
    !isMainnet(chainId)
  ) {
    return (
      <div>
        NiftyApes currently doesn't support this chain ({chainId}). Please
        switch to Mainnet.
        <div style={{ marginTop: '32px' }}>
          <Button onClick={connectWallet}>Connect Wallet</Button>
        </div>
      </div>
    );
  }

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Suspense fallback={<LoadingIndicator fullScreen />}>
          <GlobalModal
            storageKey="TOS"
            actionText="Accept"
            title="Terms of Services"
            description={
              <div>
                Your use of the NiftyApes App is expressly conditioned on your
                acceptance of NiftyApes’
                <Link
                  color="purple"
                  target="_blank"
                  href="https://blog.niftyapes.money/legal-privacy-tos/"
                >
                  &nbsp;Terms of Service&nbsp;
                </Link>
                and
                <Link
                  color="purple"
                  target="_blank"
                  href="https://blog.niftyapes.money/legal-privacy-tos/"
                >
                  &nbsp;Privacy Policy&nbsp;
                </Link>
                . By clicking accept and close, you indicate that you have read
                and agree to the NiftyApes Terms of Service and Privacy Policy,
                and that you consent to collection, storage and use of your
                personal information for the purposes set forth in the Privacy
                Policy.
              </div>
            }
          />
          <RouteTracker />
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
