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
      bg="solid.white"
      p="23px"
      borderRadius="25px"
      boxShadow="0px 4px 24px 0px #4910921A"
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
