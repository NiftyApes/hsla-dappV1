import React from 'react';
import { useDisclosure, Text, Button, Flex, Box } from '@chakra-ui/react';
import Icon from 'components/atoms/Icon';
import Step from './Step';
import { borrowersId } from 'routes/router';
import Modal from 'components/atoms/Modal/Modal';

const isWalletConnected = false;

const ConnectWalletModal: React.FC = () => {
  const { isOpen, onClose } = useDisclosure({
    defaultIsOpen: true,
  });

  if (isWalletConnected) window.location.href = borrowersId('123');

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick={false}>
      <Box textAlign="center" py="21px">
        <Text color="solid.darkGray" fontSize="lg" textTransform="uppercase">
          🍌 QuickStart Borrowing on NiftyApes 🍌
        </Text>
        <Button variant="link" onClick={onClose} pos="absolute" top="30px" right="30px">
          <Icon name="close" />
        </Button>
        <Flex justifyContent="center" alignItems="center" flexWrap="wrap" mt="50px" gap="30px">
          <Step
            title="1. View Offers Against Your Assets"
            desc="Connect your wallets and view offers against your NFTs."
          />
          <Step
            title="2. Lock & Borrow Against your NFT Worry-Free"
            desc="Draw down liquidity, your loan is unaffected by fluctuating markets"
          />
          <Step
            title="3. Repay your Loan to unlock your NFT"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />
        </Flex>
        <Text fontSize="md" mt="140px">
          🎉 Connect your wallet to view all offers on your NFTs. 🎉
        </Text>
        <Button variant="neutral" w="400px" margin="0 auto" mt="20px">
          Connect Wallet
        </Button>
      </Box>
    </Modal>
  );
};

export default ConnectWalletModal;
