import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Flex, Text } from '@chakra-ui/react';
import { formatEther } from '@ethersproject/units';
import { roundForDisplay } from 'helpers/roundForDisplay';
import { LoanAuction, LoanOffer } from 'loan';
import { BigNumber, ethers } from 'ethers';
import { useCalculateInterestAccrued } from 'hooks/useCalculateInterestAccrued';

const DATE_FORMAT = 'hh:mm A MM/DD/YY';
const MOMENT_INTERVAL_MS = 60000;

interface RolloverLoanVisualProps {
  loan: LoanAuction;
  offer: LoanOffer;
}

const RolloverLoanVisual: React.FC<RolloverLoanVisualProps> = ({
  loan,
  offer,
}) => {
  const [nextPaymentDue, setNextPaymentDue] = useState(
    moment().add(offer.durationDays, 'days').format(DATE_FORMAT),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setNextPaymentDue(
        moment().add(offer.durationDays, 'days').format(DATE_FORMAT),
      );
    }, MOMENT_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [offer.durationDays]);

  const rolloverOfferAmount = useMemo(() => {
    return ethers.utils.formatEther(
      BigNumber.from(String(offer.OfferTerms.Amount)),
    );
  }, [offer.OfferTerms.Amount]);

  const principalChangeColor = useMemo(() => {
    if (rolloverOfferAmount > formatEther(loan.amountDrawn)) return '#15e9a7';
    return '#000000';
  }, [rolloverOfferAmount, loan.amountDrawn]);

  const currentPrincipal = parseFloat(formatEther(loan.amountDrawn));

  const { amountDrawn, interestRatePerSecond: irps } = loan;
  const accruedInterest: Array<BigNumber> = useCalculateInterestAccrued({
    nftContractAddress: loan.nftContractAddress,
    nftId: loan.nftId,
  });
  let totalAccruedInterest: BigNumber = accruedInterest
    ? accruedInterest[0].add(accruedInterest[1])
    : BigNumber.from(0);
  const basisPoints: BigNumber = amountDrawn.mul(25).div(10000);
  const earlyReplay = totalAccruedInterest.lt(basisPoints);
  if (earlyReplay) {
    totalAccruedInterest = basisPoints;
  }
  const totalAccruedInterestInWei: BigNumber = totalAccruedInterest;
  const totalAccruedInterestInEth = parseFloat(
    formatEther(totalAccruedInterestInWei),
  );

  const padding: BigNumber = irps.mul(3600);
  const deltaCalculation = useMemo(() => {
    const rolloverPrincipal = parseFloat(rolloverOfferAmount);

    const paddingInEth = parseFloat(formatEther(padding)) + 0.01;

    if (rolloverPrincipal >= currentPrincipal + totalAccruedInterestInEth) {
      return 0;
    }

    return (
      currentPrincipal +
      totalAccruedInterestInEth +
      paddingInEth -
      rolloverPrincipal
    );
  }, [
    currentPrincipal,
    totalAccruedInterestInEth,
    rolloverOfferAmount,
    padding,
  ]);

  return (
    <Box
      width="100%"
      marginX="3"
      marginTop="4"
      padding="6"
      border="1px solid rgba(101, 101, 101, 0.2)"
      bg="rgba(101, 101, 101, 0.1)"
      borderRadius="15"
    >
      <Flex justifyContent="space-between" flexDirection="row">
        <Box>
          <Flex alignItems="center" flexDirection="column">
            <Flex gap="1" direction="row" alignItems="center">
              <Text fontSize="18" fontWeight="bold">
                {roundForDisplay(Number(formatEther(loan.amountDrawn)))}Ξ
              </Text>
              <ArrowForwardIcon />
              <Text
                fontSize="18"
                fontWeight="bold"
                color={principalChangeColor}
              >
                {roundForDisplay(
                  currentPrincipal +
                    totalAccruedInterestInEth -
                    deltaCalculation,
                )}
                Ξ
              </Text>
            </Flex>
            <Text color="gray.600" fontSize="14">
              Principal Change
            </Text>
          </Flex>
        </Box>
        <Box>
          <Flex alignItems="center" flexDirection="column">
            <Text fontSize="18" fontWeight="bold">
              {roundForDisplay(deltaCalculation)}Ξ
            </Text>
            <Text color="gray.600" fontSize="14">
              Payment Due Now
            </Text>
          </Flex>
        </Box>
        <Box>
          <Flex alignItems="center" flexDirection="column">
            <Text fontSize="18" fontWeight="bold">
              {nextPaymentDue}
            </Text>
            <Text color="gray.600" fontSize="14">
              Next Payment Due
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default RolloverLoanVisual;
