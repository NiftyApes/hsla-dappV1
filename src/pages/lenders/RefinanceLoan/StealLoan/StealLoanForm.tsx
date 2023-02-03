import Humanize from 'humanize-plus';

import {
  Box,
  Button,
  Center,
  CircularProgress,
  CircularProgressLabel,
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  useToast,
} from '@chakra-ui/react';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import CryptoIcon from 'components/atoms/CryptoIcon';
import { NonTxnToastSuccessCard } from 'components/cards/NonTxnToastSuccessCard';
import { ACTIONS, CATEGORIES, LABELS } from 'constants/googleAnalytics';
import { useAnalyticsEventTracker } from 'hooks/useAnalyticsEventTracker';
import { useCreateOffer } from 'hooks/useCreateOffer';
import { useAvailableEthLiquidity } from 'hooks/useEthLiquidity';
import { useRaribleCollectionStats } from 'hooks/useRaribleColectionStats';
import { useWalletAddress } from 'hooks/useWalletAddress';
import JSConfetti from 'js-confetti';
import _ from 'lodash';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { lendersLiquidity } from 'routes/router';
import { ToastSuccessCard } from '../../../../components/cards/ToastSuccessCard';
import TokenControl from './TokenControl';
import { OfferTypes } from '../constants';

interface StealLoanFormProps {
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
  fetchedNFT: Record<string, any>;
}

export const StealLoanForm: React.FC<StealLoanFormProps> = ({
  type,
  nftContractAddress,
  collectionOfferAmt,
  setCollectionOfferAmt,
  apr,
  setApr,
  duration,
  setDuration,
  expiration,
  addNewlyAddedOfferHash,
  floorTermLimit,
  setTokenId,
  tokenId,
  fetchedNFT,
}) => {
  const gaEventTracker = useAnalyticsEventTracker(CATEGORIES.LENDERS);
  const { createOffer } = useCreateOffer({
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

  const onCreateOffer = () => {
    createOffer({
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
      onSuccess: (offerHash: string, isSignatureBased = false) => {
        gaEventTracker(ACTIONS.OFFER, LABELS.CREATE);
        if (isSignatureBased) {
          jsConfetti.addConfetti({
            emojis: ['🍌'],
            emojiSize: 80,
            confettiNumber: 50,
          });

          toast({
            render: (props) => (
              <NonTxnToastSuccessCard title="Offer Created" {...props} />
            ),
            position: 'top-right',
            duration: 9000,
            isClosable: true,
          });
        }
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
        STEAL LOAN
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
    </Box>
  );
};
