import { Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { useTransactionHistory } from 'hooks/useTransactionHistory';
import React from 'react';
import { LenderTransaction } from './LenderTransaction';

export const TransactionTable: React.FC = () => {
  const transactions = useTransactionHistory();

  return (
    <Table mt="50px">
      <Thead>
        <Tr
          background="transparent"
          sx={{
            '& > th': {
              fontWeight: 'bold',
              fontSize: '2xs',
              color: 'solid.gray0',
              border: 'none',
              py: '8px',
            },
          }}
        >
          <Th textAlign="center" width="1rem">
            Asset
          </Th>
          <Th textAlign="center" width="16rem">
            Timestamp
          </Th>
          <Th textAlign="center" minW="16rem">
            Type
          </Th>
          <Th textAlign="center" width="8rem">
            Amount
          </Th>
          <Th textAlign="center" minW="20rem">
            Loan (if applicable)
          </Th>
          <Th textAlign="center" width="1rem">
            Etherscan
          </Th>
        </Tr>
      </Thead>
      <Tbody
        sx={{
          'tr:nth-child(2n)': {
            backgroundColor: 'transparent',
          },
          'tr:nth-child(2n+1)': {
            backgroundColor: 'solid.white',
          },
        }}
      >
        {transactions?.map((tx: any) => (
          <LenderTransaction tx={tx} key={tx.TransactionHash} />
        ))}
      </Tbody>
    </Table>
  );
};
