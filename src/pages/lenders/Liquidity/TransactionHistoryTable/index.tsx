import { Table, Thead, Tr, Th, Tbody, Button } from '@chakra-ui/react';
import React from 'react';
import Row from './Row';

const TransactionHistoryTable: React.FC = () => {
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
          <Th textAlign="center">Asset</Th>
          <Th textAlign="center">Timestamp</Th>
          <Th textAlign="center">Type</Th>
          <Th textAlign="center">Amt</Th>
          <Th textAlign="center">New NiftyApes Balance</Th>
          <Th textAlign="left" flexGrow={1}>
            Loan (If Applicable)
          </Th>
          <Th textAlign="center">
            <Button variant="link" color="primary.purple">
              DOWNLOAD CSV
            </Button>
          </Th>
        </Tr>
      </Thead>
      <Tbody
        sx={{
          'tr:nth-of-type(2n)': {
            backgroundColor: 'transparent',
          },
          'tr:nth-of-type(2n+1)': {
            backgroundColor: 'solid.white',
          },
        }}
      >
        <Row />
        <Row />
        <Row />
        <Row />
      </Tbody>
    </Table>
  );
};

export default TransactionHistoryTable;
