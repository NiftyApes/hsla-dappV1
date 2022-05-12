import React from 'react';
import { Flex, useDisclosure } from '@chakra-ui/react';

import FilterSidebar, { FILTER_SIDEBAR_WIDTH } from './FilterSidebar';
import Content from './Content';

// const SIDEBAR_TRANSITION_TIME = '.25s';

const Borrowers: React.FC = () => {
  const { isOpen: isSidebarVisible, onToggle: onSidebarVisibilityToggle } = useDisclosure({
    defaultIsOpen: true,
  });

  return (
    <Flex position="relative" flexGrow={1}>
      <FilterSidebar
        // transition={`all ${SIDEBAR_TRANSITION_TIME}`}
        position="absolute"
        left="0px"
        top="0px"
        opacity={isSidebarVisible ? '1' : '0'}
        onHide={onSidebarVisibilityToggle}
      />
      <Content
        margin=".85rem"
        // transition={`all ${SIDEBAR_TRANSITION_TIME}`}
        left={isSidebarVisible ? FILTER_SIDEBAR_WIDTH : 0}
        isSidebarOpen={isSidebarVisible}
        showSidebar={onSidebarVisibilityToggle}
      />
    </Flex>
  );
};

export default Borrowers;
