import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Text,
} from '@chakra-ui/react';
import CryptoIcon from 'components/atoms/CryptoIcon';
import LoadingIndicator from 'components/atoms/LoadingIndicator';
import { useCreateCollectionOffer } from 'hooks/useCreateCollectionOffer';
import { useEasyOfferForCollection } from 'hooks/useEasyOfferForCollection';
import { useAvailableEthLiquidity } from 'hooks/useEthLiquidity';
import _ from 'lodash';
import React, { useState } from 'react';
import { EasyBtnPopover } from './EasyBtnPopover';

interface CreateCollectionOfferProps {
  nftContractAddress: string;
}

export const CreateCollectionOfferForm: React.FC<any> = ({
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
  openSuccessfulOrderCreationModal,
}: any) => {
  const { createCollectionOffer } = useCreateCollectionOffer({ nftContractAddress });

  const [createCollectionOfferStatus, setCreateCollectionOfferStatus] = useState<string>('READY');

  const { easyOfferAmount, easyOfferApr, easyOfferDuration } = useEasyOfferForCollection({
    nftContractAddress,
  });

  const { availableEthLiquidity } = useAvailableEthLiquidity();

  const doesOfferAmountExceedAvailableLiquidity =
    !_.isNil(availableEthLiquidity) && collectionOfferAmt > availableEthLiquidity;

  console.log('duration', duration, typeof duration, !_.isNil(duration));

  const isDurationLessThanOneDay = duration !== '' && Number(duration) < 1;

  return (
    <>
      <Box
        border="1px solid #EAD9FF"
        borderRadius="10px"
        px="19px"
        py="11px"
        bg="solid.white"
        boxShadow="0px 4px 24px 0px #4910921A"
      >
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
        <Grid gridTemplateColumns="repeat(3, minmax(0, 1fr))" my="18px" alignItems="center">
          <GridItem colSpan={2}>
            <FormControl isInvalid={doesOfferAmountExceedAvailableLiquidity}>
              <InputGroup>
                <InputLeftElement sx={{ top: '17px', left: '16px' }}>
                  <CryptoIcon symbol="eth" size={36} />
                </InputLeftElement>
                <Input
                  type="number"
                  textAlign="right"
                  value={collectionOfferAmt}
                  onChange={(e) => setCollectionOfferAmt(e.target.value)}
                  bg="#F9F3FF"
                  p="15px 25px"
                  borderRadius="20px"
                  fontSize="3xl"
                  h="auto"
                  border="none"
                  disabled={createCollectionOfferStatus !== 'READY'}
                />
              </InputGroup>
              <Box ml="4px">
                {doesOfferAmountExceedAvailableLiquidity ? (
                  <FormErrorMessage fontWeight={600}>
                    Your available liquidity is {availableEthLiquidity}Ξ
                  </FormErrorMessage>
                ) : (
                  <FormHelperText>
                    Your available liquidity is {availableEthLiquidity}Ξ
                  </FormHelperText>
                )}
              </Box>
            </FormControl>
          </GridItem>
          <GridItem colSpan={1} textAlign="center" opacity={0.5}>
            <Text fontSize="md" fontWeight="bold" mb="6px">
              LTV
            </Text>
            <CircularProgress
              value={40}
              color="notification.notify"
              trackColor="notification.info"
              size="66px"
            >
              <CircularProgressLabel fontSize="sm" fontWeight="bold">
                21.0%
              </CircularProgressLabel>
            </CircularProgress>
            <Text fontSize="sm" fontWeight="bold" color="solid.gray0" mt="6px">
              100Ξ Floor
            </Text>
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
        <Grid gridTemplateColumns="repeat(2, minmax(0, 1fr))" px="6px" columnGap="28px" mt="12px">
          <GridItem>
            <Text fontSize="sm" textAlign="center" mb="12px" fontWeight="bold">
              APR
            </Text>
            <Box position="relative">
              <Input
                type="number"
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
              <FormControl isInvalid={isDurationLessThanOneDay}>
                <InputGroup position="relative">
                  <Input
                    type="number"
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
                <Box ml="4px">
                  {isDurationLessThanOneDay && (
                    <FormErrorMessage fontWeight={600}>
                      Duration must be at least 1 day
                    </FormErrorMessage>
                  )}
                </Box>
              </FormControl>
            </Box>
          </GridItem>
        </Grid>
        <Flex alignItems="center" justifyContent="center" my="24px">
          Offer Expires in{' '}
          <Box w="120px" ml="8px">
            <Select size="sm" onChange={(e) => setExpiration(e.target.value)} value={expiration}>
              <option value="1_DAY">1 day</option>
              <option value="7_DAYS">7 days</option>
              <option value="30_DAYS">30 days</option>
            </Select>
          </Box>
        </Flex>
        <Button
          variant="neutral"
          py="36px"
          borderRadius="15px"
          fontSize="md"
          w="100%"
          disabled={easyOfferApr <= 0}
          onClick={() => {
            setCollectionOfferAmt(easyOfferAmount);
            setApr(easyOfferApr);
            setDuration(easyOfferDuration);
          }}
        >
          <em>EASY BUTTON</em>
        </Button>
        <Flex alignItems="center" justifyContent="center" mt="8px" mb="12px">
          <Text textAlign="center" mr="8px" mb="2px">
            <em>Create The Best Offer In The Orderbook</em>
          </Text>
          <EasyBtnPopover />
        </Flex>
      </Box>
      <Button
        variant="neutralReverse"
        py="36px"
        borderRadius="15px"
        mt="20px"
        fontSize="md"
        w="100%"
        onClick={() => {
          createCollectionOffer({
            amount: Number(collectionOfferAmt),
            aprInPercent: Number(apr),
            durationInDays: Number(duration),
            onPending: () => setCreateCollectionOfferStatus('PENDING'),
            onSuccess: (offerHash: string) => {
              setCollectionOfferAmt('');
              setApr('');
              setDuration('');
              setCreateCollectionOfferStatus('SUCCESS');
              addNewlyAddedOfferHash(offerHash);
              openSuccessfulOrderCreationModal();
              setTimeout(() => setCreateCollectionOfferStatus('READY'), 1000);
            },
            onError: (e: any) => {
              alert(e.message);
              setCreateCollectionOfferStatus('ERROR');
              setTimeout(() => setCreateCollectionOfferStatus('READY'), 1000);
            },
          });
        }}
        disabled={
          doesOfferAmountExceedAvailableLiquidity ||
          isDurationLessThanOneDay ||
          createCollectionOfferStatus !== 'READY'
        }
      >
        CREATE OFFER{' '}
        {createCollectionOfferStatus === 'PENDING' ? (
          <span style={{ paddingLeft: '8px' }}>
            <LoadingIndicator size="xs" />
          </span>
        ) : null}
      </Button>
    </>
  );
};