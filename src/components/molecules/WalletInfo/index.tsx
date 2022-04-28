import React, { useContext } from 'react';
import { Flex, Button, Image, Text } from '@chakra-ui/react';
import { useConnectWallet } from '@web3-onboard/react';

import Icon from 'components/atoms/Icon';
import LoadingIndicator from 'components/atoms/LoadingIndicator';
import { WalletContext } from 'lib/contexts/WalletProvider';
import { useWalletBalance } from 'hooks/useWalletBalance';

const WalletInfo: React.FC = () => {
  const [{ wallet, connecting }] = useConnectWallet();
  const { showWalletConnectModal } = useContext(WalletContext);
  const balance = useWalletBalance();

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
              {balance}
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
          <Button variant="primary" color="primary.purple" onClick={showWalletConnectModal}>
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
    </>
  );
};

export default WalletInfo;
