import { Center, Text } from '@chakra-ui/react';
import React from 'react';
import { NFTCardContainer } from '../NFTCard/components/NFTCardContainer';
import { NFTCardContainerHeader } from '../NFTCard/components/NFTCardContainerHeader';

interface Props {
  attributes?: any;
  collectionName?: string;
  contractAddress: string;
  img?: string;
  tokenId: string;
  tokenName: string;
}

const i18n = {
  noOffers: 'no offers available',
};

const NFTNoOfferCard: React.FC<Props> = ({
  contractAddress,
  attributes,
  collectionName,
  img,
  tokenId,
  tokenName,
}) => {
  return (
    <NFTCardContainer>
      <NFTCardContainerHeader
        attributes={attributes}
        collectionName={collectionName}
        contractAddress={contractAddress}
        img={img}
        tokenId={tokenId}
        tokenName={tokenName}
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
