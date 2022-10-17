import { Box, Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';

import { LoanRow } from './LoanRow';

const LoansTable: React.FC<any> = ({ activeLoans }) => {
  return (
    <Box>
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
    </Box>
  );
};

export default LoansTable;
