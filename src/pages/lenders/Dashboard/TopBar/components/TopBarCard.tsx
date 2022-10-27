import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

export const TopBarCard: React.FC<{ title: string; value: string }> = ({
  title,
  value,
}) => {
  return (
    <Flex flexDir="column" alignItems="center">
      <Text fontSize="7xl">{value}</Text>
      <Text textTransform="uppercase" fontSize="2xs" color="solid.darkGray">
        {title}
      </Text>
    </Flex>
  );
};
