import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

import CryptoIcon from 'components/atoms/CryptoIcon';
import TopCard from 'components/molecules/DashboardTopCard';
import { roundForDisplay } from 'helpers/roundForDisplay';
import { useActiveLoansForLender } from 'hooks/useActiveLoansForLender';
import { useAvailableEthLiquidity } from 'hooks/useEthLiquidity';
import { useTotalEthLoanedOut } from 'hooks/useTotalEthLoanedOut';

const TopBar: React.FC = () => {
  const activeLoans = useActiveLoansForLender();

  const { totalEthLoanedOut } = useTotalEthLoanedOut();
  const { availableEthLiquidity } = useAvailableEthLiquidity();

  return (
    <Flex justifyContent="space-evenly" flexWrap="wrap" gap="24px" p="18px">
      <TopCard desc="ACTIVE LOANS">
        <Text fontSize="7xl">{activeLoans?.length}</Text>
      </TopCard>
      <TopCard desc="DEFAULTED LOANS">
        <Text fontSize="7xl" color="notification.alert">
          {activeLoans?.filter((loan: any) => loan.loanEndTimestamp * 1000 < Date.now()).length}
        </Text>
      </TopCard>
      <TopCard desc="TOTAL BORROWED">
        <CryptoIcon symbol="eth" size={40} />
        <Text fontSize="7xl" ml="8px">
          {totalEthLoanedOut}Ξ
        </Text>
      </TopCard>
      <TopCard desc="TOTAL INTEREST ACCRUED">
        <CryptoIcon symbol="eth" size={40} />
        <Text fontSize="7xl" ml="8px">
          {activeLoans &&
            roundForDisplay(
              activeLoans.reduce((acc: number, val: { accruedInterest: number }) => {
                return acc + val.accruedInterest;
              }, 0),
            )}
        </Text>
      </TopCard>
      <TopCard desc="LIQUIDITY UTILIZED">
        <Text fontSize="7xl" ml="8px">
          {availableEthLiquidity &&
            roundForDisplay(
              (totalEthLoanedOut / (totalEthLoanedOut + availableEthLiquidity)) * 100,
            )}
          %
        </Text>
      </TopCard>
    </Flex>
  );
};

export default TopBar;
