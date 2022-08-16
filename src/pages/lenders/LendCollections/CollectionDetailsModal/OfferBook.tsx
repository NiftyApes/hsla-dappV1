import React from 'react';
import { Box, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import CryptoIcon from 'components/atoms/CryptoIcon';

const OfferBook: React.FC = () => {
  return (
    <Box>
      <Text fontWeight="bold" color="solid.gray0" mb="13px">
        OFFER BOOK
      </Text>
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
            <Th>Asset/ Amt.</Th>
            <Th textAlign="right">LTV</Th>
            <Th textAlign="center">Duration</Th>
            <Th textAlign="center">APR</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr
            sx={{
              td: {
                border: 'none',
                fontSize: 'md',
                textAlign: 'center',
              },
            }}
          >
            <Td display="flex" alignItems="center">
              <CryptoIcon symbol="eth" size={20} />
              <Text ml="8px">25.500</Text>
            </Td>
            <Td>
              <Text>30%</Text>
            </Td>
            <Td>
              <Text>120 Days</Text>
            </Td>
            <Td>
              <Text>15%</Text>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default OfferBook;
