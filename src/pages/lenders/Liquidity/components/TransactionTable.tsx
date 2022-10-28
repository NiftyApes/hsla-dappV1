import React from 'react';
import { Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { useTransactionHistory } from 'hooks/useTransactionHistory';
import { TransactionTableRow } from './TransactionTableRow';

export const TransactionTable: React.FC = () => {
  const transactions = useTransactionHistory();

  return (
    <Table>
      <Thead
        sx={{
          'tr:first-of-type > th:first-of-type': {
            borderTopLeftRadius: '8px',
          },
          'tr:first-of-type > th:last-child': {
            borderTopRightRadius: '8px',
          },
          'tr:last-child > th:first-of-type': {
            borderBottomLeftRadius: '8px',
          },
          'tr:last-child > th:last-child': {
            borderBottomRightRadius: '8px',
          },
        }}
      >
        <Tr
          background="#F7F7F7"
          sx={{
            '& > th': {
              fontWeight: 'bold',
              fontSize: '2xs',
              color: 'solid.gray0',
              textAlign: 'center',
              border: 'none',
              py: '10px',
            },
          }}
        >
          <Th textAlign="center">Asset</Th>
          <Th textAlign="center">Transaction</Th>
          <Th textAlign="center">Type</Th>
          <Th textAlign="center">Amount</Th>
          <Th textAlign="center">Loan (if applicable)</Th>
        </Tr>
      </Thead>
      <Tbody
        sx={{
          td: {
            border: 'none',
          },
          'tr:nth-of-type(2n)': {
            backgroundColor: 'solid.white',
          },
        }}
      >
        {transactions?.map((tx: any) => (
          <TransactionTableRow tx={tx} key={tx.TransactionHash} />
        ))}
      </Tbody>
    </Table>
  );
};
