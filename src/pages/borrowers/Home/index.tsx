import { Flex } from '@chakra-ui/react';
import React from 'react';

import { useWalletAddress } from 'hooks/useWalletAddress';
import DisconnectedView from '../DisconnectedView';
import Content from './Content';

const Borrowers: React.FC = () => {
  const walletAddress = useWalletAddress();

  if (!walletAddress) {
    return <DisconnectedView />;
  }

  return (
    <Flex position="relative" flexGrow={1}>
      <Content width="100%" />
    </Flex>
  );
};

export default Borrowers;
