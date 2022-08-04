import { Center } from '@chakra-ui/react';
import LoadingIndicator from '../../atoms/LoadingIndicator';
import React from 'react';
import { NFTCardContainer } from '../NFTCard/NFTCardContainer';

export const NFTLoadingCard: React.FC = () => (
  <NFTCardContainer>
    <Center h="280px">
      <LoadingIndicator />
    </Center>
  </NFTCardContainer>
);
