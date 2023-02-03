import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import {
  Box,
  Button,
  Center,
  Input,
  InputGroup,
  InputRightElement,
  Progress,
  Text,
  VStack,
} from '@chakra-ui/react';

import { useRaribleWalletNFTs } from '../../../hooks/useRaribleWalletNFTs';
import { useRaribleFloorBatch } from '../../../hooks/useRaribleBatchFloors';
import { IWalletCollection } from '../../../constants/types';
import WalletCollections from './components/WalletCollections';
import { useTopNiftyApesCollections } from '../../../hooks/useCollectionsByLiquidity';
import LoadingIndicator from '../../../components/atoms/LoadingIndicator';

const i18n = {
  pageSubtitle: 'Details for wallet',
  pageTitle: 'Wallet Landing',
  inputPlaceholder: 'Paste Collection Address',
  inputButton: 'Go',
};

const Wallet: React.FC = () => {
  const [isAllDataLoaded, setIsAllDataLoaded] = useState<boolean>(false);

  const [colsNoOffers, setColsNoOffers] = useState<IWalletCollection[]>([]);
  const [colsWithOffers, setColsWithOffers] = useState<IWalletCollection[]>([]);

  const [walletAddress, setWalletAddress] = useState<string>('');
  const [actualWalletValue, setActualWalletValue] = useState<number>(0);
  const [estimatedWalletValue, setEstimatedWalletValue] = useState<number>(0);

  const { hydrated, setHydrated } = useRaribleFloorBatch({
    list: colsNoOffers,
    enabled: isAllDataLoaded,
  });

  const [validWalletAddress, setValidWalletAddress] = useState(
    '0xDdC0c711A642145785e03DFB9B39E04d1Dad3889',
  );

  const naCollections: any = useTopNiftyApesCollections({
    limit: 1000,
  });

  const { items: walletCollections, loading: walletCollectionsLoading } =
    useRaribleWalletNFTs({
      contractAddress: validWalletAddress,
    });

  useEffect(() => {
    setEstimatedWalletValue(
      hydrated.reduce((acc, itm) => {
        return acc + (itm.floorPrice || 0) * itm.tokens.length;
      }, 0),
    );
  }, [hydrated]);

  useEffect(() => {
    if (
      !walletCollectionsLoading &&
      walletCollections.length > 0 &&
      naCollections !== undefined
    ) {
      console.log(walletCollections.length, naCollections.length);
      console.log('Is data reset', isAllDataLoaded);

      walletCollections.forEach(({ contractAddress, tokens }) => {
        const hasOffers: any = naCollections.find(
          (item: any) => item.address === contractAddress,
        );

        if (hasOffers) {
          const {
            highestPrincipal,
            longestDuration,
            lowestApr,
            numberOfOffers,
            totalLiquidity,
          } = hasOffers;

          setActualWalletValue(
            (prev) => prev + highestPrincipal * tokens.length,
          );

          setColsWithOffers((prev) => {
            return [
              ...prev,
              ...[
                {
                  contractAddress,
                  highestPrincipal,
                  longestDuration,
                  lowestApr,
                  numberOfOffers,
                  tokens,
                  totalLiquidity,
                },
              ],
            ];
          });
        } else {
          setColsNoOffers((prev) => {
            return [...prev, ...[{ contractAddress, tokens }]];
          });
        }
      });

      setIsAllDataLoaded(true);
    }
  }, [naCollections, walletCollections]);

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

          {isAllDataLoaded ? (
            <Text
              fontFamily="Work Sans"
              fontSize="6xl"
              fontWeight="black"
              textTransform="uppercase"
            >
              <Progress
                colorScheme="yellow"
                size="lg"
                value={
                  (estimatedWalletValue /
                    (actualWalletValue + estimatedWalletValue)) *
                  100
                }
              />
              HOPIUM 💰{estimatedWalletValue.toFixed(2)} (actual 💰{' '}
              {actualWalletValue.toFixed(2)})
            </Text>
          ) : (
            <Text
              fontFamily="Work Sans"
              fontSize="6xl"
              fontWeight="black"
              textTransform="uppercase"
            >
              Calculating your bags 🍌💰
            </Text>
          )}

          <form
            onSubmit={(event) => {
              event.preventDefault();

              setActualWalletValue(0);
              setEstimatedWalletValue(0);
              setColsWithOffers([]);
              setColsNoOffers([]);
              setHydrated([]);

              setIsAllDataLoaded(false);
              setValidWalletAddress(walletAddress);

              console.log('Wallet reset---');
            }}
          >
            <InputGroup size="lg" width="900px">
              <Input
                placeholder="Wallet Address or ENS name"
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

      {isAllDataLoaded ? (
        <Box>
          {validWalletAddress}
          <WalletCollections list={[...colsWithOffers, ...hydrated]} />
        </Box>
      ) : (
        <LoadingIndicator />
      )}
    </VStack>
  );
};
export default Wallet;
