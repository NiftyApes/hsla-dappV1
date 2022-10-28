import React from 'react';
import { Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { useTransactionHistory } from 'hooks/useTransactionHistory';
import { TransactionTableRow } from './TransactionTableRow';

export const TransactionTable: React.FC = () => {
  const transactions = useTransactionHistory();

  return (
    <Table>
      <Thead>
        <Tr
          background="transparent"
          sx={{
            '& > th': {
              fontWeight: 'bold',
              fontSize: 'sm',
              color: 'solid.gray0',
              border: 'none',
              py: '25px',
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
          'tr:nth-of-type(2n+1)': {
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
