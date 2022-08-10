import { Box, Center } from '@chakra-ui/react';
import LoadingIndicator from 'components/atoms/LoadingIndicator';

export const LiquidityInfoLoading: React.FC = () => {
  return (
    <Center fontSize="24px" my="5rem">
      Loading liquidity information{' '}
      <Box ml="3rem">
        <LoadingIndicator />
      </Box>
    </Center>
  );
};
