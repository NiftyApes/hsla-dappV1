import React from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { Collapse, Flex, Text, useDisclosure } from '@chakra-ui/react';

interface Props {
  name: string;
  children: React.ReactNode | React.ReactNode[];
}

const CollapseWrapper: React.FC<Props> = ({ name, children }) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });

  return (
    <>
      <Flex
        alignItems="center"
        width="100%"
        justifyContent="space-between"
        padding="12px 12px 12px 26px"
        borderBottom="1px solid"
        borderColor="solid.gray5"
        cursor="pointer"
        mb="1rem"
        onClick={onToggle}
      >
        <Text fontSize="md" fontWeight="bold">
          {name}
        </Text>
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        {children}
      </Collapse>
    </>
  );
};

export default CollapseWrapper;
