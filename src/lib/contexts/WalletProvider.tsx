import { OnboardAPI } from '@web3-onboard/core';
import { useConnectWallet, useWallets } from '@web3-onboard/react';
import { useWalletAddress } from 'hooks/useWalletAddress';
import React, { createContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [{ wallet }, connect] = useConnectWallet();
  const connectedWallets = useWallets();
  const web3Onboard: OnboardAPI = initWeb3Onboard;
  const walletAddress = useWalletAddress();

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
    connect({});
  };

  if (!web3Onboard) return <></>;

  return <WalletContext.Provider value={{ connectWallet }}>{children}</WalletContext.Provider>;
};
