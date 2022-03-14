import { Box, BoxProps, Button, Flex, Text } from '@chakra-ui/react';
import React from 'react';

import Icon from 'components/atoms/Icon';
import Collections from './Collections';
import LoanParameters from './LoanParameters';

interface Props extends BoxProps {
  onHide(): void;
}

export const FILTER_SIDEBAR_WIDTH = 351;

const FilterSidebar: React.FC<Props> = ({ onHide, ...restProps }) => {
  return (
    <Box
      w={FILTER_SIDEBAR_WIDTH}
      bg="linear-gradient(0deg, #FAFAFA, #FAFAFA), #FFFFFF"
      boxShadow="0px 4px 24px rgba(73, 16, 146, 0.02)"
      borderRadius="0px 15px 15px 0px"
      pb="20px"
      {...restProps}
    >
      {/* Header */}
      <Flex p="17px 21px 30px 27px" alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Icon name="sliders" color="solid.darkGray" mr="8px" />
          <Text fontSize="lg" fontWeight="bold" mr="9px">
            FILTERS
          </Text>
          <Button variant="secondary" size="sm">
            Reset Filters
          </Button>
        </Flex>
        <Button variant="link" onClick={onHide}>
          <Icon name="arrow-left" color="gray.100" />
        </Button>
      </Flex>
      <Box pr="24px">
        <Collections />
        <LoanParameters />
      </Box>
    </Box>
  );
};

export default FilterSidebar;
