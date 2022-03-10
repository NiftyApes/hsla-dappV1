import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import React from 'react';

type Props = {
  name: string;
  children: React.ReactNode | React.ReactNode[];
};

const Category: React.FC<Props> = ({ name, children }) => {
  return (
    <Box>
      <Flex pl="18px" alignItems="center">
        <Text
          textTransform="uppercase"
          fontSize="2xs"
          fontWeight="bold"
          color="solid.darkGray"
          flexShrink={0}
          mr="18px"
        >
          {name}
        </Text>
        <Divider bg="gray.200" flexGrow={1} />
      </Flex>
      {children}
    </Box>
  );
};

export default Category;
