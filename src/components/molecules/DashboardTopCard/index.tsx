import React from 'react';
import { Flex, FlexProps, Text } from '@chakra-ui/react';

interface Props extends FlexProps {
  desc: string;
}

const TopCard: React.FC<Props> = ({ desc, children, ...restProps }) => {
  return (
    <Flex
      flexDir="column"
      alignItems="center"
      p="23px"
      borderRadius="25px"
      {...restProps}
    >
      <Flex alignItems="center" justifyContent="center">
        {children}
      </Flex>
      <Text fontSize="2xs" color="solid.darkGray">
        {desc}
      </Text>
    </Flex>
  );
};

export default TopCard;
