import React, { useEffect, useState } from 'react';
import { Flex, Button, Image, Text, Box, useDisclosure } from '@chakra-ui/react';
import { useConnectWallet, useWallets } from '@web3-onboard/react';
import { OnboardAPI } from '@web3-onboard/core';
import { useNavigate } from 'react-router-dom';

import Icon from 'components/atoms/Icon';
import Step from './Step';
import { borrowersId } from 'routes/router';
import { initWeb3Onboard } from 'services/wallet';
import Modal from 'components/atoms/Modal/Modal';
import LoadingIndicator from 'components/atoms/LoadingIndicator';

const WalletInfo: React.FC = () => {
  const [{ wallet, connecting }, connect] = useConnectWallet();
  const [web3Onboard, setWeb3Onboard] = useState<OnboardAPI | null>(null);

  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const connectedWallets = useWallets();

  useEffect(() => {
    setWeb3Onboard(initWeb3Onboard);
  }, []);

  useEffect(() => {
    if (!connectedWallets.length) return;

    const connectedWalletsLabelArray = connectedWallets.map(({ label }) => label);
    window.localStorage.setItem('connectedWallets', JSON.stringify(connectedWalletsLabelArray));
  }, [connectedWallets]);

  useEffect(() => {
    if (wallet) {
      navigate(borrowersId(wallet.accounts[0].address));
    }
  }, [navigate, wallet]);

  useEffect(() => {
    async function autoConnect() {
      const connectedWalletsLocalStorage = window.localStorage.getItem('connectedWallets');

      const previouslyConnectedWallets = JSON.parse(connectedWalletsLocalStorage!);

      if (Array.isArray(previouslyConnectedWallets) && previouslyConnectedWallets.length > 0) {
        await initWeb3Onboard.connectWallet({
          autoSelect: { label: previouslyConnectedWallets[0], disableModals: true },
        });
      } else {
        onOpen();
      }
    }
    autoConnect();
  }, [onOpen]);

  const handleConnectWallet = async () => {
    onClose();
    connect({});
  };

  if (!web3Onboard) return <></>;

  return (
    <>
      <Flex alignItems="center">
        {connecting && <LoadingIndicator />}
        {wallet ? (
          <Flex
            bg="gray.300"
            borderRadius="40px"
            fontSize="2md"
            fontWeight="bold"
            alignItems="center"
            padding="0 .3rem"
          >
            <Text color="solid.gray0" m="11px 14px 11px 18px">
              {wallet.accounts[0].balance
                ? `${Object.values(wallet.accounts[0].balance)[0].slice(0, 6)} ${
                    Object.keys(wallet.accounts[0].balance)[0]
                  }`
                : '0'}
            </Text>
            <Button variant="primary" borderRadius="40px">
              <Text mr="12px" p="6px 0px 6px 18px">
                {`${wallet.accounts[0].address.slice(0, 6)}...${wallet.accounts[0].address.slice(
                  -4,
                )}`}
              </Text>
              <Image
                src="/assets/images/wallet_address_indicator.png"
                alt="Logo"
                p="8px 6px 8px 0px"
              />
            </Button>
          </Flex>
        ) : (
          <Button variant="primary" color="primary.purple" onClick={onOpen}>
            Connect Wallet
          </Button>
        )}
        <Button variant="primary" borderRadius="50%" p="11px" ml="6px">
          <Icon name="menu" />
        </Button>
        <Button variant="primary" borderRadius="50%" p="11px" ml="9px">
          <Icon name="notification" color="primary.purple" />
        </Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick={false}>
        <Box textAlign="center" py="21px">
          <Text color="solid.gray0" fontSize="lg" textTransform="uppercase">
            🍌 QuickStart Borrowing on NiftyApes 🍌
          </Text>
          <Button variant="link" onClick={onClose} pos="absolute" top="30px" right="30px">
            <Icon name="close" />
          </Button>
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
    </>
  );
};

export default WalletInfo;
