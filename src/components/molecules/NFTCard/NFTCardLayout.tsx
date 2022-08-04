import React from 'react';
import { Flex, Image, Text } from '@chakra-ui/react';
import { NFTCardContainer } from './NFTCardContainer';

interface Props {
  collectionName?: string;
  img?: string;
  tokenId: string;
  tokenName: string;
  children: JSX.Element;
}

export const NFTCardLayout: React.FC<Props> = ({
  children,
  collectionName,
  img,
  tokenId,
  tokenName,
}) => {
  const tokenPadding = collectionName ? '-5px' : '16px';

  return (
    <NFTCardContainer>
      <>
        <Image
          w="200px"
          h="200px"
          src={img}
          alt="No Offer Card"
          objectFit="cover"
          borderRadius="8px 8px 0 0"
        />

        <Flex align="center" flexDir="column" mt="150px" position="absolute">
          {collectionName && (
            <Text
              maxW="100%"
              fontSize="sm"
              fontWeight="bold"
              color="white"
              textShadow="0px 0px 4px #000000"
              textTransform="uppercase"
            >
              {collectionName}
            </Text>
          )}

          <Text
            mt={tokenPadding}
            fontSize="xl"
            fontWeight="semibold"
            maxW="100%"
            color="white"
            textShadow="0px 0px 4px #000000"
            textTransform="uppercase"
            isTruncated
          >
            {tokenName} #{tokenId}
          </Text>
        </Flex>
        {children}
      </>
    </NFTCardContainer>
  );
};
