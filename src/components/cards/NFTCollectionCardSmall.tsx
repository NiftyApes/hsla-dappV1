import React from 'react';
import { VStack, HStack, Image, Link, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useRaribleCollectionMetadata } from '../../hooks/useRaribleCollectionMetadata';
import Icon from '../atoms/Icon';
import LoadingIndicator from '../atoms/LoadingIndicator';

interface Props {
  contractAddress: string;
  throttle?: number;
}

const NFTCollectionCardSmall: React.FC<Props> = ({
  contractAddress,
  throttle = 0,
}) => {
  const navigate = useNavigate();
  const { name, image } = useRaribleCollectionMetadata({
    contractAddress,
    throttle,
  });

  const osLink: string = `https://opensea.io/assets?search[query]=${contractAddress}`;
  const esLink: string = `https://etherscan.io/token/${contractAddress}`;

  const handleClick = () => {
    navigate(`/lenders/create-collection-offer/${contractAddress}`);
  };

  if (!image) {
    return <LoadingIndicator size="md" />;
  }

  return (
    <HStack as="button" title={name} spacing="10px" onClick={handleClick}>
      <Image src={image} w="55px" h="55px" mr="7px" borderRadius="full" />
      <VStack align="left" ml="10px">
        <Text mt="7px" align="left" fontSize="md" fontWeight="bold" noOfLines={1}>
          {name}
        </Text>

        <HStack mt="-3px" spacing="5px">
          <Link href={esLink} target="_blank">
            <Icon name="etherscan" mt="1px" />
          </Link>
          <Link href={osLink} target="_blank">
            <Icon name="os" size={22} />
          </Link>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default NFTCollectionCardSmall;
