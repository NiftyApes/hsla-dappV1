import React from 'react';

import { Flex } from '@chakra-ui/react';

import { roundForDisplay } from 'helpers/roundForDisplay';
import { useActiveLoansForLender } from 'hooks/useActiveLoansForLender';
import { useAvailableEthLiquidity } from 'hooks/useEthLiquidity';
import { useTotalEthLoanedOut } from 'hooks/useTotalEthLoanedOut';
import { TopBarCard } from './components/TopBarCard';

const TopBar: React.FC = () => {
  const activeLoans = useActiveLoansForLender() || [];
  const defaultedLoans: number = activeLoans.filter(
    (loan: any) => loan.loanEndTimestamp * 1000 < Date.now(),
  ).length;

  const totalInterest: number = roundForDisplay(
    activeLoans.reduce((acc: number, val: { accruedInterest: number }) => {
      return acc + val.accruedInterest;
    }, 0),
  );

  const { totalEthLoanedOut } = useTotalEthLoanedOut();
  const { availableEthLiquidity } = useAvailableEthLiquidity();
  const utilizedLiquidityAsPercentage =
    (totalEthLoanedOut / (totalEthLoanedOut + availableEthLiquidity)) * 100;

  return (
    <Flex
      justifyContent="space-evenly"
      mb="2.5rem"
      borderRadius="25px"
      flexDir="row"
      p="23px"
    >
      <TopBarCard title="active loans" value={activeLoans.length.toString()} />
      <TopBarCard title="defaulted loans" value={defaultedLoans.toString()} />

      <TopBarCard
        title="total lent"
        value={`${roundForDisplay(totalEthLoanedOut || 0)}Ξ`}
      />

      <TopBarCard title="total interest accrued" value={`${totalInterest}Ξ`} />

      <TopBarCard
        title="total liquidty"
        value={`${availableEthLiquidity || 0}Ξ`}
      />

      <TopBarCard
        title="liquidty utilized"
        value={`${roundForDisplay(
          Number.isNaN(utilizedLiquidityAsPercentage)
            ? 0
            : utilizedLiquidityAsPercentage,
        )}%`}
      />
    </Flex>
  );
};

export default TopBar;
