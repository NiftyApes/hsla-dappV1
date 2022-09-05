import { Box, Center } from '@chakra-ui/react';
import { TransactionTable } from './TransactionTable';

export const LenderTransactionHistory: React.FC = () => {
  return (
    <Center>
      <Box maxW="1600px" minW="700px">
        <TransactionTable />
      </Box>
    </Center>
  );
};
