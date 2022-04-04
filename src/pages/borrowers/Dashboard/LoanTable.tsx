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
  Image,
  Text,
  Button,
  useDisclosure,
} from '@chakra-ui/react';

import Icon from 'components/atoms/Icon';
import RepayLoanModal from 'components/organisms/RepayLoanModal';

const LoanTable: React.FC = () => {
  const {
    onOpen: showRepayLoanModal,
    onClose: hideRepayLoanModal,
    isOpen: isRepayLoanModalVisible,
  } = useDisclosure();

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
                color: 'solid.darkGray',
                border: 'none',
                textAlign: 'center',
                py: '18px',
              },
            }}
          >
            <Th>collateral</Th>
            <Th>initiated</Th>
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
              <Flex alignItems="center" justifyContent="center">
                <Image
                  src="/assets/mocks/bored_ape_square.png"
                  w="55px"
                  h="55px"
                  objectFit="cover"
                />
                <Box marginLeft="-10px" mt="-10px">
                  <Box
                    border="2px solid"
                    borderRadius="50%"
                    borderColor="solid.white"
                    bgColor="white"
                  >
                    <Icon name="etherscan" size={20} />
                  </Box>
                  <Icon name="os" size={25} />
                </Box>
              </Flex>
              <Text mt="8px" fontWeight="bold" fontSize="2xs">
                <Text as="span" color="solid.darkGray">
                  BAYC&nbsp;
                </Text>
                #46
              </Text>
            </Td>
            <Td>
              <Text fontSize="2xs" color="solid.darkGray" textDecor="underline">
                [timestamp (txt)
              </Text>
            </Td>
            <Td>
              <Text fontSize="xl" fontWeight="bold">
                25.5Ξ
              </Text>
              <Text fontSize="sm" color="solid.darkGray">
                120 Days,{' '}
                <Text color="solid.black" as="span">
                  12%
                </Text>{' '}
                APR
              </Text>
            </Td>
            <Td>
              <Text fontSize="xl" fontWeight="bold">
                25.5123..Ξ
              </Text>
              <Text fontSize="sm" color="solid.darkGray">
                25.50Ξ + 0.012 Ξ Interest
              </Text>
            </Td>
            <Td>
              <Text fontSize="md" color="notification.info" fontWeight="bold">
                Active, 119 day, <br />
                23 hours remaining
              </Text>
            </Td>
            <Td>
              <Button variant="neutral" onClick={showRepayLoanModal}>
                REPAY
              </Button>
            </Td>
          </Tr>
        </Tbody>
      </Table>
      <RepayLoanModal isOpen={isRepayLoanModalVisible} onClose={hideRepayLoanModal} />
    </Box>
  );
};

export default LoanTable;
