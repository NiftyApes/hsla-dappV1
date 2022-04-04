import { Flex, FlexProps, Image, Text } from '@chakra-ui/react';
import React from 'react';

interface Props extends FlexProps {
  collectionName: string;
  img: string;
  tokenName: string;
}

const Collateral: React.FC<Props> = ({ collectionName, tokenName, img, ...rest }) => {
  return (
    <Flex
      flexDir="column"
      alignItems="center"
      textAlign="center"
      bg="solid.gray3"
      borderRadius="10px"
      h="100%"
      w="100%"
      p="23px"
      {...rest}
    >
      <Text color="solid.gray0" fontWeight="bold" fontSize="lg">
        YOUR COLLATERAL
      </Text>
      <Image src={img} w="120px" h="120px" objectFit="cover" mt="22px" borderRadius="10px" />
      <Text fontSize="sm" mt="8px">
        {collectionName}
      </Text>
      <Text fontWeight="bold" fontSize="2xl" mt="1px">
        {tokenName}
      </Text>
      <Text maxW="170px" fontSize="sm">
        Your collateral will be locked in escrow over the lifespan of your loan.
      </Text>
    </Flex>
  );
};

export default Collateral;
