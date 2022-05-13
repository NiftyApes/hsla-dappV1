import { Checkbox, Flex, Text } from '@chakra-ui/react';
import React from 'react';

type Props = {
  img?: string;
  count: number;
  name: string;
};

const CollectionItem: React.FC<Props> = ({ img, count, name }) => {
  return (
    <Flex alignItems="center" overflow="hidden">
      {/* 
      TODO: Fix overflow w/ block-inline, let DOM elements flow naturally
      <Avatar name={name} src={img} mr="12px" /> */}
      <Checkbox mr="16px" defaultChecked>
        <Text fontSize="md" fontWeight="bold" isTruncated>
          ({count}) {name}
        </Text>
      </Checkbox>
    </Flex>
  );
};

export default CollectionItem;
