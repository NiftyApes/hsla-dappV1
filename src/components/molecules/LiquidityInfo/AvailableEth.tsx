import { Box } from '@chakra-ui/react';
import { useAvailableEthLiquidity } from 'hooks/useEthLiquidity';

export const AvailableEth: React.FC = () => {
  const { ethLiquidity } = useAvailableEthLiquidity();

  return <Box>AvailableETH: {ethLiquidity}</Box>;
};
