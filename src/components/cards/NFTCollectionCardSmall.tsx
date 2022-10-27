import React from 'react';
import { Flex, Image, Link, Text } from '@chakra-ui/react';
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
    <Flex as="button" flexDir="row" p="10px" onClick={handleClick}>
      <Image src={image} w="55px" h="55px" mr="7px" borderRadius="full" />
      <Flex flexDir="column" ml="10px">
        <Text fontWeight="bold" mt="4px">
          {name}
        </Text>
        <Flex flexDir="row" mt="5px" gap="1">
          <Link href={esLink} target="_blank">
            <Icon name="etherscan" mt="1px" />
          </Link>

          <Link href={osLink} target="_blank">
            <Icon name="os" size={22} />
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NFTCollectionCardSmall;
