import React from 'react';
import { Flex, FlexProps, Spinner } from '@chakra-ui/react';

interface Props extends FlexProps {
  fullScreen?: boolean;
}

const LoadingIndicator: React.FC<Props> = ({ fullScreen = false, ...restProps }) =>
  fullScreen ? (
    <Flex width="100%" height="100%" justifyContent="center" alignItems="center" {...restProps}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="primary.purple"
        size="xl"
      />
    </Flex>
  ) : (
    <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="primary.purple" size="xl" />
  );

export default LoadingIndicator;
