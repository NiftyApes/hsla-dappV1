import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';

interface Props {
  collectionName?: string;
  img?: string;
  tokenId: string;
  tokenName: string;
  children: JSX.Element;
}

export const NFTCardHeader: React.FC<Props> = ({
  children,
  collectionName,
  img,
  tokenId,
  tokenName,
}) => {
  const tokenPadding = collectionName ? -5 : 16;

  return (
    <>
      <Image borderRadius="8px 8px 0 0" h="260px" objectFit="cover" src={img} w="260px" />

      <Flex
        align="center"
        px="8px"
        borderRadius="8px"
        flexDir="column"
        mt={`${200 + tokenPadding}px`}
        position="absolute"
        backgroundColor="#0009"
      >
        {collectionName && collectionName !== '' && (
          <Text
            color="white"
            fontSize="sm"
            fontWeight="bold"
            maxW="100%"
            textShadow="0px 0px 4px #000000"
            textTransform="uppercase"
          >
            {collectionName}
          </Text>
        )}

        <Text
          color="white"
          fontSize="xl"
          fontWeight="semibold"
          noOfLines={1}
          maxW="100%"
          textShadow="0px 0px 4px #000000"
          textTransform="uppercase"
        >
          {tokenName} #{tokenId}
        </Text>
      </Flex>
      <Box w="100%" p="0 8px 8px 8px">
        {children}
      </Box>
    </>
  );
};
