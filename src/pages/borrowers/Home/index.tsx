import React, { useState } from 'react';
import { Flex } from '@chakra-ui/react';

import FilterSidebar, { FILTER_SIDEBAR_WIDTH } from './FilterSidebar';
import Content from './Content';

// const SIDEBAR_TRANSITION_TIME = '.25s';

const Borrowers: React.FC = () => {
  const saved = localStorage.getItem('SidebarIsVisible');

  const [toggleFilter, setToggle] = useState(saved);
  const toggleVisibility = () => {
    const newToggle = isVisible() ? 'false' : 'true';
    localStorage.setItem('SidebarIsVisible', newToggle);
    setToggle(newToggle);
  };

  const isVisible = () => {
    return toggleFilter === 'true';
  };

  return (
    <Flex position="relative" flexGrow={1}>
      <FilterSidebar
        // TODO: Review Custom Transitions
        // transition={`all ${SIDEBAR_TRANSITION_TIME}`}
        position="absolute"
        left="0px"
        top="0px"
        opacity={isVisible() ? '1' : '0'}
        onHide={toggleVisibility}
      />
      <Content
        margin=".85rem"
        position="absolute"
        // transition={`all ${SIDEBAR_TRANSITION_TIME}`}
        left={isVisible() ? FILTER_SIDEBAR_WIDTH : 0}
        right={0}
        isSidebarOpen={isVisible()}
        showSidebar={toggleVisibility}
      />
    </Flex>
  );
};

export default Borrowers;
