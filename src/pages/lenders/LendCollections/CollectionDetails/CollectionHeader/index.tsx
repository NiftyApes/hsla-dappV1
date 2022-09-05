import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

import Icon from 'components/atoms/Icon';
import { useParams } from 'react-router-dom';

const CollectionHeader: React.FC = () => {
  const { collectionAddress } = useParams();

  if (!collectionAddress) {
    return null;
  }

  return (
    <Flex
      boxShadow="0px 4px 24px 0px #4910921A"
      p="48px"
      borderRadius="48px"
      alignItems="center"
      justifyContent="space-between"
      mt="15px"
      mb="40px"
    >
      <Flex alignItems="center">
        <img
          style={{ height: '100px', width: '100px' }}
          src="https://lh3.googleusercontent.com/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB=s0"
        />
        <Text fontSize="xl" fontWeight="bold" mr="8px">
          Bored Ape Yacht Club
        </Text>
      </Flex>

      <Flex flexDirection="column">
        <Flex>
          <Icon name="etherscan" mr="5px" ml="3px" />
          <span style={{ textDecoration: 'underline' }}>Etherscan</span>
        </Flex>
        <Flex>
          <Icon name="os" size={23} mr="3px" />
          <span style={{ textDecoration: 'underline' }}>Opensea</span>
        </Flex>
      </Flex>

      <Flex alignItems="center" flexDirection="column">
        <Text fontSize="xl" fontWeight="bold" mr="8px">
          10.0k
        </Text>
        <Text color="solid.gray0" fontSize="sm" fontWeight="bold" mr="8px">
          Items
        </Text>
      </Flex>

      <Flex alignItems="center" flexDirection="column">
        <Text fontSize="xl" fontWeight="bold" mr="8px">
          6.5k
        </Text>
        <Text color="solid.gray0" fontSize="sm" fontWeight="bold" mr="8px">
          Owners
        </Text>
      </Flex>

      <Flex alignItems="center" flexDirection="column">
        <Text fontSize="xl" fontWeight="bold" mr="8px">
          80.00Ξ
        </Text>
        <Text color="solid.gray0" fontSize="sm" fontWeight="bold" mr="8px">
          Floor
        </Text>
      </Flex>

      <Flex alignItems="center" flexDirection="column">
        <Text color="green.500" fontSize="xl" fontWeight="bold" mr="8px">
          +5Ξ
        </Text>
        <Text color="solid.gray0" fontSize="sm" fontWeight="bold" mr="8px">
          30 Day Change
        </Text>
      </Flex>

      <Flex alignItems="center" flexDirection="column">
        <Text fontSize="xl" fontWeight="bold" mr="8px">
          500
        </Text>
        <Text color="solid.gray0" fontSize="sm" fontWeight="bold" mr="8px">
          30 Day Sales
        </Text>
      </Flex>

      <Flex alignItems="center" flexDirection="column">
        <Text fontSize="xl" fontWeight="bold" mr="8px">
          76.76Ξ
        </Text>
        <Text color="solid.gray0" fontSize="sm" fontWeight="bold" mr="8px">
          30 Day Avg Price
        </Text>
      </Flex>
    </Flex>
  );
};

export default CollectionHeader;
