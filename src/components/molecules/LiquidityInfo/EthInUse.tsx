import { Box } from '@chakra-ui/react';
import { useTotalEthLoanedOut } from 'hooks/useTotalEthLoanedOut';

export const EthInUse: React.FC = () => {
  const { totalEthLoanedOut } = useTotalEthLoanedOut();

  return (
    <Box>
      In Use
      {totalEthLoanedOut}
    </Box>
  );
};
