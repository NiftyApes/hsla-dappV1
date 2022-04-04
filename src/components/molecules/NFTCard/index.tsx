import React from 'react';
import { Button, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';

import { CoinSymbol } from 'lib/constants/coinSymbols';
import Icon from 'components/atoms/Icon';
import CryptoIcon from 'components/atoms/CryptoIcon';
import { formatNumber } from 'lib/helpers/string';

interface Props {
  collectionName: string;
  tokenName: string;
  offer: {
    type: 'top' | 'floor';
    price: number;
    symbol: CoinSymbol;
    aprPercentage: number;
    days: number;
  };
  img: string;
  numberOfOffers: number;
}

export const NFT_CARD_WIDTH = 264;

const NFTCard: React.FC<Props> = ({ collectionName, tokenName, offer, img, numberOfOffers }) => {
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
        transition="all 0.5s"
        _hover={{
          transform: 'scale(1.1)',
          '.smash-money-btn': {
            display: 'block',
          },
        }}
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

        <Text maxW="100%" color="solid.gray0" fontSize="sm" fontWeight="bold" isTruncated>
          {collectionName}
        </Text>
        <Text
          maxW="100%"
          fontSize="lg"
          fontWeight="bold"
          p="3px 7px"
          bg="solid.white"
          borderRadius="3px"
          zIndex={2}
          isTruncated
        >
          {tokenName}
        </Text>

        <Image
          src={img}
          alt="NFT Card"
          w="177px"
          h="157px"
          objectFit="cover"
          borderRadius="10px"
          mt="-5px"
        />

        <Text
          textTransform="uppercase"
          fontSize="xs"
          p="3px 7px"
          color="solid.gray0"
          boxShadow="0px 1px 0px 0px #F6EDFF"
          borderRadius="3px"
          mt="16px"
          bg="solid.white"
          zIndex={2}
        >
          {offer.type} offer
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
            <CryptoIcon symbol={offer.symbol} size={25} />
            <Text ml="6px" fontSize="3.5xl" fontWeight="bold">
              {offer.price}Ξ
            </Text>
          </Flex>
          <Text fontSize="lg" color="solid.gray0">
            <Text as="span" color="solid.black">
              {offer.days}
            </Text>
            &nbsp;days at&nbsp;
            <Text as="span" color="solid.black">
              {offer.aprPercentage}%
            </Text>
            &nbsp;APR
          </Text>
          <Button
            variant="notify"
            className="smash-money-btn"
            w="100%"
            borderRadius="10px"
            mt="5px"
            display="none"
            px="5px"
          >
            🍌Smash money button
          </Button>
        </Flex>

        <Button
          variant="secondary"
          borderRadius="10px"
          w="100%"
          fontWeight="normal"
          fontSize="sm"
          mt="8px"
        >
          View All Offers ({formatNumber(numberOfOffers)})
        </Button>
      </Flex>
    </>
  );
};

export default NFTCard;
