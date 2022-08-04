import React from 'react';
import { Flex } from '@chakra-ui/react';

interface Props {
  children: JSX.Element;
}

export const NFTCardContainer: React.FC<Props> = ({ children }) => (
  <Flex
    alignItems="center"
    flexDir="column"
    boxShadow="0px 4px 16px rgba(0, 0, 0, 0.3)"
    borderRadius="8px"
    width="200px"
  >
    {children}
  </Flex>
);
