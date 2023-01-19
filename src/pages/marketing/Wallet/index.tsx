import React, { useEffect, useState } from 'react';
import { Box, Center, Text, VStack } from '@chakra-ui/react';
import {
  IRaribleCollection,
  useRaribleWalletNFTs,
} from '../../../hooks/useRaribleWalletNFTs';
import { useCollectionStats } from '../../../providers/hooks/useCollectionStats';
import LoadingIndicator from '../../../components/atoms/LoadingIndicator';

const i18n = {
  pageSubtitle: 'Details for wallet',
  pageTitle: 'Wallet Landing',
};

const WALLET_ADDRESS = '0xDdC0c711A642145785e03DFB9B39E04d1Dad3889';

const Wallet: React.FC = () => {
  const items = useRaribleWalletNFTs({
    contractAddress: WALLET_ADDRESS,
  });

  const [isAllDone, setAllDone] = useState(false);

  const iterate = (idx: number = 0) => {
    const item: IRaribleCollection = items[idx];

    const { loading } = useCollectionStats({
      nftContractAddress: item.contractAddress,
    });

    if (!loading && items.length > idx) {
      iterate(idx + 1);
    } else {
      setAllDone(true);
    }
  };

  useEffect(() => {
    if (items && items.length > 0) {
      iterate(0);
    }
  }, [items]);

  if (!isAllDone) {
    return <Box>"Not done yet"</Box>;
  }

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

      {items ? <Box mt="10px">DONEZO</Box> : <LoadingIndicator />}
    </VStack>
  );
};

export default Wallet;
