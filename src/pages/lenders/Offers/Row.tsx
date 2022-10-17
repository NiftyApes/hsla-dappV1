import { Tr, Td, Flex, Text, Button, Image } from '@chakra-ui/react';
import CryptoIcon from 'components/atoms/CryptoIcon';
import Icon from 'components/atoms/Icon';
import React from 'react';

const Row: React.FC = () => {
  return (
    <Tr
      sx={{
        '& > td:first-of-type': {
          borderLeftRadius: '10px',
        },
        '& > td:last-child': {
          borderRightRadius: '10px',
        },
      }}
    >
      <Td>
        <Flex flexDir="column" alignItems="center">
          <Text color="solid.gray0" fontSize="xs" fontWeight="bold">
            FLOOR TERMS
          </Text>
          <Image src="/assets/images/collection.png" w="55px" h="55px" />
          <Flex columnGap="4px" mt="-10px">
            <Icon name="os" size={23} />
            <Icon name="etherscan" size={18} />
          </Flex>
          <Text color="solid.gray0" fontSize="2xs" fontWeight="bold">
            Collection.Name
          </Text>
        </Flex>
      </Td>
      <Td>
        <Text color="notification.notify" fontSize="md" fontWeight="bold">
          Active
        </Text>
        <Text color="solid.gray0" fontSize="2xs" mt="2px" textDecor="underline">
          Expires in 29 Days
        </Text>
      </Td>
      <Td>
        <Flex mb="4px">
          <CryptoIcon symbol="eth" size={20} />
          <Text fontSize="sm" fontWeight="bold" ml="3px">
            4.500Ξ
          </Text>
        </Flex>
        <Text color="solid.gray0" fontSize="sm">
          120 Days,{' '}
          <Text as="span" color="solid.black">
            35.4%
          </Text>{' '}
          APR
        </Text>
      </Td>
      <Td>
        <Text fontSize="sm" color="solid.gray0">
          📈 11Ξ 15.4Ξ Floor, +24% change over 30 days
        </Text>
      </Td>
      <Td>
        <Text fontSize="sm" color="solid.gray0">
          -- Profits
        </Text>
        <Button
          variant="link"
          color="primary.purple"
          fontSize="sm"
          fontWeight="normal"
        >
          Offerbook
        </Button>
      </Td>
      <Td>
        <Flex alignItems="center">
          <Button variant="neutral">EDIT</Button>
          <Button variant="link" color="primary.purple" p="11px 30px">
            PAUSE
          </Button>
        </Flex>
      </Td>
    </Tr>
  );
};

export default Row;
