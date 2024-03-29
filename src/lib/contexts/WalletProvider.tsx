import { useConnectWallet, useWallets } from '@web3-onboard/react';
import { ACTIONS, CATEGORIES, LABELS } from 'constants/googleAnalytics';
import { useAnalyticsEventTracker } from 'hooks/useAnalyticsEventTracker';
import React, { createContext, useEffect } from 'react';
import { initWeb3Onboard } from 'services/wallet';


interface WalletContextProps {
  connectWallet: () => void;
}

export const WalletContext = createContext<WalletContextProps>({
  connectWallet: () => null,
});

export const WalletProvider: React.FC<{ children: React.ReactNode | React.ReactNode[] }> = ({
  children,
}) => {
  const gaEventTracker = useAnalyticsEventTracker(CATEGORIES.GLOBAL);
  const [{ wallet }, connect] = useConnectWallet();
  const connectedWallets = useWallets();
  const web3Onboard: any = initWeb3Onboard;

  const saveWalletsToLocalStorage = () => {
    const connectedWalletsLabelArray = connectedWallets.map(({ label }) => label);
    window.localStorage.setItem('connectedWallets', JSON.stringify(connectedWalletsLabelArray));
  };

  const getWalletFromLocalStorage = () => {
    const localWallets = JSON.parse(window.localStorage.getItem('connectedWallets')!);
    return Array.isArray(localWallets) && localWallets.length > 0 ? localWallets[0] : null;
  };

  useEffect(() => {
    if (!wallet) {
      const localWallet = getWalletFromLocalStorage();

      if (localWallet) {
        initWeb3Onboard.connectWallet({
          autoSelect: { label: localWallet, disableModals: true },
        });
      }
    } else {
      saveWalletsToLocalStorage();
    }
  }, [wallet]);

  const connectWallet = async () => {
    connect({}).then(() => {
      gaEventTracker(ACTIONS.WALLET, LABELS.CONNECTED);
    })
  };

  if (!web3Onboard) return <></>;

  return <WalletContext.Provider value={{ connectWallet }}>{children}</WalletContext.Provider>;
};
