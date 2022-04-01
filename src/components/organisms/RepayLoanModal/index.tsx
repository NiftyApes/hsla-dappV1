import React from 'react';
import {
  Button,
  Divider,
  Flex,
  ModalProps,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { AiOutlineArrowRight } from 'react-icons/ai';

import Modal from 'components/atoms/Modal/Modal';
import Icon from 'components/atoms/Icon';
import WalletInfo from 'components/molecules/WalletInfo';
import BorrowOfferDetailsCard from 'components/molecules/BorrowOfferDetailsCard';
import CryptoIcon from 'components/atoms/CryptoIcon';

const RepayLoanModal: React.FC<Omit<ModalProps, 'children'>> = ({ onClose, ...restProps }) => {
  const { onToggle, isOpen: isMakePaymentOpen } = useDisclosure();

  return (
    <Modal size="full" {...restProps}>
      <Flex alignItems="center" justifyContent="space-between" mt="15px" px="15px">
        <Flex alignItems="center">
          <Button variant="circle" bg="gray.100" mr="13px" p="8px" onClick={onClose}>
            <Icon name="arrow-left" size={16} />
          </Button>
          <Text fontSize="xl" fontWeight="bold">
            REPAY LOAN
          </Text>
        </Flex>

        <WalletInfo />
      </Flex>

      <Flex flexDir="column" alignItems="center" mt="40px" textAlign="center">
        <BorrowOfferDetailsCard
          img="/assets/mocks/bored_ape.png"
          offer={{ type: 'floor', price: 42.167, days: 120, aprPercentage: 25, symbol: 'eth' }}
          tokenName="Bored Ape Yacht Club"
        />

        <Text fontSize="md" color="solid.gray0" mt="32px">
          Repay the full loan amount to unlock your asset
        </Text>
        <Flex
          flexDir="column"
          border="1px solid rgba(101, 101, 101, 0.2)"
          bg="rgba(234, 217, 255, 0.2)"
          borderRadius="15px"
          mt="16px"
          p="20px 16px"
          w="480px"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Flex alignItems="center">
              <CryptoIcon symbol="eth" size={24} />
              <Text ml="4px" mr="14px" color="solid.gray0" fontWeight="bold">
                ETH
              </Text>
              <Text
                fontSize="3.5xl"
                cursor={!isMakePaymentOpen ? 'pointer' : 'default'}
                onClick={!isMakePaymentOpen ? onToggle : undefined}
              >
                25.512328Ξ
              </Text>
            </Flex>
            <Text
              fontSize="sm"
              cursor={isMakePaymentOpen ? 'pointer' : 'default'}
              color={isMakePaymentOpen ? 'primary.purple' : 'solid.gray0'}
              onClick={isMakePaymentOpen ? onToggle : undefined}
            >
              MAX PAYMENT
            </Text>
          </Flex>

          <Divider mt="20px" mb="15px" color="accents.100" />
          <Button fontSize="sm" py="18px" variant="neutralReverse" borderRadius="15px">
            {isMakePaymentOpen ? 'MAKE PAYMENT' : 'REPAY LOAN'}
          </Button>
        </Flex>
        {!isMakePaymentOpen ? (
          <>
            <Text mt="20px" fontSize="lg" fontWeight="bold">
              This is the total amount owed
            </Text>

            <Text mt="20px" fontSize="lg" color="solid.gray0" w="480px">
              Paying this will close the loan out and unlock your asset from escrow.
            </Text>
          </>
        ) : (
          <>
            <Text fontSize="lg" mt="20px" color="solid.gray0" fontWeight="bold">
              This payment is going towards the principle owed.
            </Text>
            <Table w="500px" mt="25px" transform="translateX(-50px)">
              <Thead>
                <Tr
                  background="transparent"
                  sx={{
                    '& > th': {
                      fontSize: 'sm',
                      color: 'solid.gray0',
                      border: 'none',
                      textTransform: 'none',
                      textAlign: 'center',
                      py: '11px',
                    },
                  }}
                >
                  <Th></Th>
                  <Th>Before Payment</Th>
                  <Th></Th>
                  <Th>After Payment</Th>
                </Tr>
              </Thead>
              <Tbody
                sx={{
                  td: {
                    border: 'none',
                    textAlign: 'center',
                    color: 'solid.gray0',
                  },
                  'tr > td:first-of-type': {
                    textAlign: 'right',
                    px: '10px',
                  },
                  'tr > td:not(:first-of-type)': {
                    textAlign: 'center',
                    bgColor: 'solid.white',
                    fontSize: 'lg',
                    fontWeight: 'bold',
                  },
                  'tr > td:last-of-type': {
                    color: 'notification.notify',
                    fontSize: 'lg',
                    fontWeight: 'bold',
                  },
                }}
              >
                <Tr>
                  <Td>Principle</Td>
                  <Td borderTopLeftRadius="10px">25.5Ξ</Td>
                  <Td>
                    <AiOutlineArrowRight />
                  </Td>
                  <Td borderTopRightRadius="10px">20Ξ </Td>
                </Tr>
                <Tr>
                  <Td>Max Interest</Td>
                  <Td borderBottomLeftRadius="10px">25.5Ξ</Td>
                  <Td>
                    <AiOutlineArrowRight />
                  </Td>
                  <Td borderBottomRightRadius="10px">20Ξ </Td>
                </Tr>
              </Tbody>
            </Table>
            <Text fontSize="lg" color="solid.gray0" mt="30px" w="480px">
              This will result in lower interest due at the end of your loan.
            </Text>
          </>
        )}
      </Flex>
    </Modal>
  );
};

export default RepayLoanModal;
