import Humanize from 'humanize-plus';
import React from 'react';

import {
  Flex,
  Image,
  Link,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import Icon from 'components/atoms/Icon';
import { useParams } from 'react-router-dom';
import { useRaribleCollectionStats } from '../../../../hooks/useRaribleColectionStats';
import { useRaribleCollectionMetadata } from '../../../../hooks/useRaribleCollectionMetadata';
import NFTCollectionList from '../components/NFTCollectionList';

const CollectionHeader: React.FC = () => {
  const { collectionAddress } = useParams();

  const { name, image } = useRaribleCollectionMetadata({
    contractAddress: collectionAddress,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { floorPrice, items, volume } = useRaribleCollectionStats({
    contractAddress: collectionAddress,
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
          as="button"
          onClick={onOpen}
          alignItems="center"
          background="#FAF5FF"
          padding=".45rem .85rem"
          borderRadius="48px"
          mr={3}
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
          <Icon name="chevron-down" ml={2} size={30} />
        </Flex>
        <Flex flexDirection="column">
          <Flex>
            <Icon name="etherscan" mr="5px" ml="3px" />
            <Link
              href={`https://etherscan.io/token/${collectionAddress}`}
              target="_blank"
            >
              Etherscan
            </Link>
          </Flex>
          <Flex>
            <Icon name="os" size={23} mr="3px" />
            <Link
              href={`https://opensea.io/assets?search[query]=${collectionAddress}`}
              target="_blank"
            >
              OpenSea
            </Link>
          </Flex>
        </Flex>
      </Flex>

      <Flex alignItems="center" flexDirection="column">
        <Text fontSize="xl" fontWeight="bold" mr="8px">
          {Humanize.formatNumber(Number(items))}
        </Text>
        <Text color="solid.gray0" fontSize="sm" fontWeight="bold" mr="8px">
          Items
        </Text>
      </Flex>

      <Flex alignItems="center" flexDirection="column">
        <Text fontSize="xl" fontWeight="bold" mr="8px">
          {Humanize.formatNumber(Number(floorPrice), 2)}Ξ
        </Text>
        <Text color="solid.gray0" fontSize="sm" fontWeight="bold" mr="8px">
          Floor
        </Text>
      </Flex>

      <Flex alignItems="center" flexDirection="column">
        <Text color="#FF5B5B" fontSize="xl" fontWeight="bold" mr="8px">
          -34.78%
        </Text>
        <Text color="solid.gray0" fontSize="sm" fontWeight="bold" mr="8px">
          30 day change
        </Text>
      </Flex>

      <Flex alignItems="center" flexDirection="column">
        <Text fontSize="xl" fontWeight="bold" mr="8px">
          0xA287..D5C7
        </Text>
        <Text color="solid.gray0" fontSize="sm" fontWeight="bold" mr="8px">
          Owner
        </Text>
      </Flex>

      <Flex alignItems="center" flexDirection="column">
        <Text color="green.gray0" fontSize="xl" fontWeight="bold" mr="8px">
          {Humanize.formatNumber(Number(volume))}Ξ
        </Text>
        <Text color="solid.gray0" fontSize="sm" fontWeight="bold" mr="8px">
          Volume
        </Text>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent p="5px">
          <ModalCloseButton />
          <NFTCollectionList onClick={onClose} />
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default CollectionHeader;
