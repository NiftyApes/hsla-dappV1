import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

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
  const tokenPadding = collectionName ? '-5px' : '16px';

  return (
    <>
      <Image borderRadius="8px 8px 0 0" h="260px" objectFit="cover" src={img} w="260px" />

      <Flex align="center" flexDir="column" mt="200px" position="absolute">
        {collectionName && (
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
          isTruncated
          maxW="100%"
          mt={tokenPadding}
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
