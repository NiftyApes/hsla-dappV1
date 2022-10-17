import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

import { roundForDisplay } from 'helpers/roundForDisplay';
import { useActiveLoansForLender } from 'hooks/useActiveLoansForLender';
import { useAvailableEthLiquidity } from 'hooks/useEthLiquidity';
import { useTotalEthLoanedOut } from 'hooks/useTotalEthLoanedOut';

const TopBar: React.FC = () => {
  const activeLoans = useActiveLoansForLender();

  const { totalEthLoanedOut } = useTotalEthLoanedOut();
  const { availableEthLiquidity } = useAvailableEthLiquidity();

  return (
    <Flex
      justifyContent="space-evenly"
      mb="2.5rem"
      borderRadius="25px"
      flexDir="row"
      p="23px"
    >
      <Flex flexDir="column" alignItems="center">
        <Text fontSize="7xl">{activeLoans?.length}</Text>
        <Text fontSize="2xs" color="solid.darkGray">
          ACTIVE LOANS
        </Text>
      </Flex>
      <Flex flexDir="column" alignItems="center">
        <Text fontSize="7xl">
          {
            activeLoans?.filter(
              (loan: any) => loan.loanEndTimestamp * 1000 < Date.now(),
            ).length
          }
        </Text>
        <Text fontSize="2xs" color="solid.darkGray">
          DEFAULTED LOANS
        </Text>
      </Flex>
      <Flex flexDir="column" alignItems="center">
        <Flex alignItems="center" justifyContent="center">
          <Text fontSize="7xl" ml="8px">
            {totalEthLoanedOut && roundForDisplay(totalEthLoanedOut)}Ξ
          </Text>
        </Flex>
        <Text fontSize="2xs" color="solid.darkGray">
          TOTAL LENT
        </Text>
      </Flex>
      <Flex flexDir="column" alignItems="center">
        <Flex alignItems="center" justifyContent="center">
          <Text fontSize="7xl" ml="8px">
            {activeLoans &&
              roundForDisplay(
                activeLoans.reduce(
                  (acc: number, val: { accruedInterest: number }) => {
                    return acc + val.accruedInterest;
                  },
                  0,
                ),
              )}
            Ξ
          </Text>
        </Flex>
        <Text fontSize="2xs" color="solid.darkGray">
          TOTAL INTEREST ACCRUED
        </Text>
      </Flex>

      <Flex flexDir="column" alignItems="center">
        <Text fontSize="7xl" ml="8px">
          {availableEthLiquidity &&
            roundForDisplay(
              (totalEthLoanedOut /
                (totalEthLoanedOut + availableEthLiquidity)) *
                100,
            )}
          %
        </Text>
        <Text fontSize="2xs" color="solid.darkGray">
          LIQUIDITY UTILIZED
        </Text>
      </Flex>
    </Flex>
  );
};

export default TopBar;
