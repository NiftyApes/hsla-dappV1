import {
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';

import CryptoIcon from 'components/atoms/CryptoIcon';
import Icon from 'components/atoms/Icon';
import BorrowerAllMatchingOffersModal from 'components/organisms/BorrowerAllMatchingOffersModal';

export const NFT_CARD_WIDTH = 264;

const CollectionCard: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        w={NFT_CARD_WIDTH}
        alignItems="center"
        flexDir="column"
        bg="solid.white"
        borderRadius="15px"
        p="16px 20px"
        boxShadow="0px 4px 24px 0px rgba(73, 16, 146, 0.1)"
        position="relative"
        onClick={onOpen}
        cursor="pointer"
      >
        <Menu>
          <MenuButton position="absolute" top="16px" right="14px">
            <Icon name="more-vertical" color="solid.gray0" />
          </MenuButton>
          <MenuList>
            <MenuItem>Add</MenuItem>
            <MenuItem>Remove</MenuItem>
          </MenuList>
        </Menu>

        <Text maxW="100%" fontSize="lg" fontWeight="bold" noOfLines={1}>
          COLLECTION.NAME
        </Text>

        <Image
          src="/assets/mocks/bored_ape.png"
          alt="NFT Card"
          w="177px"
          h="157px"
          objectFit="cover"
          borderRadius="10px"
          mt="17px"
        />

        <Text
          fontSize="xs"
          p="3px 7px"
          color="solid.gray0"
          boxShadow="0px 1px 0px 0px #F6EDFF"
          borderRadius="3px"
          mt="16px"
          bg="solid.white"
          zIndex={2}
        >
          TOP OFFER
        </Text>

        <Flex
          flexDir="column"
          alignItems="center"
          borderRadius="10px"
          border="1px solid"
          borderColor="accents.100"
          bg="#C4C4C41A"
          w="100%"
          p="18px 10px 10px 10px"
          mt="-8px"
        >
          <Flex alignItems="center">
            <CryptoIcon symbol="eth" size={25} />
            <Text ml="6px" fontSize="3.5xl" fontWeight="bold">
              25.00Ξ
            </Text>
          </Flex>
          <Text fontSize="lg" color="solid.gray0">
            <Text as="span" color="solid.black">
              120
            </Text>
            &nbsp;days at&nbsp;
            <Text as="span" color="solid.black">
              6.35%
            </Text>
            &nbsp;APR
          </Text>
        </Flex>

        <Button
          variant="secondary"
          borderRadius="10px"
          w="100%"
          fontWeight="normal"
          fontSize="sm"
          mt="8px"
        >
          View All Offers
        </Button>
      </Flex>
      <BorrowerAllMatchingOffersModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default CollectionCard;
