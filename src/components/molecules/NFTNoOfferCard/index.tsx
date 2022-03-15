import React from 'react';
import { Button, Flex, Image, Text } from '@chakra-ui/react';

interface Props {
  collectionName: string;
  tokenName: string;
  id: string;
  img: string;
}

const NFTNoOfferCard: React.FC<Props> = ({ collectionName, tokenName, id, img }) => {
  return (
    <Flex
      alignItems="center"
      flexDir="column"
      p="17px 15px 10px 15px"
      fontWeight="bold"
      w="200px"
      boxShadow="0px 4px 24px rgba(73, 16, 146, 0.1)"
      borderRadius="15px"
    >
      <Text color="solid.lightGray" fontSize="2.5xs">
        {collectionName}
      </Text>
      <Text fontSize="xl" mt="5px" maxW="100%" isTruncated>
        {tokenName} #{id}
      </Text>
      <Image
        src={img}
        alt="No Offer Card"
        w="156px"
        h="127px"
        objectFit="cover"
        borderRadius="25px"
        mt="12px"
      />
      <Text mt="8px" color="solid.darkGray" fontSize="xs">
        NO OFFERS AVAILABLE
      </Text>
      <Button variant="secondary" size="xs" py="8px" w="100%" h="30px" mt="8px">
        REQUEST LOAN
      </Button>
    </Flex>
  );
};

export default NFTNoOfferCard;
