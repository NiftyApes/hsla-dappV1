import React, { useEffect } from 'react';
import { Flex, useDisclosure } from '@chakra-ui/react';

import { useEthersContext } from 'eth-hooks/context';
// import { useScaffoldProviders as useScaffoldAppProviders } from '../../../functions/useScaffoldAppProviders';
import { WalletProvider } from '../../../lib/contexts/WalletProvider';

import FilterSidebar, { FILTER_SIDEBAR_WIDTH } from './FilterSidebar';
import Content from './Content';

const SIDEBAR_TRANSITION_TIME = '1s';

const Borrowers: React.FC = () => {
  const { isOpen: isSidebarVisible, onToggle: onSidebarVisibilityToggle } = useDisclosure({
    defaultIsOpen: true,
  });

  // 🛰 providers
  // see useLoadProviders.ts for everything to do with loading the right providers
  // const scaffoldAppProviders = useScaffoldAppProviders();

  const ethersContext = useEthersContext();

  useEffect(() => {
    // console.log('scaffoldAppProviders', scaffoldAppProviders);
    console.log('ethersContext', ethersContext);
    console.log('WalletProvider', WalletProvider);
  });

  return (
    <Flex position="relative" flexGrow={1}>
      <FilterSidebar
        transition={`all ${SIDEBAR_TRANSITION_TIME}`}
        position="absolute"
        left="0px"
        top="0px"
        opacity={isSidebarVisible ? '1' : '0'}
        onHide={onSidebarVisibilityToggle}
      />
      <Content
        position="absolute"
        transition={`all ${SIDEBAR_TRANSITION_TIME}`}
        left={isSidebarVisible ? FILTER_SIDEBAR_WIDTH : 0}
        isSidebarOpen={isSidebarVisible}
        showSidebar={onSidebarVisibilityToggle}
      />
    </Flex>
  );
};

export default Borrowers;
