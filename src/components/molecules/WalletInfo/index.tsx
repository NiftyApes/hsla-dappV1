import React, { useContext } from 'react';
import {
  Flex,
  Button,
  Image,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { useConnectWallet } from '@web3-onboard/react';

import Icon from 'components/atoms/Icon';
import LoadingIndicator from 'components/atoms/LoadingIndicator';
import { WalletContext } from 'lib/contexts/WalletProvider';
import { useWalletBalance } from 'hooks/useWalletBalance';
import Notification from './Notification';

const WalletInfo: React.FC = () => {
  const [{ wallet, connecting }] = useConnectWallet();
  const { showWalletConnectModal } = useContext(WalletContext);
  const balance = useWalletBalance();

  const { isOpen, onToggle } = useDisclosure();

  const formatCurrency = (balance?: number) => {
    return balance !== undefined ? `${balance}Ξ` : null;
  };

  return (
    <>
      <Flex alignItems="center" position="relative">
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
              {formatCurrency(balance)}
            </Text>
            <Button variant="primary" borderRadius="40px">
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
          <Button variant="primary" color="primary.purple" onClick={showWalletConnectModal}>
            Connect Wallet
          </Button>
        )}
        <Menu>
          <MenuButton as={Button} variant="primary" borderRadius="50%" p="11px" ml="6px">
            <Icon name="menu" />
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
              'button:nth-child(2n)': {
                backgroundColor: 'rgba(101, 101, 101, 0.05)',
              },
            }}
          >
            <MenuItem>🍌 About NiftyApes</MenuItem>
            <MenuItem>📓 Documentation</MenuItem>
            <MenuItem>📬 Request Features</MenuItem>
            <MenuItem>⚖ Legal & Privacy</MenuItem>
          </MenuList>
        </Menu>
        <Button variant="primary" borderRadius="50%" p="11px" ml="9px" onClick={onToggle}>
          <Icon name={isOpen ? 'close' : 'notification'} color="primary.purple" />
        </Button>
        {isOpen && (
          <Notification
            position="absolute"
            bottom="0px"
            right="0px"
            transform="translateY(100%)"
            onClose={onToggle}
          />
        )}
      </Flex>
    </>
  );
};

export default WalletInfo;
