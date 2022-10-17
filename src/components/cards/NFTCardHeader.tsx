import React from 'react';
import _ from 'lodash';
import { Flex, Image, Text } from '@chakra-ui/react';
import LoadingIndicator from '../atoms/LoadingIndicator';
import { NFT } from '../../nft';
import { useRaribleTokenMeta } from '../../hooks/useRaribleTokenMeta';

interface Props {
  contractAddress?: string;
  nft?: NFT;
  title: string;
  tokenId?: string;
}

const NFTCardHeader: React.FC<Props> = ({
  contractAddress,
  nft,
  title,
  tokenId,
}) => {
  let localNFT: any = useRaribleTokenMeta({
    contractAddress,
    enabled: _.isUndefined(nft),
    tokenId,
  });

  // Fallback to provided NFT data
  if (!_.isUndefined(nft)) {
    localNFT = nft;
  }

  // Display a loading indicator
  if (!localNFT.image) {
    return (
      <Flex m="5px" p="11px">
        <LoadingIndicator size="md" />
      </Flex>
    );
  }

  return (
    <Flex>
      <Image
        alt={localNFT.name}
        border="2px solid"
        borderColor="solid.white"
        borderRadius="6px"
        h="46px"
        m="5px"
        objectFit="cover"
        src={localNFT.image}
        w="46px"
      />

      <Flex
        m="15px 0 0 10px"
        fontSize="md"
        textTransform="uppercase"
        fontWeight="bold"
      >
        <Text color="solid.gray0" mr="5px">
          {title}
        </Text>
        <Text color="solid.black">{localNFT.name}</Text>
      </Flex>
    </Flex>
  );
};

export default NFTCardHeader;
