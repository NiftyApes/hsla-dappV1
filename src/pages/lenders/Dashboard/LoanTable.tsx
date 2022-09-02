import { Box, Button, Flex, Image, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';

import Icon from 'components/atoms/Icon';

const LoanTable: React.FC = () => {
  return (
    <Box px="120px">
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
            <Th>status</Th>
            <Th>initiated</Th>
            <Th>
              <Text textAlign="left">terms</Text>
            </Th>
            <Th>time remaining</Th>
            <Th>interest earned</Th>
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
          <Tr
            sx={{
              td: {
                border: 'none',
                fontSize: 'md',
                background: 'solid.white',
                textAlign: 'center',
              },
            }}
          >
            <Td>
              <Flex flexDir="column" alignItems="center" justifyContent="center">
                <Text fontWeight="bold" fontSize="xs" color="solid.gray0" mt="4px">
                  COLLECTIONI..
                </Text>
                <Image
                  src="/assets/mocks/bored_ape_square.png"
                  w="55px"
                  h="55px"
                  objectFit="cover"
                />
                <Flex mt="-10px">
                  <Icon name="os" size={25} />
                  <Box
                    border="2px solid"
                    borderRadius="50%"
                    borderColor="solid.white"
                    bgColor="white"
                  >
                    <Icon name="etherscan" size={20} />
                  </Box>
                </Flex>
                <Text fontWeight="bold" fontSize="sm">
                  TokenID
                </Text>
              </Flex>
            </Td>
            <Td>
              <Text
                fontWeight="bold"
                fontSize="15px"
                color="notification.alert"
                w="120px"
                m="0 auto"
                textAlign="left"
                mb="8px"
              >
                Defaulted
              </Text>
              <Button variant="alert" borderRadius="9px" p="12px 26px">
                SIZE ASSET
              </Button>
            </Td>
            <Td>
              <Text fontSize="2xs" color="solid.darkGray" textDecor="underline">
                [timestamp (txt)
              </Text>
            </Td>
            <Td>
              <Box textAlign="left">
                <Text fontSize="xl" fontWeight="bold">
                  25.5Ξ
                </Text>
                <Text fontSize="sm" color="solid.gray0">
                  120 Days,{' '}
                  <Text color="solid.black" as="span">
                    12%
                  </Text>{' '}
                  APR
                </Text>
                <Button variant="link" color="primary.purple" fontSize="xs" mt="4px">
                  EDIT OFFER
                </Button>
              </Box>
            </Td>
            <Td>
              <Text fontSize="md" color="notification.info" fontWeight="bold">
                Active, 119 day, <br />
                23 hours remaining
              </Text>
            </Td>
            <Td>
              <Flex flexDir="column" alignItems="center">
                <Box>
                  <Text color="notification.alert" fontSize="xl" fontWeight="bold">
                    0.0000Ξ
                  </Text>
                  <Text color="solid.gray0" fontSize="2xs" textAlign="left">
                    Defaulted
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

export default LoanTable;
