import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { useWalletAddress } from 'hooks/useWalletAddress';
import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { Link } from 'react-router-dom';

interface CreateCollectionOfferProps {
  nftContractAddress: string;
}

export const SuccessfulOrderCreationModal: React.FC<any> = ({ isOpen, onOpen, onClose }: any) => {
  const walletAddress = useWalletAddress();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderBottom="1px solid #ccc" py="0.75rem">
          <Flex alignItems="center" justifyContent="space-between">
            <span></span>
            <span style={{ color: '#777' }}>🎉 Offer Made 🎉</span>
            <IoMdClose onClick={onClose} style={{ cursor: 'pointer' }} />
          </Flex>
        </ModalHeader>
        <ModalBody fontSize="1.1rem">
          <Text mt="0.75rem">Your offer has been made!</Text>
          <Text mt="1.25rem" mb="5rem">
            Go to the <strong>Dashboard</strong> to view and cancel your Offer.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Box mr="1.25rem">
            <Link to={`/lenders/${walletAddress}/dashboard`}>
              <Button variant="neutralReverse">Dashboard</Button>
            </Link>
          </Box>
          <Button onClick={onClose}>Create More Offers</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};