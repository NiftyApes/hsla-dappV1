import React from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { Button, Collapse, Flex, Text, useDisclosure } from '@chakra-ui/react';

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
        justifyContent="space-between"
        padding="12px 12px 12px 26px"
        bg="accents.100"
        borderRadius="0px 10px 10px 0px"
      >
        <Text fontSize="md" fontWeight="bold">
          {name}
        </Text>
        <Button variant="link" color="solid.darkGray" onClick={onToggle}>
          {isOpen ? <FiChevronUp /> : <FiChevronDown />}
        </Button>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        {children}
      </Collapse>
    </>
  );
};

export default CollapseWrapper;
