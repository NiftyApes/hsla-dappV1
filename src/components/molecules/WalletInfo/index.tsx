import React from 'react';
import { Flex, Button, Image, Text } from '@chakra-ui/react';
import Icon from 'components/atoms/Icon';

const WalletInfo: React.FC = () => {
  return (
    <Flex alignItems="center">
      <Flex bg="gray.300" borderRadius="40px" fontSize="2md" fontWeight="bold" alignItems="center">
        <Text color="solid.darkGray" m="11px 14px 11px 18px">
          00.0157Ξ
        </Text>
        <Button variant="primary" borderRadius="40px">
          <Text mr="12px" p="6px 0px 6px 18px">
            0xEc01...3510
          </Text>
          <Image src="/assets/images/wallet_address_indicator.png" alt="Logo" p="8px 6px 8px 0px" />
        </Button>
      </Flex>
      <Button variant="primary" borderRadius="50%" p="11px" ml="6px">
        <Icon name="menu" />
      </Button>
      <Button variant="primary" borderRadius="50%" p="11px" ml="9px">
        <Icon name="notification" color="primary.purple" />
      </Button>
    </Flex>
  );
};

export default WalletInfo;
