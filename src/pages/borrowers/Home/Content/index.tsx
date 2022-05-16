import React, { useEffect, useState } from 'react';
import { Box, BoxProps, Button, Flex } from '@chakra-ui/react';
import { useConnectWallet } from '@web3-onboard/react';

import { LocalhostContent } from './LocalWalletNFTs';
import { MainnetContent } from './MainnetWalletNFTs';

import Icon from 'components/atoms/Icon';

interface Props extends BoxProps {
  isSidebarOpen: boolean;
  showSidebar(): void;
}

interface Props extends BoxProps {
  isSidebarOpen: boolean;
  showSidebar(): void;
}

const Content: React.FC<Props> = ({ isSidebarOpen, showSidebar, ...restProps }) => {
  const [{ wallet }] = useConnectWallet();
  const [chainId, setChainId] = useState<string>();

  useEffect(() => {
    if (wallet?.chains) {
      setChainId(wallet?.chains[0].id);
    }
  }, [wallet]);

  const NFTs =
    chainId === '0x1' ? <MainnetContent /> : chainId === '0x7a69' ? <LocalhostContent /> : null;

  return (
    <Flex {...restProps}>
      {!isSidebarOpen && (
        <Button variant="primary" color="solid.gray0" onClick={showSidebar} borderRadius="9px">
          <Icon name="sliders" />
        </Button>
      )}
      <Box>{NFTs}</Box>
    </Flex>
  );
};

export default Content;
