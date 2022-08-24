import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { OnboardAPI } from '@web3-onboard/core';
import { useConnectWallet, useWallets } from '@web3-onboard/react';
import React, { createContext, useEffect, useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Modal from 'components/atoms/Modal/Modal';
import Step from 'components/molecules/WalletInfo/Step';
import { useWalletAddress } from 'hooks/useWalletAddress';
import { initWeb3Onboard } from 'services/wallet';

interface WalletContextProps {
  showWalletConnectModal: () => void;
}

export const WalletContext = createContext<WalletContextProps>({
  showWalletConnectModal: () => null,
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

  const {
    isOpen: isWalletConnectModalVisible,
    onOpen: showWalletConnectModal,
    onClose: hideWalletConnectModal,
  } = useDisclosure();

  useEffect(() => {
    async function autoConnect() {
      const localWallets = window.localStorage.getItem('connectedWallets');
      const serializedLocalWallets = JSON.parse(localWallets!);

      if (Array.isArray(serializedLocalWallets) && serializedLocalWallets.length > 0) {
        await initWeb3Onboard.connectWallet({
          autoSelect: { label: serializedLocalWallets[0], disableModals: true },
        });
      } else {
        showWalletConnectModal();
      }
    }

    autoConnect();
  }, [showWalletConnectModal]);

  useEffect(() => {
    if (!connectedWallets.length) return;

    const connectedWalletsLabelArray = connectedWallets.map(({ label }) => label);
    window.localStorage.setItem('connectedWallets', JSON.stringify(connectedWalletsLabelArray));
  }, [connectedWallets]);

  // Navigates to wallet url
  useLayoutEffect(() => {
    if (walletAddress && id?.toLowerCase() !== walletAddress.toLowerCase()) {
      navigate(walletAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddress]);

  const handleConnectWallet = async () => {
    hideWalletConnectModal();
    connect({});
  };

  if (!web3Onboard) return <></>;

  return (
    <>
      <WalletContext.Provider value={{ showWalletConnectModal }}>
        {children}

        <Modal
          isOpen={isWalletConnectModalVisible}
          onClose={hideWalletConnectModal}
          isCentered
          closeOnOverlayClick={false}
        >
          <Box textAlign="center" py="21px">
            <Text color="solid.gray0" fontSize="lg" textTransform="uppercase">
              🍌 QuickStart Borrowing on NiftyApes 🍌
            </Text>
            <Flex justifyContent="center" alignItems="center" flexWrap="wrap" mt="50px" gap="30px">
              <Step
                title="1. View Offers Against Your Assets"
                desc="Connect your wallets and view offers against your NFTs."
              />
              <Step
                title="2. Lock & Borrow Against your NFT Worry-Free"
                desc="Draw down liquidity, your loan is unaffected by fluctuating markets"
              />
              <Step
                title="3. Repay your Loan to unlock your NFT"
                desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              />
            </Flex>
            <Text fontSize="md" mt="140px">
              🎉 Connect your wallet to view all offers on your NFTs. 🎉
            </Text>
            <Button
              variant="neutral"
              w="400px"
              margin="0 auto"
              mt="20px"
              onClick={handleConnectWallet}
            >
              Connect Wallet
            </Button>
          </Box>
        </Modal>
      </WalletContext.Provider>
    </>
  );
};
