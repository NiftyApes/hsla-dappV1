import { Box } from '@chakra-ui/react';
import { useActiveLoansForLender } from 'hooks/useActiveLoansForLender';
import { useAvailableEthLiquidity } from 'hooks/useEthLiquidity';
import { useTotalEthLoanedOut } from 'hooks/useTotalEthLoanedOut';

export const TotalEth: React.FC = () => {
  const activeLoans = useActiveLoansForLender();

  const { totalEthLoanedOut } = useTotalEthLoanedOut();

  const { ethLiquidity } = useAvailableEthLiquidity();

  return <Box>Total: {Number(ethLiquidity) + totalEthLoanedOut}</Box>;
};
