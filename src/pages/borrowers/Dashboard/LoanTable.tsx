import React from 'react';
import { Box, Button, Flex, Image, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';

import Icon from 'components/atoms/Icon';
import { LoanAuction } from '../../../loan';
import { formatEther } from 'ethers/lib/utils';
import { getAPR } from '../../../helpers/getAPR';
import { roundForDisplay } from '../../../helpers/roundForDisplay';
import moment from 'moment';
import { BigNumber } from 'ethers';

interface callbackType {
  (loan: LoanAuction): void;
}

interface Props {
  loans: Array<LoanAuction>;
  onClick: callbackType;
}

const i18n = {
  loanTimeRemaining: (distance: string, defaulted: boolean) =>
    defaulted ? 'Loan Defaulted' : `${distance} remaining...`,
  loanDuration: (duration: number) => `${duration} days`,
  loanApr: (apr: number) => `${roundForDisplay(apr)}% APR`,
  loanTotalWithInterest: (amount: string, interest: BigNumber) =>
    `${amount}Ξ + ${Number(formatEther(interest)).toFixed(4)}Ξ Interest`,
};

const LoanTable: React.FC<Props> = ({ loans, onClick }) => {
  return (
    <Box px="120px">
      <Table>
        <Thead>
          <Tr
            background="transparent"
            sx={{
              '& > th': {
                fontWeight: 'bold',
                fontSize: '2xs',
                color: 'solid.darkGray',
                border: 'none',
                py: '18px',
              },
            }}
          >
            <Th>collateral</Th>
            <Th>initiated</Th>
            <Th>terms</Th>
            <Th>repayment</Th>
            <Th>status</Th>
            <Th>action</Th>
          </Tr>
        </Thead>
        <Tbody
          sx={{
            'tr:first-of-type > td:first-of-type': {
              borderTopLeftRadius: '10px',
            },
            'tr:first-of-type > td:last-child': {
              borderTopRightRadius: '10px',
            },
            'tr:last-child > td:first-of-type': {
              borderBottomLeftRadius: '10px',
            },
            'tr:last-child > td:last-child': {
              borderBottomRightRadius: '10px',
            },
          }}
        >
          {loans.map((loan, idx) => {
            const amount = Number(loan.amount.toString());
            const irps = loan.interestRatePerSecond.toNumber();
            const apr = getAPR({
              amount,
              interestRatePerSecond: irps,
            });

            const endMoment = moment(loan.loanEndTimestamp * 1000);
            const startMoment = moment(loan.loanBeginTimestamp * 1000);
            const timeRemaining = endMoment.toNow(true);
            const duration = endMoment.diff(startMoment, 'days');
            const isDefaulted = moment().isAfter(endMoment);

            const totalInterest: BigNumber = loan.interestRatePerSecond.mul(
              loan.loanEndTimestamp - loan.loanBeginTimestamp,
            );
            const totalAmount: BigNumber = loan.amount.add(
              loan.interestRatePerSecond.mul(loan.loanEndTimestamp - loan.loanBeginTimestamp),
            );

            return (
              <Tr key={idx}>
                <Td>
                  <Flex alignItems="center" justifyContent="center">
                    <Image
                      src="/assets/mocks/bored_ape_square.png"
                      w="55px"
                      h="55px"
                      objectFit="cover"
                    />
                    <Box marginLeft="-10px" mt="-10px">
                      <Box
                        border="2px solid"
                        borderRadius="50%"
                        borderColor="solid.white"
                        bgColor="white"
                      >
                        <Icon name="etherscan" size={20} />
                      </Box>
                      <Icon name="os" size={25} />
                    </Box>
                  </Flex>
                  <Text mt="8px" fontWeight="bold" fontSize="2xs">
                    <Text as="span" color="gray">
                      {loan.nftContractAddress}
                    </Text>
                    #{loan.nftId}
                  </Text>
                </Td>
                <Td>{startMoment.format('MMMM Do YYYY, h:mm:ss')}</Td>
                <Td>
                  <Text fontSize="xl" fontWeight="bold">
                    {formatEther(loan.amount)}Ξ
                  </Text>

                  <Text fontSize="sm">
                    <Text color="gray" as="span" mr="10px">
                      {i18n.loanDuration(duration)}
                    </Text>
                    <Text as="span">{i18n.loanApr(apr)}</Text>
                  </Text>
                </Td>
                <Td>
                  <Text fontSize="xl" fontWeight="bold">
                    {Number(formatEther(totalAmount)).toFixed(4)}Ξ
                  </Text>
                  <Text fontSize="sm" color="gray">
                    {i18n.loanTotalWithInterest(formatEther(loan.amount), totalInterest)}
                  </Text>
                </Td>
                <Td>{i18n.loanTimeRemaining(timeRemaining, isDefaulted)}</Td>
                <Td>
                  <Button variant="neutral" onClick={() => onClick(loan)}>
                    REPAY
                  </Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default LoanTable;
