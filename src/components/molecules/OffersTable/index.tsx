import React from 'react';
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Flex,
  Box,
  Text,
  Button,
  Checkbox,
} from '@chakra-ui/react';
import Icon from 'components/atoms/Icon';
import CryptoIcon from 'components/atoms/CryptoIcon';

const OffersTable: React.FC = () => {
  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" mb="30px">
        <Flex alignItems="center">
          <Button variant="icon" background="gray.300" mr="16px">
            <Icon name="search" size={15} />
          </Button>
          <Text color="solid.darkGray" fontSize="lg" fontWeight="bold">
            ALL MATCHING OFFERS
          </Text>
        </Flex>
        <Flex alignItems="center">
          Filters
          <Icon name="sliders" size={15} color="solid.darkGray" ml="6px" mr="20px" />
          Smart Filter
          <Checkbox type="checkbox" checked ml="6px" />
        </Flex>
      </Flex>
      <Table>
        <Thead>
          <Tr
            background="gray.200"
            sx={{
              '& > th': {
                fontWeight: 'bold',
                fontSize: '2xs',
                color: 'solid.darkGray',
                border: 'none',
                width: '33%',
                textAlign: 'left',
                py: '8px',
              },
            }}
          >
            <Th borderRadius="8px 0px 0px 8px">amt</Th>
            <Th>ltv</Th>
            <Th>duration</Th>
            <Th>apr</Th>
            <Th borderRadius="0px 8px 8px 0px"></Th>
          </Tr>
        </Thead>
        <Tbody
          sx={{
            'tr:nth-child(2n)': {
              backgroundColor: 'gray.200',
            },
          }}
        >
          <Tr
            sx={{
              td: {
                border: 'none',
                fontSize: 'md',
              },
            }}
          >
            <Td>
              <Flex alignItems="center">
                <CryptoIcon symbol="eth" size={20} />
                <Text ml="10px">25.500</Text>
              </Flex>
            </Td>
            <Td>
              <Text>30%</Text>
            </Td>
            <Td>
              <Text>120 days</Text>
            </Td>
            <Td>
              <Text>15%</Text>
            </Td>
            <Td>
              <Button variant="link" color="notification.notify" fontSize="2xs">
                BORROW
              </Button>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default OffersTable;
