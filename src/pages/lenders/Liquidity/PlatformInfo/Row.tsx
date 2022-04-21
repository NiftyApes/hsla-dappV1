import { Flex, Td, Text, Tr } from '@chakra-ui/react';
import React from 'react';

import CryptoIcon from 'components/atoms/CryptoIcon';

const Row: React.FC = () => {
  return (
    <Tr
      sx={{
        td: {
          border: 'none',
          fontSize: 'md',
          color: 'solid.gray0',
        },
      }}
    >
      <Td>
        <Flex alignItems="center">
          <CryptoIcon symbol="eth" size={25} />
          <Text fontSize="xl" ml="8px">
            4503.445... Ξ
          </Text>
        </Flex>
      </Td>
      <Td>
        <Text fontSize="xl" textAlign="center">
          0.14%
        </Text>
      </Td>
      <Td>
        <Text fontSize="xl" textAlign="center">
          45.26%
        </Text>
      </Td>
    </Tr>
  );
};

export default Row;
