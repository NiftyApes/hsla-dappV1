import { Box, Flex, Grid, Image, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import CryptoIcon from 'components/atoms/CryptoIcon';
import Icon from 'components/atoms/Icon';
import React from 'react';

const RecentLoans: React.FC = () => {
  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" mb="36px" mt="6px">
        <Text color="solid.gray0" fontSize="lg" fontWeight="bold">
          RECENT LOANS ON PLATFORMS
        </Text>
        <Icon name="filter" size={17} color="solid.gray0" />
      </Flex>
      <Table>
        <Thead>
          <Tr
            background="gray.200"
            sx={{
              '& > th': {
                fontWeight: 'bold',
                fontSize: '2xs',
                color: 'solid.gray0',
                border: 'none',
                width: '33%',
              },
            }}
          >
            <Th borderRadius="8px 0px 0px 8px" textAlign="center">
              collateral
            </Th>
            <Th textAlign="center">status</Th>
            <Th borderRadius="0px 8px 8px 0px" textAlign="left">
              terms
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr
            sx={{
              td: {
                backgroundColor: 'solid.white',
                border: 'none',
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
              <Text fontWeight="bold" fontSize="sm" color="solid.gray0">
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
            <Td overflowWrap="break-word">
              <Box>
                <Text fontWeight="bold">
                  37.5Ξ&nbsp;
                  <Text as="span" color="solid.gray0" fontWeight="normal">
                    120 Days,
                  </Text>
                  12%{' '}
                  <Text as="span" color="solid.gray0" fontWeight="normal">
                    APR
                  </Text>
                </Text>
              </Box>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default RecentLoans;
