import { Box, Button, ChakraProvider, Link } from '@chakra-ui/react';
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
import RouteTracker from 'components/organisms/RouteTracker';
import { useCEthContract } from 'hooks/useCEthContract';
import { useChainId } from 'hooks/useChainId';
import {
  isGnosis,
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
import ReactGA from 'react-ga4';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import Borrowers from 'routes/Borrowers';
import Lenders from 'routes/Lenders';
import Marketing from 'routes/Marketing';
import theme from './theme';

if (window.location.hostname === 'app.niftyapes.money') {
  ReactGA.initialize('G-KG81NEMB42');
}

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
      (!isGoerli(chainId) &&
        !isLocalChain(chainId) &&
        !isMainnet(chainId) &&
        !isGnosis(chainId))
    ) {
      setChain({ chainId: '0x1' });
    }
  }, [chainId, mainnetEnabled]);

  if (
    chainId &&
    !isGoerli(chainId) &&
    !isLocalChain(chainId) &&
    !isMainnet(chainId) &&
    !isGnosis(chainId)
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
          {isGnosis(chainId) && (
            <Box
              backgroundColor="red.50"
              borderBottom="1px"
              borderColor="red.100"
              textAlign="center"
              py="8px"
            >
              You are on <strong>Gnosis Chain</strong>. The frontend for
              NiftyApes on Gnosis Chain works but is still in beta. Please note
              "Eth" and Ξ throughout the app mean <strong>xDai</strong>.
            </Box>
          )}
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
