import { Button, Flex, Td, Text, Tr } from '@chakra-ui/react';
import React from 'react';

import CryptoIcon from 'components/atoms/CryptoIcon';

const Row: React.FC = () => {
  return (
    <Tr
      color="solid.gray0"
      sx={{
        td: {
          border: 'none',
          fontSize: 'md',
          color: 'solid.gray0',
        },
        'td:first-of-type': {
          borderRadius: '30px 0px 0px 30px',
        },
        'td:last-of-type': {
          borderRadius: '0px 30px 30px 0px',
        },
      }}
    >
      <Td>
        <Flex justifyContent="center">
          <CryptoIcon symbol="eth" size={25} />
        </Flex>
      </Td>
      <Td textAlign="center">
        <Text textDecor="underline" fontSize="sm">
          [ timestamp ]
        </Text>
      </Td>
      <Td textAlign="center">
        <Button variant="link" fontSize="2.5xs" color="notification.notify">
          Added from Wallet
        </Button>
      </Td>
      <Td>
        <Flex alignItems="center" justifyContent="center">
          <Text fontSize="2md" mr="4px">
            +
          </Text>
          <CryptoIcon symbol="eth" size={25} />
          <Text fontSize="2md" ml="4px">
            275.83..Ξ
          </Text>
        </Flex>
      </Td>
      <Td>
        <Flex alignItems="center" justifyContent="center">
          <Text fontSize="2md" mr="4px">
            +
          </Text>
          <CryptoIcon symbol="eth" size={25} />
          <Text color="notification.notify" fontSize="2md" ml="4px">
            275.83..Ξ
          </Text>
        </Flex>
      </Td>
      <Td>
        <Text fontSize="sm">
          25.5Ξ @ <strong>5% APR</strong> on all <strong>Bored Ape Yatch Club Tokens</strong>
        </Text>
      </Td>
      <Td textAlign="center">
        <Button variant="link" fontWeight="normal" fontSize="2xs" textDecor="underline">
          Etherscan Link
        </Button>
      </Td>
    </Tr>
  );
};

export default Row;
