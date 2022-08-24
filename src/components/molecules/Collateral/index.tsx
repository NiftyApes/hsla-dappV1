import React from 'react';
import { Flex, FlexProps, HStack, Image, Link, Text } from '@chakra-ui/react';
import Icon from '../../atoms/Icon';
import { NFT } from '../../../nft';

interface Props extends FlexProps {
  nft: NFT;
}

const i18n = {
  collateralLabel: 'your collateral',
  assetDetails: 'asset details',
  collateralDescription: 'Your collateral will be locked in escrow over the lifespan of your loan.',
};

const Collateral: React.FC<Props> = ({ nft }) => {
  const esNftUrl = `https://etherscan.io/token/${nft.contractAddress}?a=${nft.id}`;
  const osNftUrl = `https://opensea.io/assets/ethereum/${nft.contractAddress}/${nft.id}`;

  return (
    <>
      <Text mt="24px" fontWeight="bold" textTransform="uppercase" fontSize="sm" color="solid.gray0">
        {i18n.collateralLabel}
      </Text>
      <Image
        src={nft.image}
        alt={nft.name}
        border="4px solid"
        borderColor="solid.white"
        borderRadius="23px"
        w="150px"
        h="150px"
        objectFit="cover"
        mt="26px"
      />
      <Text mt="8px" fontSize="sm" color="solid.black">
        {nft.name}
      </Text>
      <Text mt="1px" fontSize="2xl" color="solid.black" fontWeight="bold" lineHeight="28px">
        #{nft.id}
      </Text>
      <Text mt="27px" color="solid.gray0" textTransform="uppercase" fontSize="2xs">
        {i18n.assetDetails}
      </Text>
      <Flex alignItems="center" mt="10px">
        <HStack>
          <Text noOfLines={1} width="100px">
            {nft.contractAddress}
          </Text>
          <Link isExternal href={esNftUrl}>
            <Icon name="etherscan" />
          </Link>
          <Link isExternal href={osNftUrl}>
            <Icon name="os" />
          </Link>
        </HStack>
      </Flex>
      <Text mt="10px" fontSize="sm" mb="19px">
        {i18n.collateralDescription}
      </Text>
    </>
  );
};

export default Collateral;
