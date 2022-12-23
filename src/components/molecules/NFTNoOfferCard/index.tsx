import { Center, Text } from '@chakra-ui/react';
import React from 'react';
import { NFTCardContainer } from '../NFTCard/components/NFTCardContainer';
import { NFTCardContainerHeader } from '../NFTCard/components/NFTCardContainerHeader';

interface Props {
  collectionName?: string;
  img?: string;
  tokenId: string;
  tokenName: string;
  attributes?: any;
}

const i18n = {
  noOffers: 'no offers available',
};

const NFTNoOfferCard: React.FC<Props> = ({
  collectionName,
  img,
  tokenId,
  tokenName,
  attributes,
}) => {
  return (
    <NFTCardContainer>
      <NFTCardContainerHeader
        img={img}
        tokenId={tokenId}
        tokenName={tokenName}
        collectionName={collectionName}
        attributes={attributes}
      >
        <Center mt="8px">
          <Text color="solid.gray0" fontSize="sm" textTransform="uppercase">
            {i18n.noOffers}
          </Text>
        </Center>
      </NFTCardContainerHeader>
    </NFTCardContainer>
  );
};

export default NFTNoOfferCard;
