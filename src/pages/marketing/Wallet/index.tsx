import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import {
  Box,
  Button,
  Center,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRaribleWalletNFTs } from '../../../hooks/useRaribleWalletNFTs';
import LoadingIndicator from '../../../components/atoms/LoadingIndicator';
import { useTopNiftyApesCollections } from '../../../hooks/useCollectionsByLiquidity';

import WalletCollections, {
  IWalletCollection,
} from './components/WalletCollections';

type ISharedWalletState = {
  isDone: boolean;
  withOffers: IWalletCollection[];
  withoutOffers: IWalletCollection[];
};

const i18n = {
  pageSubtitle: 'Details for wallet',
  pageTitle: 'Wallet Landing',
  inputPlaceholder: 'Paste Collection Address',
  inputButton: 'Go',
};

const Wallet: React.FC = () => {
  const [sharedState, setSharedState] = useState<ISharedWalletState>({
    isDone: false,
    withOffers: [],
    withoutOffers: [],
  });

  const [walletAddress, setWalletAddress] = useState('');

  const [validWalletAddress, setValidWalletAddress] = useState(
    '0xDdC0c711A642145785e03DFB9B39E04d1Dad3889',
  );

  const naCollections: any = useTopNiftyApesCollections({
    limit: 1000,
  });

  const { items: walletCollections, loading } = useRaribleWalletNFTs({
    contractAddress: validWalletAddress,
  });

  useEffect(() => {
    if (!loading && naCollections) {
      walletCollections.forEach(({ contractAddress, tokens }) => {
        const hasOffers: any = naCollections.find(
          (item: any) => item.address === contractAddress,
        );

        if (hasOffers) {
          setSharedState((prevState) => {
            return {
              ...prevState,
              withOffers: [
                ...prevState.withOffers,
                ...[{ contractAddress, tokens }],
              ],
            };
          });
        } else {
          setSharedState((prevState) => {
            return {
              ...prevState,
              withoutOffers: [
                ...prevState.withoutOffers,
                ...[{ contractAddress, tokens }],
              ],
            };
          });
        }
      });
      setSharedState((prevState) => {
        return {
          ...prevState,
          isDone: true,
        };
      });
    }
  }, [loading, validWalletAddress]);

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

          <form
            onSubmit={(event) => {
              event.preventDefault();

              setValidWalletAddress(walletAddress);

              setSharedState({
                isDone: false,
                withOffers: [],
                withoutOffers: [],
              });
            }}
          >
            <InputGroup size="lg" width="900px">
              <Input
                placeholder={'Wallet adddress or ens'}
                size="lg"
                bg="#F9F3FF"
                p="15px 25px"
                borderRadius="15px"
                w="100%"
                h="auto"
                border="none"
                onChange={(event) => {
                  setWalletAddress(event.target.value);
                }}
              />
              <InputRightElement width="4.5rem" mt="5px">
                <Button
                  size="sm"
                  disabled={!ethers.utils.isAddress(walletAddress)}
                  type="submit"
                  variant="neutralReverse"
                >
                  {i18n.inputButton}
                </Button>
              </InputRightElement>
            </InputGroup>
          </form>
        </VStack>
      </Center>

      {sharedState.isDone ? (
        <Box>
          <WalletCollections
            list={[...sharedState.withOffers, ...sharedState.withoutOffers]}
          />
        </Box>
      ) : (
        <LoadingIndicator />
      )}
    </VStack>
  );
};
export default Wallet;
