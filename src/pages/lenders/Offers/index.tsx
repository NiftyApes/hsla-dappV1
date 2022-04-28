import { Box, Table, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';

import Row from './Row';

const Offers: React.FC = () => {
  return (
    <Box>
      <Text fontSize="lg" fontWeight="bold" color="solid.gray0" textAlign="center">
        Offers
      </Text>
      <Box px="128px">
        <Table mt="50px">
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
              <Th textAlign="center">collateral</Th>
              <Th textAlign="left">status</Th>
              <Th textAlign="left">terms</Th>
              <Th textAlign="left">market changes</Th>
              <Th textAlign="left">performance</Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody
            sx={{
              td: {
                border: 'none',
              },
              'tr:nth-child(2n+1)': {
                backgroundColor: 'solid.white',
              },
            }}
          >
            <Row />
            <Row />
            <Row />
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default Offers;
