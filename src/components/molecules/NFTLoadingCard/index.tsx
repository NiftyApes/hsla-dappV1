import { Center } from '@chakra-ui/react';
import LoadingIndicator from '../../atoms/LoadingIndicator';
import React from 'react';
import { NFTCardContainer } from '../NFTCard/components/NFTCardContainer';

export const NFTLoadingCard: React.FC = () => (
  <NFTCardContainer>
    <Center h="298px">
      <LoadingIndicator />
    </Center>
  </NFTCardContainer>
);
