import React, { useState } from 'react';
import { Box, Button, Divider, Flex, Text, useToast } from '@chakra-ui/react';
import CryptoIcon from 'components/atoms/CryptoIcon';
import { useRepayLoanByBorrower } from '../../../hooks/useRepayLoan';

import { LoanAuction } from '../../../loan';
import { NFT } from '../../../nft';
import { formatEther } from 'ethers/lib/utils';
import { humanizeContractError } from '../../../helpers/errorsMap';
import LoadingIndicator from '../../atoms/LoadingIndicator';
import { useCalculateInterestAccrued } from '../../../hooks/useCalculateInterestAccrued';
import { BigNumber } from 'ethers';
import moment from 'moment';
import { getAPR } from '../../../helpers/getAPR';
import { roundForDisplay } from '../../../helpers/roundForDisplay';

interface Props {
  loan: LoanAuction;
  nft: NFT;
}

const i18n = {
  actionButton: 'repay loan',
  footerText: 'Paying this will close the loan out and unlock your asset from escrow.',
  loanApr: (val: number) => `Loan APR ${roundForDisplay(val)}%`,
  loanBorrowed: (val: string) => `Total borrowed ${val}Ξ`,
  loanInterest: (val: string) => `Total interest ${val}Ξ`,
  loanOwed: (val: string) => `Total owed ${val}Ξ`,
  loanTimeRemaining: (distance: string) => `Time remaining ${distance}`,
  paymentType: 'max payment',
  terms: 'deal terms',
  toastSuccess: 'Loan repaid successfully',
};

const BorrowLoanRepayCard: React.FC<Props> = ({ nft, loan }) => {
  const toast = useToast();

  const [isExecuting, setExecuting] = useState<boolean>(false);

  const accruedInterest: Array<BigNumber> = useCalculateInterestAccrued({
    nftContractAddress: nft.contractAddress,
    nftId: nft.id,
  });

  const { amount, interestRatePerSecond, loanEndTimestamp } = loan;

  const loanAmount: BigNumber = BigNumber.from(amount);
  const totalAccruedInterest: BigNumber = accruedInterest
    ? accruedInterest[0].add(accruedInterest[1])
    : BigNumber.from(0);

  // Additional 20 minutes worth of interest
  const padding: BigNumber = BigNumber.from(interestRatePerSecond * 1200);
  const totalOwed: BigNumber = loanAmount.add(totalAccruedInterest).add(padding);
  const apr = getAPR({ amount, interestRatePerSecond });

  const timeRemaining = moment(loanEndTimestamp * 1000).toNow(true);

  const { repayLoanByBorrower } = useRepayLoanByBorrower({
    nftContractAddress: nft.contractAddress,
    nftId: nft.id,
    amount: totalOwed,
  });

  const onRepayLoan = async () => {
    if (repayLoanByBorrower) {
      setExecuting(true);

      await repayLoanByBorrower()
        .then(() => {
          toast({
            title: i18n.toastSuccess,
            status: 'success',
            position: 'top-right',
            isClosable: true,
          });
          setExecuting(false);
        })
        .catch((error) => {
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
      <Flex flexDir="column" width="100%" p="10px">
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
              {i18n.terms}
            </Text>
          </Box>
          <Box p="10px">
            <Text>{i18n.loanTimeRemaining(timeRemaining)}</Text>
            <Text>{i18n.loanApr(apr)}</Text>
            <Text>{i18n.loanBorrowed(formatEther(amount))}</Text>
            <Text>{i18n.loanInterest(formatEther(totalAccruedInterest))}</Text>
            <Text fontWeight="bold">{i18n.loanOwed(formatEther(totalOwed))}</Text>
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
            colorScheme="orange"
            onClick={onRepayLoan}
            py="6px"
            size="lg"
            textTransform="uppercase"
            variant="neutralReverse"
            w="100%"
          >
            {isExecuting ? <LoadingIndicator size="xs" /> : i18n.actionButton}
          </Button>
        </Flex>

        <Text mt="20px" fontSize="lg" color="solid.gray0" w="100%" textAlign="center">
          {i18n.footerText}
        </Text>
      </Flex>
    </Box>
  );
};

export default BorrowLoanRepayCard;