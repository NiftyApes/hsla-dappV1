import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { useRaribleTokenMeta } from '../../hooks/useRaribleTokenMeta';
import LoadingIndicator from '../atoms/LoadingIndicator';
import Icon from '../atoms/Icon';

interface Props {
  contractAddress?: string;
  tokenId?: string;
}

const NFTCardSmall: React.FC<Props> = ({ contractAddress, tokenId }) => {
  const fetchedNFT: any = useRaribleTokenMeta({
    contractAddress,
    tokenId,
  });

  if (!fetchedNFT.image) {
    return <LoadingIndicator size="md" />;
  }

  return (
    <Flex flexDir="row">
      <Flex flexDir="column">
        <Image
          src={fetchedNFT.image}
          w="55px"
          h="55px"
          objectFit="cover"
          borderRadius="10"
        />

        <Flex flexDir="row" ml="8px" mt="-10px" alignItems="center">
          <a
            href={`https://opensea.io/assets/ethereum/${fetchedNFT.contractAddress}/${fetchedNFT.id}`}
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="os" size={20} />
          </a>
          <Box
            border="1.5px solid"
            borderRadius="50%"
            borderColor="solid.white"
            bgColor="white"
          >
            <a href={fetchedNFT.external_url} target="_blank" rel="noreferrer">
              <Icon name="etherscan" size={15} />
            </a>
          </Box>
        </Flex>

        <Text
          mt="5px"
          fontWeight="bold"
          fontSize="2xs"
          width="55px"
          color="gray"
          noOfLines={1}
        >
          {fetchedNFT.name}
        </Text>
      </Flex>
    </Flex>
  );
};

export default NFTCardSmall;
