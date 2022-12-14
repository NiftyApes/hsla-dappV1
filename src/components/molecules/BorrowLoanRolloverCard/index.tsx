import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  Text,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';

import { QuestionOutlineIcon } from '@chakra-ui/icons';
import CryptoIcon from 'components/atoms/CryptoIcon';
import { ToastSuccessCard } from 'components/cards/ToastSuccessCard';
import { ACTIONS, CATEGORIES, LABELS } from 'constants/googleAnalytics';
import { BigNumber } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import { useAnalyticsEventTracker } from 'hooks/useAnalyticsEventTracker';
import JSConfetti from 'js-confetti';
import { logError } from 'logging/logError';
import moment from 'moment';
import { humanizeContractError } from '../../../helpers/errorsMap';
import { getAPR } from '../../../helpers/getAPR';
import {
  getLoanTimeRemaining,
  isLoanDefaulted,
} from '../../../helpers/getDuration';
import {
  concatForDisplay,
  roundForDisplay,
} from '../../../helpers/roundForDisplay';
import { useCalculateInterestAccrued } from '../../../hooks/useCalculateInterestAccrued';
import { useRepayLoanByBorrower } from '../../../hooks/useRepayLoan';
import { LoanAuction } from '../../../loan';
import LoadingIndicator from '../../atoms/LoadingIndicator';

interface CallbackType {
  (): void;
}

interface Props {
  loan: LoanAuction;
  onRollover: CallbackType;
}

const i18n = {
  actionButton: 'rollover loan',
  footerText: 'Next payment due 📅 ',
  loanApr: 'Loan APR',
  loanBorrowed: 'Total borrowed',
  loanInformation: 'rollover information',
  loanInterest: 'Interest owed ',
  loanOwed: 'Total Owed',
  loanDefaulted: 'Loan Defaulted',
  loanActive: 'Time Remaining',
  paymentType: 'max payment',
  toastSuccess: 'Loan repaid successfully',
};

const BorrowLoanRolloverCard: React.FC<Props> = ({ loan, onRollover }) => {
  const gaEventTracker = useAnalyticsEventTracker(CATEGORIES.BORROWERS);
  const toast = useToast();

  const jsConfetti = new JSConfetti();
  const [isExecuting, setExecuting] = useState<boolean>(false);

  const accruedInterest: Array<BigNumber> = useCalculateInterestAccrued({
    nftContractAddress: loan.nftContractAddress,
    nftId: loan.nftId,
  });

  const { amount, interestRatePerSecond: irps } = loan;

  // Note: When running this on a local chain, the interest will be 0 until a new block is created.
  // Simply create a new transaction and the correct amount of interest will show up
  let totalAccruedInterest: BigNumber = accruedInterest
    ? accruedInterest[0].add(accruedInterest[1])
    : BigNumber.from(0);

  // 25 basis points of the total amount
  const basisPoints: BigNumber = amount.mul(25).div(10000);

  // Add basis points if total interest is less than
  const earlyReplay = totalAccruedInterest.lt(basisPoints);

  if (earlyReplay) {
    totalAccruedInterest = basisPoints;
  }

  // Minimum interest owed 0.0025

  // Additional 20 minutes worth of interest
  const padding: BigNumber = irps.mul(3600);
  const totalOwed: BigNumber = amount.add(totalAccruedInterest).add(padding);
  const apr = getAPR({
    amount: Number(amount.toString()),
    interestRatePerSecond: irps.toNumber(),
  });

  const { repayLoanByBorrower } = useRepayLoanByBorrower({
    nftContractAddress: loan.nftContractAddress,
    nftId: loan.nftId,
    amount: totalOwed,
  });

  const onRepayLoan = async () => {
    if (repayLoanByBorrower) {
      setExecuting(true);

      await repayLoanByBorrower()
        .then(({ receipt }: any) => {
          jsConfetti.addConfetti({
            emojis: ['🍌'],
            emojiSize: 80,
            confettiNumber: 50,
          });

          gaEventTracker(ACTIONS.LOAN, LABELS.REPAY);

          toast({
            render: (props) => (
              <ToastSuccessCard
                title={i18n.toastSuccess}
                txn={receipt}
                {...props}
              />
            ),
            position: 'top-right',
            duration: 9000,
            isClosable: true,
          });
          setExecuting(false);
          onRollover();
        })
        .catch((error) => {
          logError(error);
          toast({
            title: `Error: ${humanizeContractError(error.reason)}`,
            status: 'error',
            position: 'top-right',
            isClosable: true,
          });
          setExecuting(false);
        });
    }
  };

  return (
    <Box>
      <Flex flexDir="column" width="100%" p="5px">
        <Flex
          width="100%"
          flexDir="column"
          border="1px solid rgba(101, 101, 101, 0.2)"
          borderRadius="15px"
        >
          <Box
            borderBottom="1px solid"
            borderColor="rgba(101, 101, 101, 0.2)"
            bg="white"
            borderRadius="15px 15px 0 0"
            textAlign="center"
            w="100%"
          >
            <Text color="solid.gray0" textTransform="uppercase">
              {i18n.loanInformation}
            </Text>
          </Box>
          <Box p="10px">
            <Center mb="10px" mt="10px">
              <Text fontWeight="bold" fontSize="2.5xl">
                {i18n.loanOwed} {formatEther(totalOwed)}Ξ
              </Text>
            </Center>

            <Grid
              gridTemplateColumns="repeat(2, minmax(0, 1fr))"
              gridColumnGap="20px"
              w="100%"
              borderColor="solid.lightPurple"
              textAlign="left"
              bgColor="solid.white"
            >
              <GridItem>
                <Text>
                  {isLoanDefaulted(loan) ? i18n.loanDefaulted : i18n.loanActive}
                  {!isLoanDefaulted(loan) && (
                    <Text as="span" fontWeight="bold">
                      &nbsp;{getLoanTimeRemaining(loan)}
                    </Text>
                  )}
                </Text>
                <Text>
                  {i18n.loanApr}&nbsp;
                  <Text as="span" fontWeight="bold">
                    {roundForDisplay(apr)}%
                  </Text>
                </Text>
              </GridItem>

              <GridItem>
                <Text>
                  {i18n.loanBorrowed}{' '}
                  <Text as="span" fontWeight="bold">
                    {concatForDisplay(formatEther(amount))}Ξ
                  </Text>
                </Text>
                <Text>
                  {i18n.loanInterest}
                  <Text as="span" fontWeight="bold">
                    {concatForDisplay(
                      formatEther(totalAccruedInterest.toString()),
                    )}
                    Ξ
                  </Text>
                  {earlyReplay && (
                    <Tooltip
                      hasArrow
                      textAlign="center"
                      label="All loans are subject to a minimum of 00.25% interest."
                    >
                      <QuestionOutlineIcon
                        sx={{ ml: '5px', mt: '-3px' }}
                        color="gray.500"
                      />
                    </Tooltip>
                  )}
                </Text>
              </GridItem>
            </Grid>
          </Box>
        </Flex>

        <Flex
          width="100%"
          flexDir="column"
          border="1px solid rgba(101, 101, 101, 0.2)"
          bg="rgba(234, 217, 255, 0.2)"
          borderRadius="15px"
          mt="16px"
          p="20px 16px"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Flex alignItems="center">
              <CryptoIcon symbol="eth" size={24} />
              <Text ml="4px" mr="14px" color="solid.gray0" fontWeight="bold">
                ETH
              </Text>
              <Text fontSize="3.5xl" noOfLines={1} width="330px">
                {formatEther(totalOwed)}Ξ
              </Text>
            </Flex>
            <Text fontSize="sm" color="solid.gray0" textTransform="uppercase">
              {i18n.paymentType}
            </Text>
          </Flex>

          <Divider mt="20px" mb="15px" color="accents.100" />
          <Button
            borderRadius="8px"
            colorScheme="green"
            backgroundColor="#15e9a7"
            onClick={onRepayLoan}
            py="6px"
            size="lg"
            textTransform="uppercase"
            variant="solid"
            w="100%"
          >
            {isExecuting ? <LoadingIndicator size="xs" /> : i18n.actionButton}
          </Button>
        </Flex>

        <Text mt="20px" fontSize="md" w="100%" textAlign="center">
          {i18n.footerText}{' '}
          <span>
            {moment(new Date()).add(30, 'days').format('MMM DD, YYYY')}
          </span>
        </Text>
      </Flex>
    </Box>
  );
};
export default BorrowLoanRolloverCard;
