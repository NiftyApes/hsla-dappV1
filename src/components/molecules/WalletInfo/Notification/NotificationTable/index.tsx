import React from 'react';
import { Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import Row from './Row';

const NotificationTable: React.FC = () => {
  return (
    <Table>
      <Thead>
        <Tr
          sx={{
            th: {
              borderBottom: 'none',
            },
          }}
        >
          <Th w="50px" p="0px"></Th>
          <Th></Th>
          <Th></Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody
        sx={{
          'tr:nth-of-type(2n)': {
            backgroundColor: 'rgba(242,242,242,0.5)',
          },
          'tr:nth-of-type(2n+1)': {
            backgroundColor: 'solid.white',
          },
        }}
      >
        <Row />
        <Row />
      </Tbody>
    </Table>
  );
};

export default NotificationTable;
