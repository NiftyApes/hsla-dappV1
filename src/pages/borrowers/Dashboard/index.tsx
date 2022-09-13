import { Box, Center, Flex, Text } from '@chakra-ui/react';
import React from 'react';

import CryptoIcon from 'components/atoms/CryptoIcon';
import TopCard from 'components/molecules/DashboardTopCard';
import LoadingIndicator from '../../../components/atoms/LoadingIndicator';
import { useActiveLoansForBorrower } from '../../../hooks/useActiveLoansForBorrower';
import LoanTable from './LoanTable';

const Dashboard: React.FC = () => {
  const activeLoans = useActiveLoansForBorrower();
  const loanCount = activeLoans?.length;
  const loanTotal = activeLoans?.reduce((acc: any, loan: any) => {
    return acc + loan.amount;
  }, 0);

  if (activeLoans === 'undefined') {
    return (
      <Center>
        <LoadingIndicator />
      </Center>
    );
  }

  return (
    <Box>
      <Flex justifyContent="space-evenly" flexWrap="wrap" gap="24px" p="18px">
        <TopCard desc="ACTIVE LOAN">
          <Text fontSize="7xl">{loanCount}</Text>
        </TopCard>
        <TopCard desc="TOTAL BORROWED">
          <CryptoIcon symbol="eth" size={40} />
          <Text fontSize="7xl" ml="8px">
            25.50Ξ
          </Text>
        </TopCard>
        <TopCard desc="TOTAL INTEREST OWED">
          <CryptoIcon symbol="eth" size={40} />
          <Text fontSize="7xl" ml="8px">
            {loanTotal}Ξ
          </Text>
        </TopCard>
        <TopCard desc="NEXT PAYMENT DUE">
          <Text fontSize="5xl">⏰ 119 days, 23 hours, 59 minutes</Text>
        </TopCard>
      </Flex>
      <LoanTable />
    </Box>
  );
};

export default Dashboard;
