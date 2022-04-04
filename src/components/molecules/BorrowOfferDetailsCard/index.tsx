import React from 'react';
import { Flex, Grid, Image, Text } from '@chakra-ui/react';

import { CoinSymbol } from 'lib/constants/coinSymbols';
import Icon from 'components/atoms/Icon';
import CryptoIcon from 'components/atoms/CryptoIcon';

interface Props {
  img: string;
  tokenName: string;
  offer: {
    type: 'top' | 'floor';
    price: number;
    symbol: CoinSymbol;
    aprPercentage: number;
    days: number;
  };
}

const BorrowOfferDetailsCard: React.FC<Props> = ({ img, offer, tokenName }) => {
  return (
    <Grid
      gridTemplateColumns="repeat(2, minmax(0, 1fr))"
      gridColumnGap="20px"
      w="484px"
      p="13px"
      border="1px solid"
      borderColor="solid.lightPurple"
      borderRadius="10px"
      textAlign="center"
      bgColor="solid.white"
    >
      <Flex
        flexDir="column"
        alignItems="center"
        bg="solid.gray3"
        borderRadius="10px"
        padding=".2rem .5rem"
      >
        <Text mt="24px" fontWeight="bold" fontSize="sm" color="solid.gray0">
          YOUR COLLATERAL
        </Text>
        <Image
          src={img}
          alt="NFT"
          border="6px solid"
          borderColor="solid.white"
          borderRadius="23px"
          w="114px"
          h="108px"
          objectFit="cover"
          mt="26px"
        />
        <Text mt="8px" fontSize="sm" color="solid.black">
          {tokenName}
        </Text>
        <Text mt="1px" fontSize="2xl" color="solid.black" fontWeight="bold" lineHeight="28px">
          #43
        </Text>
        <Text mt="27px" color="solid.gray0" fontSize="2xs">
          ASSET DETAILS
        </Text>
        <Flex alignItems="center" mt="10px">
          <Text fontSize="md" lineHeight="20px" color="primary.purple">
            0xa7d8...d270
          </Text>
          <Icon
            name="etherscan"
            border="1.5px solid"
            borderColor="solid.white"
            mr="3px"
            borderRadius="50%"
          />
          <Icon
            name="etherscan"
            border="1.5px solid"
            borderColor="solid.white"
            borderRadius="50%"
          />
        </Flex>
        <Text mt="10px" fontSize="sm" mb="19px">
          Your collateral will be locked in escrow over the lifespan of your loan.
        </Text>
      </Flex>

      <Flex flexDir="column" alignItems="center">
        <Text mt="24px" fontWeight="bold" fontSize="sm" color="solid.gray0">
          DEAL TERMS
        </Text>
        <Flex alignItems="center">
          <CryptoIcon symbol={offer.symbol} size={32} />
          <Text ml="6px" fontSize="3.5xl">
            {offer.price}Ξ
          </Text>
        </Flex>
        <Text fontSize="lg" color="solid.black" mt="5px">
          {offer.days}
          &nbsp;days at&nbsp;
          {offer.aprPercentage}% &nbsp;APR
        </Text>
        <Text mt="12px">
          {offer.price}% will be sent to your wallet address once your loan is executed.
        </Text>
        <Flex alignItems="center" mt="50px">
          <Text fontSize="sm" color="solid.gray0" mr="3px">
            TOTAL INTEREST
          </Text>
          <Icon name="help-circle" color="solid.gray0" />
        </Flex>
        <Flex alignItems="center" mt="30px">
          <CryptoIcon symbol={offer.symbol} size={32} />
          <Text ml="6px" fontSize="3.5xl">
            ~1.48..Ξ
          </Text>
        </Flex>
        <Text fontSize="sm" color="solid.black" mb="20px">
          The most you could owe at the end of your loan.
        </Text>
      </Flex>
    </Grid>
  );
};

export default BorrowOfferDetailsCard;
