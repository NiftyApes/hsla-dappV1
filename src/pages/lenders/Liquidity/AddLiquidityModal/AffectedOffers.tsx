import { Box, Flex, Text, Table, Tbody, Th, Thead, Tr, Td, Image, Button } from '@chakra-ui/react';
import React from 'react';

import Icon from 'components/atoms/Icon';
import CryptoIcon from 'components/atoms/CryptoIcon';

const AffectedOffers: React.FC = () => {
  return (
    <Box pr="60px">
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
                bg: '#f7f7f7',
                py: '8px',
              },
            }}
          >
            <Th textAlign="center">asset</Th>
            <Th textAlign="left">terms</Th>
            <Th textAlign="left">performance</Th>
            <Th textAlign="center">change</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr
            sx={{
              '& > td': {
                border: 'none',
              },
            }}
          >
            <Td>
              <Flex flexDir="column" alignItems="center">
                <Text color="solid.gray0" fontSize="xs" fontWeight="bold">
                  FLOOR TERMS
                </Text>
                <Image src="/assets/images/collection.png" w="55px" h="55px" />
                <Flex columnGap="4px" mt="-10px">
                  <Icon name="os" size={23} />
                  <Icon name="etherscan" size={18} />
                </Flex>
                <Text color="solid.gray0" fontSize="2xs" fontWeight="bold">
                  Collection.Name
                </Text>
              </Flex>
            </Td>
            <Td>
              <Flex mb="4px">
                <CryptoIcon symbol="eth" size={20} />
                <Text fontSize="sm" fontWeight="bold" ml="3px">
                  4.500Ξ
                </Text>
              </Flex>
              <Text color="solid.gray0" fontSize="sm">
                120 Days,{' '}
                <Text as="span" color="solid.black">
                  35.4%
                </Text>{' '}
                APR
              </Text>
            </Td>
            <Td>
              <Text fontSize="sm" color="solid.gray0">
                -- Utilization Rates
                <br />
                -- Profits
              </Text>
              <Button variant="link" color="primary.purple" fontSize="sm" fontWeight="normal">
                Offerbook
              </Button>
            </Td>
            <Td>
              <Flex justifyContent="space-between">
                <Box textAlign="center">
                  <Text fontSize="xl" fontWeight="bold">
                    75
                  </Text>
                  <Text fontSize="sm" color="solid.gray0">
                    Loans
                  </Text>
                </Box>
                <Icon name="arrow-right" />
                <Box textAlign="center">
                  <Text fontSize="xl" fontWeight="bold" color="notification.notify">
                    77
                  </Text>
                  <Text fontSize="sm" color="solid.gray0">
                    Loans
                  </Text>
                </Box>
              </Flex>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default AffectedOffers;
