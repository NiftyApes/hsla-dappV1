import React, { useContext, useMemo } from 'react';
import {
  Flex,
  Button,
  Image,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Box,
} from '@chakra-ui/react';
import { useConnectWallet, useSetChain } from '@web3-onboard/react';
import _ from 'lodash';

import Icon from 'components/atoms/Icon';
import LoadingIndicator from 'components/atoms/LoadingIndicator';
import { WalletContext } from 'lib/contexts/WalletProvider';
import { useWalletBalance } from 'hooks/useWalletBalance';

const WalletInfo: React.FC = () => {
  const [{ wallet, connecting }] = useConnectWallet();

  const { connectWallet } = useContext(WalletContext);

  const balance = useWalletBalance();
  const [{ chains, connectedChain }] = useSetChain();

  const currentChain = useMemo(
    () => _.find(chains, { id: connectedChain?.id }),
    [chains, connectedChain?.id],
  );
  const currentChainLabel = useMemo(() => currentChain?.label || '', [currentChain?.label]);
  const currentChainColor = useMemo(() => {
    const label = currentChainLabel.toLowerCase() || '';

    if (label.match('localhost')) {
      return 'red.400';
    }

    if (label.match('testnet')) {
      return 'orange.300';
    }

    if (label.match('mainnet')) {
      return 'green.300';
    }

    return 'gray';
  }, [currentChainLabel]);

  const menuItems = useMemo(
    () => [
      {
        label: '🍌 About NiftyApes',
        onClick: () => window.open('https://niftyapes.money'),
      },
      {
        label: '📓 Documentation',
        onClick: () => window.open('https://docs.niftyapes.money'),
      },
      {
        label: '📬 Discord',
        onClick: () => window.open('https://discord.gg/Ge8Zwy6syQ'),
      },
      {
        label: '⚖ Legal & Privacy',
        onClick: () => window.open('https://blog.niftyapes.money/legal-privacy-tos'),
      },
    ],
    [],
  );

  return (
    <>
      <Flex alignItems="center" position="relative">
        {connecting && <LoadingIndicator />}
        {currentChain ? (
          <Flex
            bg="gray.300"
            borderRadius="40px"
            fontSize="2md"
            fontWeight="bold"
            alignItems="center"
            padding="0 .3rem"
            mr="16px"
          >
            <Box ml="14px" bg={currentChainColor} width="10px" height="10px" borderRadius="100%" />
            <Text m="11px 14px 11px 10px" fontSize="small" color="solid.gray0">
              {currentChainLabel}
            </Text>
          </Flex>
        ) : null}
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
              {balance}Ξ
            </Text>
            <Button
              _active={{ backgroundColor: 'white' }}
              cursor="initial"
              variant="primary"
              borderRadius="40px"
            >
              <Text mr="12px" p="6px 0px 6px 18px">
                {`${wallet.accounts[0].address.slice(0, 6)}\u2026${wallet.accounts[0].address.slice(
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
          <Button variant="primary" color="primary.purple" onClick={connectWallet}>
            Connect Wallet
          </Button>
        )}
        <Menu>
          <MenuButton as={Button} variant="primary" borderRadius="50%" p="11px" ml="6px">
            <Icon name="more-vertical" />
          </MenuButton>
          <MenuList
            color="solid.gray0"
            borderRadius="15px"
            boxShadow="0px 0px 21px rgba(58, 0, 131, 0.1)"
            p="9px 7px"
            fontSize="md"
            sx={{
              button: {
                fontWeight: 'bold',
                borderRadius: '10px',
                p: '15px',
              },
            }}
          >
            {menuItems.map((item) => (
              <MenuItem key={item.label} onClick={item.onClick}>{item.label}</MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Flex>
    </>
  );
};

export default WalletInfo;
