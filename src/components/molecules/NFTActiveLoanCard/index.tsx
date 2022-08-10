import React from 'react';
import { Button, Center, Box, Flex, Text } from '@chakra-ui/react';

import CryptoIcon from 'components/atoms/CryptoIcon';
import { CoinSymbol } from 'lib/constants/coinSymbols';
import { Contract } from 'ethers';

import { NFTCardContainer } from '../NFTCard/components/NFTCardContainer';
import { NFTCardHeader } from '../NFTCard/components/NFTCardHeader';
import { useRepayLoanByBorrower } from '../../../hooks/useRepayLoan';
import moment from 'moment';

interface Loan {
  amount: string;
  amountEth: number;
  amountDrawn: string;
  interestRatePerSecond: number;
  lenderInterest: string;
  loanBeginTimestamp: number;
  loanEndTimestamp: number;
  protocolInterest: string;
}

interface Props {
  collectionName: string;
  contract?: Contract;
  tokenId: string;
  img: string;
  loan: Loan;
  tokenName: string;
}

const i18n = {
  actionButtonHelperText: 'What does this mean?',
  actionButtonText: 'repay loan',
  loanStatus: 'active loan',
  loanDetails: (duration: number, apr: string) => `${duration} Days at ${apr}% APR`,
  loanTimeRemaining: (time: number) => `${time} days remaining`,
};

const NFTActiveLoanCard: React.FC<Props> = ({
  collectionName,
  contract,
  img,
  loan,
  tokenId,
  tokenName,
}) => {
  const { repayLoanByBorrower } = useRepayLoanByBorrower({
    nftContractAddress: contract?.address,
    nftId: tokenId,
  });

  const secondsInDay = 86400;
  const secondsInYear = 3.154e7;
  const apr = Number(((loan.interestRatePerSecond * secondsInYear) / loan.amountEth) * 100).toFixed(
    2,
  );
  const duration = Math.round((loan.loanEndTimestamp - loan.loanBeginTimestamp) / secondsInDay);
  const remaining = loan.loanBeginTimestamp - new Date().getSeconds();

  // console.log(moment(loan.loanEndTimestamp).format());

  const onReplayLoan = async () => {
    if (repayLoanByBorrower) {
      await repayLoanByBorrower();
    }
  };

  return (
    <NFTCardContainer>
      <NFTCardHeader
        img={img}
        tokenId={tokenId}
        tokenName={tokenName}
        collectionName={collectionName}
      >
        <>
          <Flex
            flexDir="column"
            alignItems="center"
            borderRadius="8px"
            border="1px solid"
            borderColor="orange"
            bg="orange.50"
            w="100%"
            mt="8px"
            mb="8px"
          >
            <Box
              borderBottom="1px solid"
              borderColor="orange"
              bg="white"
              borderRadius="8px 8px 0 0"
              textAlign="center"
              w="100%"
            >
              <Text textTransform="uppercase" fontWeight="bold" fontSize="md" color="orange.600">
                {i18n.loanStatus}
              </Text>
            </Box>
            <Flex alignItems="center">
              <CryptoIcon symbol={'eth'} size={25} />
              <Text ml="6px" fontSize="3.5xl" fontWeight="bold">
                {loan.amount}Ξ
              </Text>
            </Flex>

            <Text fontSize="lg" color="solid.gray0">
              <Text as="span" color="solid.black">
                {i18n.loanDetails(duration, apr)}
              </Text>
            </Text>
            <Text>{i18n.loanTimeRemaining(332)}</Text>
          </Flex>
          <Button
            borderRadius="8px"
            colorScheme="orange"
            py="6px"
            size="lg"
            textTransform="uppercase"
            variant="solid"
            w="100%"
          >
            {i18n.actionButtonText}
          </Button>

          <Center mt="8px" mb="8px">
            {i18n.actionButtonHelperText}
          </Center>
        </>
      </NFTCardHeader>
    </NFTCardContainer>
  );
};

export default NFTActiveLoanCard;
