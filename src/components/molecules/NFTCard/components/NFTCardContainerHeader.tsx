import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';

interface Props {
  collectionName?: string;
  img?: string;
  tokenId: string;
  tokenName: string;
  children: JSX.Element;
}

export const NFTCardContainerHeader: React.FC<Props> = ({
  children,
  collectionName,
  img,
  tokenId,
  tokenName,
}) => {
  const tokenPadding = collectionName ? -5 : 16;

  return (
    <>
      <Image 
        borderRadius="8px 8px 0 0" 
        h="260px" 
        objectFit="cover" 
        src={img} w="260px" 
        />

      <Flex
        align="center"
        px="8px"
        borderRadius="8px"
        flexDir="column"
        mt={`${210 + tokenPadding}px`}
        pb="5px"
        position="absolute"
        zIndex="1"
        _after={{
          content: '""',
          background: 'linear-gradient(360deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0) 100%)',
          width: '260px', 
          height: '75px',
          display: 'block',
          position: 'absolute',
          bottom: '0', 
          zIndex: '-10',
          
        }}

      >
        {collectionName && collectionName !== '' && (
          <Text
            color="white"
            fontSize="sm"
            fontWeight="bold"
            maxW="240px"
            textShadow="0px 0px 4px #000000"
            textTransform="uppercase"
            textAlign={"center"}
            noOfLines={1}
          >
            {collectionName}
          </Text>
        )}

        <Text
          color="white"
          fontSize="xl"
          fontWeight="semibold"
          noOfLines={1}
          maxW="240px"
          textShadow="0px 0px 4px #000000"
          textTransform="uppercase"
          textAlign={"center"}
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
