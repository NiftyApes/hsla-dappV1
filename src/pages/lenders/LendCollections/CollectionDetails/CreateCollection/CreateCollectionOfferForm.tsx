import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
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
import { SECONDS_IN_YEAR } from 'constants/misc';
import { useCreateCollectionOffer } from 'hooks/useCreateCollectionOffer';
import { useAvailableEthLiquidity } from 'hooks/useEthLiquidity';
import { useWalletAddress } from 'hooks/useWalletAddress';
import _ from 'lodash';
import React, { useMemo, useState } from 'react';

interface CreateCollectionOfferFormProps {
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
  openSuccessfulOrderCreationModal: () => void;
  floorTermLimit: string;
  setFloorTermLimit: React.Dispatch<React.SetStateAction<string>>;
}

export const CreateCollectionOfferForm: React.FC<CreateCollectionOfferFormProps> = ({
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
  floorTermLimit,
  setFloorTermLimit
}) => {
  const { createCollectionOffer } = useCreateCollectionOffer({ nftContractAddress });

  const [createCollectionOfferStatus, setCreateCollectionOfferStatus] = useState<string>('READY');

  const { availableEthLiquidity } = useAvailableEthLiquidity();

  const doesOfferAmountExceedAvailableLiquidity =
    !_.isNil(availableEthLiquidity) && Number(collectionOfferAmt) > availableEthLiquidity;

  const isDurationLessThanOneDay = duration !== '' && Number(duration) < 1;

  const walletAddress = useWalletAddress();

  const estimatedProfit = useMemo(() => {
    const APRPercentage = Number(apr) / 100;
    const amountCalculation = Number(collectionOfferAmt) * 1e18;

    const interestRatePerSecond = Math.round((APRPercentage * amountCalculation) / SECONDS_IN_YEAR);

    return interestRatePerSecond * Number(duration)
  }, [apr, collectionOfferAmt, duration]);

  console.log({ estimatedProfit });

  const onCreateOffer = () => {
    createCollectionOffer({
      amount: Number(collectionOfferAmt),
      aprInPercent: Number(apr),
      durationInDays: Number(duration),
      expirationInDays: Number(expiration),
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
  };

  return (
    <>
      <Box
        border="1px solid #EAD9FF"
        borderRadius="10px"
        px="19px"
        py="11px"
        bg="solid.white"
        boxShadow="0px 4px 24px 0px #4910921A">
        <Text
          bg="#f7f7f7"
          borderRadius="8px"
          fontSize="sm"
          fontWeight="bold"
          py="9px"
          textAlign="center"
          color="solid.gray0">
          HOW MUCH?
        </Text>
        <Grid gridTemplateColumns="repeat(3, minmax(0, 1fr))" my="18px" alignItems="center">
          <GridItem colSpan={3}>
            <FormControl isInvalid={doesOfferAmountExceedAvailableLiquidity}>
              <InputGroup>
                <InputLeftElement sx={{ top: '17px', left: '16px' }}>
                  <CryptoIcon symbol="eth" size={36} />
                </InputLeftElement>
                <Input
                  placeholder={availableEthLiquidity ? `${availableEthLiquidity}Ξ available` : ''}
                  _placeholder={{
                    fontSize: 16,
                    textAlign: 'left',
                    paddingLeft: 50,
                    transform: 'translateY(-4px)'
                  }}
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
            </FormControl>
          </GridItem>
        </Grid>
        <Text
          bg="#f7f7f7"
          borderRadius="8px"
          fontSize="sm"
          fontWeight="bold"
          py="9px"
          textAlign="center"
          color="solid.gray0">
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
                color="solid.gray0">
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
                      right="16px">
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
            isDurationLessThanOneDay ||
            createCollectionOfferStatus !== 'READY'
          }
          isLoading={createCollectionOfferStatus === 'PENDING'}
          >
          CREATE OFFER
        </Button>
        <Flex alignItems="center" justifyContent="space-around" my="24px" mx="30px">
          <Flex alignItems="center">
            <div>
              Expires in{' '}
            </div>
            <Box w="120px" ml="8px">
              <Select size="sm" onChange={(e) => setExpiration(e.target.value)} value={expiration}>
                <option value="1">1 day</option>
                <option value="7">7 days</option>
                <option value="30">30 days</option>
              </Select>
            </Box>
          </Flex>
          <Flex alignItems="center">
            <div>
              Good for{' '}
            </div>
            <Box w="120px" ml="8px">
              <Select size="sm" onChange={(e) => setFloorTermLimit(e.target.value)} value={floorTermLimit}>
                <option value="5">5 Loans</option>
                <option value="10">10 Loans</option>
                <option value="30">30 Loans</option>
              </Select>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
