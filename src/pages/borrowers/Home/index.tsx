import React, { useState } from 'react';
import { Flex } from '@chakra-ui/react';

import FilterSidebar from './FilterSidebar';
import Content from './Content';

const SIDEBAR_TRANSITION_TIME = '.25s';

const Borrowers: React.FC = () => {
  const saved = localStorage.getItem('SidebarIsVisible');
  const [toggleFilter, setToggle] = useState(saved);
  const isVisible = toggleFilter === 'true';
  const toggleVisibility = () => {
    const newToggle = isVisible ? 'false' : 'true';
    localStorage.setItem('SidebarIsVisible', newToggle);
    setToggle(newToggle);
  };

  return (
    <Flex flexDirection="row">
      <FilterSidebar
        flex={isVisible ? 1 : 0.00001}
        transition={`flex ${SIDEBAR_TRANSITION_TIME}`}
        onHide={toggleVisibility}
      />
      <Content
        margin=".85rem"
        flex={1}
        transition={`flex ${SIDEBAR_TRANSITION_TIME}`}
        isSidebarOpen={isVisible}
        showSidebar={toggleVisibility}
      />
    </Flex>
  );
};

export default Borrowers;
