/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Box, Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';

import { LoanAuction } from '../../../loan';
import LoanTableRow from './LoanTableRow';

interface CallbackType {
  (loan: LoanAuction): void;
}

interface Props {
  loans: Array<LoanAuction>;
  onClick: CallbackType;
}

const LoanTable: React.FC<Props> = ({ loans, onClick }) => {
  return (
    <Box px="120px">
      <Table>
        <Thead>
          <Tr
            sx={{
              '& > th': {
                fontWeight: 'bold',
                fontSize: '2xs',
                color: 'solid.gray0',
                border: 'none',
                py: '10px',
              },
            }}
          >
            <Th>collateral</Th>
            <Th>transaction</Th>
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
            return <LoanTableRow key={idx} loan={loan} onClick={onClick} />;
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default LoanTable;
