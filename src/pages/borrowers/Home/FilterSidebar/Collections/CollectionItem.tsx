import { Avatar, Flex, Text } from '@chakra-ui/react';
import React from 'react';

type Props = {
  img?: string;
  count: number;
  name: string;
};

const CollectionItem: React.FC<Props> = ({ img, count, name }) => {
  return (
    <Flex alignItems="center" overflow="hidden">
      <Avatar name={name} src={img} mr="12px" />
      <Text fontSize="md" fontWeight="bold" isTruncated>
        ({count}) {name}
      </Text>
    </Flex>
  );
};

export default CollectionItem;
