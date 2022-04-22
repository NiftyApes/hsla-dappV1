import { Box, BoxProps } from '@chakra-ui/react';
import React from 'react';

const Card: React.FC<BoxProps> = ({ children, ...restProps }) => {
  return (
    <Box
      bg="solid.white"
      borderRadius="15px"
      boxShadow="0px 4px 24px 0px rgba(73, 16, 146, 0.1)"
      p="15px"
      d="flex"
      flexDir="column"
      rowGap="10px"
      {...restProps}
    >
      {children}
    </Box>
  );
};

export default Card;
