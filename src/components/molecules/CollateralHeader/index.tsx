import React from 'react';
import { Flex, Image, Text } from '@chakra-ui/react';
import { NFT } from '../../../nft';

export const CollateralHeader: React.FC<{ title: string; nft: NFT }> = (props) => {
  const { title, nft } = props;
  return (
    <Flex>
      <Image
        alt={nft.name}
        border="2px solid"
        borderColor="solid.white"
        borderRadius="6px"
        h="46px"
        m="5px"
        objectFit="cover"
        w="46px"
        src={nft.image}
      />
      <Flex m="15px 0 0 10px" fontSize="md" textTransform="uppercase" fontWeight="bold">
        <Text color="solid.gray0" mr="5px">
          {title}
        </Text>
        <Text color="solid.black">
          {nft.name} #{nft.id}
        </Text>
      </Flex>
    </Flex>
  );
};
