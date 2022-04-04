import React from 'react';
import { Button, Flex, ModalProps, Text } from '@chakra-ui/react';

import Modal from 'components/atoms/Modal/Modal';
import Icon from 'components/atoms/Icon';
import WalletInfo from 'components/molecules/WalletInfo';
import BorrowOfferDetailsCard from 'components/molecules/BorrowOfferDetailsCard';

const BorrowOfferDetailsModal: React.FC<ModalProps> = ({ onClose, ...restProps }) => {
  return (
    <Modal size="full" {...restProps}>
      <Flex alignItems="center" justifyContent="space-between" mt="15px" px="15px">
        <Flex alignItems="center">
          <Button variant="circle" bg="gray.100" mr="13px" p="8px" onClick={onClose}>
            <Icon name="arrow-left" size={16} />
          </Button>
          <Text fontSize="xl" fontWeight="bold">
            OFFER DETAILS
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
        <Text textTransform="uppercase" mt="30px" fontSize="xl">
          Liquidity awaits!
        </Text>
        <Text fontSize="lg" color="solid.gray0" mt="10px" maxW="530px">
          Approve and transfer Bored Ape Yatch Club asset, #3368 to the NiftyApes smart contract to
          borrow 37.5Ξ for 120 days.
        </Text>
        <Button variant="neutral" size="md" p="26px 90px" mt="10px">
          APPROVE TRANSFER
        </Button>
        <Text fontStyle="italic" color="solid.gray0" mt="10px">
          Or
        </Text>
        <Flex alignItems="center">
          <Text color="primary.purple" fontSize="md" fontWeight="bold" mr="3px">
            Approve Collection-Wide Transfers
          </Text>
          <Icon name="help-circle" color="solid.black" />
        </Flex>
      </Flex>
    </Modal>
  );
};

export default BorrowOfferDetailsModal;
