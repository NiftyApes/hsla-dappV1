import { Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';

import Icon from 'components/atoms/Icon';
import { useParams } from 'react-router-dom';
import { useCollectionMetadata } from '../../../../../hooks/useCollectionMetadata';
import { useCollectionStats } from '../../../../../hooks/useColectionStats';

const CollectionHeader: React.FC = () => {
  const { collectionAddress } = useParams();

  const { name, image } = useCollectionMetadata({ nftContractAddress: collectionAddress });

  const { floorPrice, items, marketCap, owners, volume } = useCollectionStats({
    nftContractAddress: collectionAddress,
  });

  if (!collectionAddress) {
    return null;
  }

  return (
    <Flex
      boxShadow="0px 4px 24px 0px #4910921A"
      p="1.5rem"
      borderRadius="48px"
      alignItems="center"
      justifyContent="space-between"
      mt="0rem"
      mb="2.5rem"
    >
      <Flex alignItems="center">
        <Flex
          alignItems="center"
          background="#FAF5FF"
          padding=".45rem .85rem"
          borderRadius={'48px'}
          mr="1rem"
          _after={{ content: '"↓"', ml: '.75rem' }}
        >
          <Image
            borderRadius="full"
            style={{ height: '3.5rem', width: '3.5rem' }}
            mr=".75rem"
            alt={name}
            src={image}
          />
          <Text maxWidth="20ch" noOfLines={1} fontSize="xl" fontWeight="bold">
            {name}
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
      </Flex>

      <Flex alignItems="center" flexDirection="column">
        <Text fontSize="xl" fontWeight="bold" mr="8px">
          {items}
        </Text>
        <Text color="solid.gray0" fontSize="sm" fontWeight="bold" mr="8px">
          Items
        </Text>
      </Flex>

      <Flex alignItems="center" flexDirection="column">
        <Text fontSize="xl" fontWeight="bold" mr="8px">
          {owners}
        </Text>
        <Text color="solid.gray0" fontSize="sm" fontWeight="bold" mr="8px">
          Owners
        </Text>
      </Flex>

      <Flex alignItems="center" flexDirection="column">
        <Text fontSize="xl" fontWeight="bold" mr="8px">
          {floorPrice}Ξ
        </Text>
        <Text color="solid.gray0" fontSize="sm" fontWeight="bold" mr="8px">
          Floor
        </Text>
      </Flex>

      <Flex alignItems="center" flexDirection="column">
        <Text color="green.gray0" fontSize="xl" fontWeight="bold" mr="8px">
          {volume}Ξ
        </Text>
        <Text color="solid.gray0" fontSize="sm" fontWeight="bold" mr="8px">
          Volume
        </Text>
      </Flex>
    </Flex>
  );
};

export default CollectionHeader;
