import Humanize from 'humanize-plus';

import React, { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Text,
  useToast,
} from '@chakra-ui/react';
import CryptoIcon from 'components/atoms/CryptoIcon';
import { SECONDS_IN_DAY, SECONDS_IN_YEAR } from 'constants/misc';
import { useCreateCollectionOffer } from 'hooks/useCreateCollectionOffer';
import { useAvailableEthLiquidity } from 'hooks/useEthLiquidity';
import { useWalletAddress } from 'hooks/useWalletAddress';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import _ from 'lodash';
import JSConfetti from 'js-confetti';
import { useAnalyticsEventTracker } from 'hooks/useAnalyticsEventTracker';
import { useRaribleCollectionStats } from 'hooks/useRaribleColectionStats';
import { ACTIONS, CATEGORIES, LABELS } from 'constants/googleAnalytics';
import { lendersLiquidity } from 'routes/router';
import { Link } from 'react-router-dom';
import { useRaribleTokenMeta } from 'hooks/useRaribleTokenMeta';
import { useDebounce } from 'hooks/useDebounce';
import { ToastSuccessCard } from '../../../../../components/cards/ToastSuccessCard';
import TokenControl from './TokenControl';

type OfferTypes = 'offers' | 'token';

const RARIBLE_TOKEN_DEBOUNCE_MS = 250;

interface CreateCollectionOfferFormProps {
  type: OfferTypes;
  nftContractAddress: string;
  collectionOfferAmt: string;
  setCollectionOfferAmt: React.Dispatch<React.SetStateAction<string>>;
  apr: string;
  setApr: React.Dispatch<React.SetStateAction<string>>;
  duration: string;
  setDuration: React.Dispatch<React.SetStateAction<string>>;
  expiration: string;
  setExpiration: React.Dispatch<React.SetStateAction<string>>;
  addNewlyAddedOfferHash: (offerHash: string) => void;
  floorTermLimit: string;
  tokenId: string;
  setFloorTermLimit: React.Dispatch<React.SetStateAction<string>>;
  setTokenId: React.Dispatch<React.SetStateAction<string>>;
}

export const CreateCollectionOfferForm: React.FC<
  CreateCollectionOfferFormProps
> = ({
  type,
  nftContractAddress,
  collectionOfferAmt,
  setCollectionOfferAmt,
  apr,
  setApr,
  duration,
  setDuration,
  expiration,
  setExpiration,
  addNewlyAddedOfferHash,
  floorTermLimit,
  setFloorTermLimit,
  setTokenId,
  tokenId,
}) => {
  const gaEventTracker = useAnalyticsEventTracker(CATEGORIES.LENDERS);
  const { createCollectionOffer } = useCreateCollectionOffer({
    nftContractAddress,
  });

  const [createCollectionOfferStatus, setCreateCollectionOfferStatus] =
    useState<string>('READY');

  const { availableEthLiquidity } = useAvailableEthLiquidity();

  const doesOfferAmountExceedAvailableLiquidity =
    !_.isNil(availableEthLiquidity) &&
    Number(collectionOfferAmt) > availableEthLiquidity;

  const toast = useToast();
  const jsConfetti = new JSConfetti();
  const isDurationValid: boolean =
    !_.isEmpty(duration) && Number(duration) >= 1;
  const isAprValid: boolean = !_.isEmpty(apr);
  const isOfferValid: boolean =
    !_.isEmpty(collectionOfferAmt) && Number(collectionOfferAmt) > 0;

  const isOfferReady: boolean = isDurationValid && isAprValid && isOfferValid;

  const walletAddress = useWalletAddress();

  const estimatedProfit = useMemo(() => {
    const irps: number = Number(apr) / 100 / SECONDS_IN_YEAR;
    const secs: number = Number(duration) * SECONDS_IN_DAY;
    return irps * secs * Number(collectionOfferAmt);
  }, [apr, collectionOfferAmt, duration]);

  const onCreateOffer = () => {
    createCollectionOffer({
      tokenId: Number(tokenId),
      amount: Number(collectionOfferAmt),
      aprInPercent: Number(apr),
      durationInDays: Number(duration),
      expirationInDays: Number(expiration),
      floorTermLimit: Number(floorTermLimit),
      onTxMined: (receipt: TransactionReceipt) => {
        jsConfetti.addConfetti({
          emojis: ['🍌'],
          emojiSize: 80,
          confettiNumber: 50,
        });

        toast({
          render: (props) => (
            <ToastSuccessCard title="Offer Created" txn={receipt} {...props} />
          ),
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        });
      },

      onPending: () => setCreateCollectionOfferStatus('PENDING'),
      onSuccess: (offerHash: string) => {
        gaEventTracker(ACTIONS.OFFER, LABELS.CREATE);
        console.log('Offer hash', offerHash);

        setCollectionOfferAmt('');
        setApr('');
        setDuration('');
        setCreateCollectionOfferStatus('SUCCESS');
        addNewlyAddedOfferHash(offerHash);
        setTimeout(() => setCreateCollectionOfferStatus('READY'), 1000);
      },
      onError: (e: any) => {
        alert(e.message);
        setCreateCollectionOfferStatus('ERROR');
        setTimeout(() => setCreateCollectionOfferStatus('READY'), 1000);
      },
    });
  };

  const { floorPrice } = useRaribleCollectionStats({
    contractAddress: nftContractAddress,
  });

  const debonucedTokenId = useDebounce(tokenId, RARIBLE_TOKEN_DEBOUNCE_MS);

  const fetchedNFT: any = useRaribleTokenMeta({
    contractAddress: nftContractAddress,
    tokenId: debonucedTokenId,
  });

  if (!nftContractAddress) {
    return null;
  }

  const offerLTV: number =
    (Number(collectionOfferAmt) / Number(floorPrice || 0)) * 100;

  return (
    <Box
      border="1px solid #EAD9FF"
      borderRadius="10px"
      px="19px"
      py="11px"
      bg="solid.white"
      boxShadow="0px 4px 24px 0px #4910921A"
      maxWidth="480px"
    >
      {type === 'token' ? (
        <TokenControl
          tokenId={tokenId}
          setTokenId={setTokenId}
          fetchedNFT={fetchedNFT}
          disabled={createCollectionOfferStatus !== 'READY'}
        />
      ) : null}
      <Text
        bg="#f7f7f7"
        borderRadius="8px"
        fontSize="sm"
        fontWeight="bold"
        py="9px"
        textAlign="center"
        color="solid.gray0"
      >
        HOW MUCH?
      </Text>
      <Grid
        gridTemplateColumns="repeat(3, minmax(0, 1fr))"
        my="18px"
        alignItems="center"
      >
        <GridItem colSpan={2}>
          <FormControl isInvalid={doesOfferAmountExceedAvailableLiquidity}>
            <InputGroup>
              <InputLeftElement sx={{ top: '17px', left: '16px' }}>
                <CryptoIcon symbol="eth" size={36} />
              </InputLeftElement>
              <Input
                placeholder={
                  availableEthLiquidity
                    ? `${availableEthLiquidity}Ξ available`
                    : ''
                }
                _placeholder={{
                  fontSize: 16,
                  transform: 'translateY(-4px)',
                }}
                type="number"
                onWheel={(e) => e.currentTarget.blur()}
                textAlign="left"
                value={collectionOfferAmt}
                onChange={(e) => setCollectionOfferAmt(e.target.value)}
                bg="#F9F3FF"
                p="15px 25px 15px 60px"
                borderRadius="20px"
                fontSize="3xl"
                h="auto"
                border="none"
                disabled={createCollectionOfferStatus !== 'READY'}
              />
            </InputGroup>
          </FormControl>
        </GridItem>
        <GridItem colSpan={1} textAlign="center" opacity={0.75}>
          <HStack spacing="20px" ml="1.85rem">
            <Text fontSize="md" fontWeight="bold" mb="6px">
              LTV
            </Text>
            <CircularProgress
              value={offerLTV}
              color="notification.notify"
              trackColor="notification.info"
              size="66px"
            >
              <CircularProgressLabel fontSize="sm" fontWeight="bold">
                {Humanize.formatNumber(Number(offerLTV), 1)}%
              </CircularProgressLabel>
            </CircularProgress>
          </HStack>
        </GridItem>
      </Grid>
      <Text
        bg="#f7f7f7"
        borderRadius="8px"
        fontSize="sm"
        fontWeight="bold"
        py="9px"
        textAlign="center"
        color="solid.gray0"
      >
        WHAT APR AND FOR HOW LONG?
      </Text>
      <Grid
        gridTemplateColumns="repeat(2, minmax(0, 1fr))"
        px="6px"
        columnGap="28px"
        mt="12px"
      >
        <GridItem>
          <Text fontSize="sm" textAlign="center" mb="12px" fontWeight="bold">
            APR
          </Text>
          <Box position="relative">
            <Input
              type="number"
              onWheel={(e) => e.currentTarget.blur()}
              value={apr}
              onChange={(e) => setApr(e.target.value)}
              bg="#F9F3FF"
              p="15px 25px"
              borderRadius="20px"
              fontSize="3xl"
              h="auto"
              border="none"
              disabled={createCollectionOfferStatus !== 'READY'}
            />
            <Text
              fontSize="20px"
              fontWeight={600}
              position="absolute"
              bottom="22px"
              right="24px"
              color="solid.gray0"
            >
              %
            </Text>
          </Box>
        </GridItem>
        <GridItem>
          <Text fontSize="sm" textAlign="center" mb="12px" fontWeight="bold">
            DURATION
          </Text>
          <Box position="relative">
            <FormControl isInvalid={!isDurationValid}>
              <InputGroup position="relative">
                <Input
                  type="number"
                  onWheel={(e) => e.currentTarget.blur()}
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  bg="#F9F3FF"
                  p="15px 25px"
                  borderRadius="20px"
                  fontSize="3xl"
                  h="auto"
                  border="none"
                  disabled={createCollectionOfferStatus !== 'READY'}
                />
                <InputRightElement>
                  <Text
                    fontSize="16px"
                    fontWeight={600}
                    color="solid.gray0"
                    position="absolute"
                    top="26px"
                    right="16px"
                  >
                    DAYS
                  </Text>
                </InputRightElement>
              </InputGroup>
              <Box>
                {!isDurationValid && (
                  <FormErrorMessage fontWeight={600}>
                    Minimum duration is 1 day
                  </FormErrorMessage>
                )}
              </Box>
            </FormControl>
          </Box>
        </GridItem>
      </Grid>
      <Text
        fontSize="md"
        fontWeight="bold"
        pt="24px"
        textAlign="center"
        color="solid.gray0"
      >
        Est. Profit: {estimatedProfit}
      </Text>
      <Button
        variant="neutralReverse"
        py="36px"
        borderRadius="15px"
        mt="20px"
        fontSize="md"
        w="100%"
        onClick={onCreateOffer}
        disabled={
          !walletAddress ||
          doesOfferAmountExceedAvailableLiquidity ||
          !isOfferReady ||
          createCollectionOfferStatus !== 'READY'
        }
        isLoading={createCollectionOfferStatus === 'PENDING'}
      >
        CREATE OFFER
      </Button>
      <FormControl isInvalid={doesOfferAmountExceedAvailableLiquidity}>
        <Box mt="8px">
          <Center>
            {doesOfferAmountExceedAvailableLiquidity && (
              <FormErrorMessage fontWeight={600} textAlign="center">
                <Link
                  style={{ textDecoration: 'underline' }}
                  to={lendersLiquidity()}
                >
                  Desposit more liquidity&nbsp;
                </Link>
                to create an offer
              </FormErrorMessage>
            )}
          </Center>
        </Box>
      </FormControl>
      <Flex
        alignItems="center"
        justifyContent="space-around"
        my="24px"
        mx="30px"
      >
        <Flex alignItems="center">
          <div>Expires in</div>
          <Box w="100px" ml="8px">
            <Select
              size="sm"
              onChange={(e) => setExpiration(e.target.value)}
              value={expiration}
            >
              <option value="1">1 day</option>
              <option value="7">7 days</option>
              <option value="30">30 days</option>
            </Select>
          </Box>
        </Flex>
        {type === 'offers' ? (
          <Flex alignItems="center">
            <div>Good for</div>
            <Box w="100px" ml="8px">
              <Select
                size="sm"
                onChange={(e) => setFloorTermLimit(e.target.value)}
                value={floorTermLimit}
              >
                <option value="5">5 Loans</option>
                <option value="10">10 Loans</option>
                <option value="30">30 Loans</option>
              </Select>
            </Box>
          </Flex>
        ) : null}
      </Flex>
    </Box>
  );
};
