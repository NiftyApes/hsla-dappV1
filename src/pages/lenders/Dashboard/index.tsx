import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';

import CryptoIcon from 'components/atoms/CryptoIcon';
import TopCard from 'components/molecules/DashboardTopCard';
import { useActiveLoansForLender } from 'hooks/useActiveLoansForLender';
import LoansTable from './LoansTable';

const Dashboard: React.FC = () => {
  const activeLoans = useActiveLoansForLender();
  return (
    <Box>
      {JSON.stringify(activeLoans, void 0, 2)}
      <Flex justifyContent="space-evenly" flexWrap="wrap" gap="24px" p="18px">
        <TopCard desc="ACTIVE LOAN">
          <Text fontSize="7xl">1</Text>
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
            0.026..Ξ
          </Text>
        </TopCard>
        <TopCard desc="NEXT PAYMENT DUE">
          <Text fontSize="5xl">⏰ 119 days, 23 hours, 59 minutes</Text>
        </TopCard>
      </Flex>
      <LoansTable />
    </Box>
  );
};

export default Dashboard;
