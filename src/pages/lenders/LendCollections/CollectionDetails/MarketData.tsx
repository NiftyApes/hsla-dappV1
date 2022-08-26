// Currently not used or hooked up to real data
// Keeping in here as reference after we've implemented fetching collection stats

import { Box, Flex, Grid, Image, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';

import CryptoIcon from 'components/atoms/CryptoIcon';
import Icon from 'components/atoms/Icon';

const MarketData: React.FC = () => {
  return (
    <Box>
      <Text fontWeight="bold" color="solid.gray0" mb="13px">
        MARKET DATA
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
                border: 'none',
                textAlign: 'center',
                py: '10px',
              },
            }}
          >
            <Th>120D SALES</Th>
            <Th>120D Ave. Price</Th>
            <Th>120D Volume</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr
            sx={{
              td: {
                border: 'none',
                fontSize: 'md',
                textAlign: 'center',
                '& > p': {
                  fontSize: '30px',
                },
              },
            }}
          >
            <Td>
              <Text>432</Text>
            </Td>
            <Td>
              <Text>84.518Ξ</Text>
            </Td>
            <Td>
              <Text>36288.51Ξ</Text>
            </Td>
          </Tr>
        </Tbody>
      </Table>
      <Table mt="30px">
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
                border: 'none',
                textAlign: 'center',
                py: '10px',
              },
            }}
          >
            <Th>Recent Loans</Th>
            <Th>Status</Th>
            <Th>Terms</Th>
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
            <Td display="flex" flexDir="column" textAlign="center" alignItems="center">
              <Flex>
                <Image src="/assets/mocks/bored_ape_square.png" />
                <Grid gap="3px">
                  <Icon name="etherscan" size={20} />
                  <CryptoIcon symbol="eth" size={20} />
                </Grid>
              </Flex>
              <Text fontWeight="bold" fontSize="sm" color="solid.gray0" mt="8px">
                BAYC&nbsp;
                <Text as="span" color="solid.black">
                  #3369
                </Text>
              </Text>
            </Td>
            <Td>
              <Text fontSize="sm" color="notification.info" fontWeight="bold">
                Active Loan
              </Text>
              <Text fontSize="2xs" color="solid.gray0" mt="6px">
                👇 [timestamp (txt)
              </Text>
            </Td>
            <Td>
              <Text fontSize="md">
                37.5Ξ <Text color="solid.gray0">120 Days,</Text> 12%{' '}
                <Text as="span" color="solid.gray0">
                  APR
                </Text>
              </Text>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default MarketData;
