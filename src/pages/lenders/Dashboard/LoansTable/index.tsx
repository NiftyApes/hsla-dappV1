import {
  Box,
  Center,
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

import { LoanRow } from './LoanRow';

const LoansTable: React.FC<any> = ({ activeLoans }) => {
  const renderEmptyState = () => {
    return (
      <Center>
        <Flex h="200px">
          <Center>
            <VStack>
              <Text color="gray.500" as="i">
                No Active Loans Found
              </Text>
            </VStack>
          </Center>
        </Flex>
      </Center>
    );
  };

  return (
    <Box minW="800px" border="1px solid" borderColor="accents.100">
      <Table>
        <Thead>
          <Tr
            background="#eee"
            sx={{
              '& > th': {
                fontWeight: 'bold',
                fontSize: '2xs',
                color: 'solid.gray0',
                border: 'none',
                textAlign: 'center',
              },
            }}
          >
            <Th>collateral</Th>
            <Th>loan details</Th>
            <Th>time remaining</Th>
            <Th>interest accrued</Th>
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
          {activeLoans?.map((loan: any) => (
            <LoanRow
              loanFromDb={loan}
              key={`${loan.nftContractAddress}_${loan.nftId}`}
            />
          ))}
        </Tbody>
      </Table>

      {renderEmptyState()}
    </Box>
  );
};

export default LoansTable;
