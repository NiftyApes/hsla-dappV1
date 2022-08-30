import { Box, Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';

import { useActiveLoansForLender } from 'hooks/useActiveLoansForLender';
import { LoanRow } from './LoanRow';

const LoansTable: React.FC = () => {
  const activeLoans = useActiveLoansForLender();

  return (
    <Box minW="900px">
      <Table>
        <Thead>
          <Tr
            background="transparent"
            sx={{
              '& > th': {
                fontWeight: 'bold',
                fontSize: '2xs',
                color: 'solid.gray0',
                border: 'none',
                textAlign: 'center',
                py: '18px',
              },
            }}
          >
            <Th>collateral</Th>
            <Th>loan details</Th>
            <Th>time remaining</Th>
            <Th>change</Th>
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
            'tr:nth-child(2n)': {
              backgroundColor: 'solid.white',
            },
            'tr:nth-child(2n+1)': {
              backgroundColor: 'transparent',
            },
          }}
        >
          {activeLoans?.map((loan: any, i: number) => (
            <LoanRow loanFromDb={loan} key={i} />
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default LoansTable;
