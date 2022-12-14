/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  SimpleGrid,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { QuestionOutlineIcon, ArrowForwardIcon } from '@chakra-ui/icons';
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
  loanInformation: 'rollover info',
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
            <TableContainer>
              <Table variant="simple">
                <Tbody>
                  <Tr>
                    <Td
                      fontSize="14"
                      textTransform="uppercase"
                      color="gray.600"
                    >
                      current
                    </Td>
                    <Td>
                      <Flex alignItems="center" gap="2">
                        <CryptoIcon symbol="eth" size={24} />
                        <Text>25.50</Text>
                      </Flex>
                    </Td>
                    <Td>30 days</Td>
                    <Td>13.37</Td>
                    <Td />
                  </Tr>
                  <Tr>
                    <Td
                      fontSize="14"
                      textTransform="uppercase"
                      color="gray.600"
                    >
                      rollover
                    </Td>
                    <Td>
                      <Flex alignItems="center" gap="2">
                        <CryptoIcon symbol="eth" size={24} />
                        <Text>20.0</Text>
                      </Flex>
                    </Td>
                    <Td>30 days</Td>
                    <Td>13.37</Td>
                    <Td>
                      <Button
                        variant="link"
                        textTransform="uppercase"
                        colorScheme="purple"
                        fontSize="14"
                      >
                        swap
                      </Button>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            <Box
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
                        25.5Ξ
                      </Text>
                      <ArrowForwardIcon />
                      <Text fontSize="18" fontWeight="bold" color="#15e9a7">
                        20.0Ξ
                      </Text>
                    </Flex>
                    <Text color="gray.600" fontSize="14">
                      Principle Change
                    </Text>
                  </Flex>
                </Box>
                <Box>
                  <Flex alignItems="center" flexDirection="column">
                    <Text fontSize="18" fontWeight="bold">
                      5.07433Ξ
                    </Text>
                    <Text color="gray.600" fontSize="14">
                      Payment Due Now
                    </Text>
                  </Flex>
                </Box>
                <Box>
                  <Flex alignItems="center" flexDirection="column">
                    <Text fontSize="18" fontWeight="bold">
                      12:24 PM 02/23/24
                    </Text>
                    <Text color="gray.600" fontSize="14">
                      Next Payment Due
                    </Text>
                  </Flex>
                </Box>
              </Flex>
            </Box>
            <Divider marginY={4} borderColor="gray.400" />
            <Flex
              marginX="4"
              justifyContent="space-between"
              alignItems="center"
            >
              <Flex alignItems="center">
                <CryptoIcon symbol="eth" size={24} />
                <Text ml="4px" mr="14px" color="solid.gray0" fontWeight="bold">
                  ETH
                </Text>
                <Text fontSize="3.5xl" noOfLines={1} maxWidth="200px">
                  {formatEther(totalOwed)}Ξ
                </Text>
              </Flex>
              <Button
                borderWidth="2px"
                borderRadius="15"
                variant="outline"
                colorScheme="purple"
                padding="6"
              >
                Make Payment
              </Button>
            </Flex>
          </Box>
        </Flex>
        <Button
          marginTop={4}
          marginBottom={1}
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
    </Box>
  );
};
export default BorrowLoanRolloverCard;
