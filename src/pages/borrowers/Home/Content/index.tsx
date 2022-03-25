import React from 'react';
import { Box, BoxProps, Button } from '@chakra-ui/react';

import Icon from 'components/atoms/Icon';

interface Props extends BoxProps {
  isSidebarOpen: boolean;
  showSidebar(): void;
}

const Content: React.FC<Props> = ({ isSidebarOpen, showSidebar, ...restProps }) => {
  return (
    <Box {...restProps}>
      {!isSidebarOpen && (
        <Button variant="primary" color="solid.gray0" onClick={showSidebar} borderRadius="9px">
          <Icon name="sliders" />
        </Button>
      )}
    </Box>
  );
};

export default Content;
