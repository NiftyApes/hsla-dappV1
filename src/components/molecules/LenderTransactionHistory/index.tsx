import { Box } from '@chakra-ui/react';
import { TransactionTable } from './TransactionTable';

export const LenderTransactionHistory: React.FC = () => {
  return (
    <Box maxW="1600px" minW="700px">
      <TransactionTable />
    </Box>
  );
};
