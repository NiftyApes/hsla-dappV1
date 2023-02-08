import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Flex, Text } from '@chakra-ui/react';
import { formatEther } from '@ethersproject/units';
import {
  gasGriefingPremiumBps,
  MAX_BPS,
  originationPremiumBps,
} from 'constants/protocolValues';
import { BigNumber, ethers } from 'ethers';
import { roundForDisplay } from 'helpers/roundForDisplay';
import { useCalculateInterestAccrued } from 'hooks/useCalculateInterestAccrued';
import { LoanAuction, LoanOffer } from 'loan';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';

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

  const rolloverOfferAmountInEth = useMemo(() => {
    return ethers.utils.formatEther(
      BigNumber.from(String(offer.OfferTerms.Amount)),
    );
  }, [offer.OfferTerms.Amount]);

  const principalChangeColor = useMemo(() => {
    if (rolloverOfferAmountInEth > formatEther(loan.amountDrawn))
      return '#15e9a7';
    return '#000000';
  }, [rolloverOfferAmountInEth, loan.amountDrawn]);

  const currentPrincipalInEth = parseFloat(formatEther(loan.amountDrawn));

  const {
    amountDrawn,
    interestRatePerSecond: irps,
    accumulatedLenderInterest,
  } = loan;

  const accruedInterest: Array<BigNumber> = useCalculateInterestAccrued({
    nftContractAddress: loan.nftContractAddress,
    nftId: loan.nftId,
  });

  let totalAccruedInterest: BigNumber = accruedInterest
    ? accruedInterest[0].add(accruedInterest[1])
    : BigNumber.from(0);

  const gasGriefingMinimum: BigNumber = amountDrawn
    .mul(gasGriefingPremiumBps)
    .div(MAX_BPS);

  const earlyReplay = totalAccruedInterest.lt(gasGriefingMinimum);

  if (earlyReplay) {
    totalAccruedInterest = gasGriefingMinimum;
  }

  // Currently, if you make a prepayment, you get an additional 25 basis points
  // added to accumulatedLenderInterest which the refinance must pay
  const prepayGasGriefingPenaltyInWei = earlyReplay
    ? gasGriefingMinimum
    : BigNumber.from(0);

  const totalAccruedInterestInWei: BigNumber = totalAccruedInterest;

  const totalAccruedInterestInEth = parseFloat(
    formatEther(totalAccruedInterestInWei),
  );

  const oneHourInterestPaddingInWei: BigNumber = irps.mul(3600);

  const deltaCalculationInEth = useMemo(() => {
    const rolloverPrincipalInEth = parseFloat(rolloverOfferAmountInEth);

    const oneHourInterestPaddingInEth = parseFloat(
      formatEther(oneHourInterestPaddingInWei),
    );

    const originationFeeInEth =
      (currentPrincipalInEth * originationPremiumBps) / MAX_BPS;

    const accumulatedLenderInterestInEth = parseFloat(
      formatEther(accumulatedLenderInterest),
    );

    const fiveMinutesInterestPaddingInEth = oneHourInterestPaddingInEth / 12;

    // If rollover principal can pay for all old loan stuff + 5 minutes of interest,
    // then no delta
    if (
      rolloverPrincipalInEth >=
      currentPrincipalInEth +
        accumulatedLenderInterestInEth +
        totalAccruedInterestInEth +
        originationFeeInEth +
        fiveMinutesInterestPaddingInEth
    ) {
      return 0;
    }

    // Otherwise, return delta equal to all old loan stuff + 60 minutes of interest
    return (
      currentPrincipalInEth +
      accumulatedLenderInterestInEth +
      totalAccruedInterestInEth +
      originationFeeInEth +
      oneHourInterestPaddingInEth -
      rolloverPrincipalInEth
    );
  }, [
    currentPrincipalInEth,
    accumulatedLenderInterest,
    totalAccruedInterestInEth,
    rolloverOfferAmountInEth,
    oneHourInterestPaddingInWei,
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
                {roundForDisplay(Number(rolloverOfferAmountInEth))}Ξ
              </Text>
            </Flex>
            <Text color="gray.600" fontSize="14">
              Change to Max
            </Text>
          </Flex>
        </Box>
        <Box>
          <Flex alignItems="center" flexDirection="column">
            <Text fontSize="18" fontWeight="bold">
              {deltaCalculationInEth === 0
                ? 0
                : roundForDisplay(
                    Number(
                      ethers.utils.formatEther(prepayGasGriefingPenaltyInWei),
                    ) + deltaCalculationInEth,
                  )}
              Ξ
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
