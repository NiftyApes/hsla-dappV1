import React from 'react';
import { Box, Center, Text, VStack } from '@chakra-ui/react';
import { useRaribleWalletNFTs } from '../../../hooks/useRaribleWalletNFTs';
import LoadingIndicator from '../../../components/atoms/LoadingIndicator';
import WalletCollections from './components/WalletCollections';

const i18n = {
  pageSubtitle: 'Details for wallet',
  pageTitle: 'Wallet Landing',
};

const WALLET_ADDRESS = '0x1d671d1B191323A38490972D58354971E5c1cd2A';

const Wallet: React.FC = () => {
  const items = useRaribleWalletNFTs({
    contractAddress: WALLET_ADDRESS,
  });

  return (
    <VStack spacing="50px">
      <Center>
        <VStack>
          <Text
            fontFamily="Work Sans"
            fontSize="8xl"
            fontWeight="black"
            textTransform="uppercase"
          >
            {i18n.pageTitle}
          </Text>
          <Text fontSize="xl" color="grey">
            {i18n.pageSubtitle} {WALLET_ADDRESS}
          </Text>
        </VStack>
      </Center>

      {items ? (
        <Box mt="10px">
          <WalletCollections list={items} />
        </Box>
      ) : (
        <LoadingIndicator />
      )}
    </VStack>
  );
};

export default Wallet;
