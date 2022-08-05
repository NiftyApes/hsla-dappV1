import React from 'react';
import { Center, Text } from '@chakra-ui/react';
import { Contract } from 'ethers';
import { NFTCardContainer } from '../NFTCard/components/NFTCardContainer';
import { NFTCardHeader } from '../NFTCard/components/NFTCardHeader';

interface Props {
  collectionName?: string;
  contract?: Contract;
  img?: string;
  tokenId: string;
  tokenName: string;
}

const i18n = {
  noOffers: 'no offers available',
};

const NFTNoOfferCard: React.FC<Props> = ({ collectionName, contract, img, tokenId, tokenName }) => {
  return (
    <NFTCardContainer>
      <NFTCardHeader
        img={img}
        tokenId={tokenId}
        tokenName={tokenName}
        collectionName={collectionName}
      >
        <Center mt="8px">
          <Text color="solid.gray0" fontSize="sm" textTransform="uppercase">
            {i18n.noOffers}
          </Text>
        </Center>
      </NFTCardHeader>
    </NFTCardContainer>
  );
};

export default NFTNoOfferCard;
