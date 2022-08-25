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

interface Props {
  loan: LoanAuction;
  nft: NFT;
}

const i18n = {
  toastSuccess: 'Loan repaid successfully',
  actionButton: 'repay loan',
  paymentType: 'max payment',
};

const BorrowLoanRepayCard: React.FC<Props> = ({ nft, loan }) => {
  const toast = useToast();

  const [isExecuting, setExecuting] = useState<boolean>(false);

  const accruedInterest: Array<BigNumber> = useCalculateInterestAccrued({
    nftContractAddress: nft.contractAddress,
    nftId: nft.id,
  });

  const loanAmount: BigNumber = BigNumber.from(loan.amount);
  const totalAccruedInterest: BigNumber = accruedInterest
    ? accruedInterest[0].add(accruedInterest[1])
    : BigNumber.from(0);
  // Additional 20 minutes worth of interest
  const padding: BigNumber = BigNumber.from(loan.interestRatePerSecond * 1200);
  const totalOwed: BigNumber = loanAmount.add(totalAccruedInterest).add(padding);

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
        <Text fontSize="md" color="solid.gray0">
          Repay the full loan amount to unlock your asset
        </Text>
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
              <Text fontSize="3.5xl">{formatEther(loan.amount)}Ξ</Text>
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
        <Text mt="20px" fontSize="lg" fontWeight="bold">
          This is the total amount owed {formatEther(totalOwed)}
        </Text>

        <Text mt="20px" fontSize="lg" color="solid.gray0" w="480px">
          Paying this will close the loan out and unlock your asset from escrow.
        </Text>
      </Flex>
    </Box>
  );
};

export default BorrowLoanRepayCard;
