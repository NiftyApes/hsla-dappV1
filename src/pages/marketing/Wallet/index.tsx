import React, { useEffect, useState } from 'react';
import { Box, Center, Text, VStack } from '@chakra-ui/react';
import { useRaribleWalletNFTs } from '../../../hooks/useRaribleWalletNFTs';
import LoadingIndicator from '../../../components/atoms/LoadingIndicator';
import { useTopNiftyApesCollections } from '../../../hooks/useCollectionsByLiquidity';
import WalletCollections, {
  IWalletCollection,
} from './components/WalletCollections';

const i18n = {
  pageSubtitle: 'Details for wallet',
  pageTitle: 'Wallet Landing',
};

const WALLET_ADDRESS = '0xDdC0c711A642145785e03DFB9B39E04d1Dad3889';

const Wallet: React.FC = () => {
  const [withOffers, setWithOffers] = useState<IWalletCollection[]>([]);
  const [withoutOffers, setWithoutOffers] = useState<IWalletCollection[]>([]);

  const naCollections: any = useTopNiftyApesCollections({
    limit: 1000,
  });

  const { items: walletCollections, loading } = useRaribleWalletNFTs({
    contractAddress: WALLET_ADDRESS,
  });

  const [isDone, setDone] = useState(false);

  useEffect(() => {
    if (!loading && naCollections) {
      walletCollections.forEach(({ contractAddress, tokens }) => {
        const hasOffers: any = naCollections.find(
          (item: any) => item.address === contractAddress,
        );

        if (hasOffers) {
          setWithOffers((state) => [
            ...state,
            ...[{ contractAddress, tokens }],
          ]);
        } else {
          setWithoutOffers((state) => [
            ...state,
            ...[{ contractAddress, tokens }],
          ]);
        }
      });
      setDone(true);
    }
  }, [loading, naCollections]);

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

      {isDone ? (
        <Box>
          <WalletCollections list={[...withOffers, ...withoutOffers]} />
        </Box>
      ) : (
        <LoadingIndicator />
      )}
    </VStack>
  );
};
export default Wallet;
