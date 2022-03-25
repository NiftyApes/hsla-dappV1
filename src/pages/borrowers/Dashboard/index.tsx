import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

import TopCard from './TopCard';
import CryptoIcon from 'components/atoms/CryptoIcon';
import LoanTable from './LoanTable';

const Dashboard: React.FC = () => {
  return (
    <Box>
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
      <LoanTable />
    </Box>
  );
};

export default Dashboard;
