import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Grid,
  GridItem,
  Input,
  Text,
} from '@chakra-ui/react';
import { useCreateCollectionOffer } from 'hooks/useCreateCollectionOffer';
import LoadingIndicator from 'components/atoms/LoadingIndicator';

interface CreateCollectionOfferProps {
  nftContractAddress: string;
}

const CreateCollectionOffer: React.FC<CreateCollectionOfferProps> = ({
  nftContractAddress,
}: {
  nftContractAddress: string;
}) => {
  const { createCollectionOffer } = useCreateCollectionOffer({ nftContractAddress });

  const [collectionOfferAmt, setCollectionOfferAmt] = useState<string>();
  const [apr, setApr] = useState<string>();
  const [duration, setDuration] = useState<string>();

  const [createCollectionOfferStatus, setCreateCollectionOfferStatus] = useState<string>('READY');

  return (
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
          <Input
            value={collectionOfferAmt}
            onChange={(e) => setCollectionOfferAmt(e.target.value)}
            bg="#F9F3FF"
            py="15px"
            paddingLeft="140px"
            paddingRight="25px"
            borderRadius="20px"
            fontSize="3xl"
            h="auto"
            border="none"
            disabled={createCollectionOfferStatus !== 'READY'}
          />
        </GridItem>
        <GridItem colSpan={1} textAlign="center">
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
        What APR and For How Long?
      </Text>
      <Grid gridTemplateColumns="repeat(2, minmax(0, 1fr))" px="6px" columnGap="28px" mt="12px">
        <GridItem>
          <Text fontSize="sm" textAlign="center" mb="12px" fontWeight="bold">
            APR
          </Text>
          <Box position="relative">
            <Input
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
              fontSize="11px"
              position="absolute"
              bottom="15px"
              right="25px"
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
            <Input
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
            <Text
              fontSize="11px"
              position="absolute"
              bottom="15px"
              right="25px"
              color="solid.gray0"
            >
              DAYS
            </Text>
          </Box>
        </GridItem>
      </Grid>
      <Button
        variant="neutralReverse"
        py="25px"
        borderRadius="15px"
        fontSize="sm"
        w="100%"
        mt="40px"
        onClick={() => {
          createCollectionOffer({
            amount: Number(collectionOfferAmt),
            aprInPercent: Number(apr),
            durationInDays: Number(duration),
            onPending: () => setCreateCollectionOfferStatus('PENDING'),
            onSuccess: () => {
              setCollectionOfferAmt('');
              setApr('');
              setDuration('');
              setCreateCollectionOfferStatus('SUCCESS');
              setTimeout(() => setCreateCollectionOfferStatus('READY'), 1000);
            },
            onError: (e: any) => {
              alert(e.message);
              setCreateCollectionOfferStatus('ERROR');
              setTimeout(() => setCreateCollectionOfferStatus('READY'), 1000);
            },
          });
        }}
        disabled={createCollectionOfferStatus !== 'READY'}
      >
        CREATE OFFER{' '}
        {createCollectionOfferStatus === 'PENDING' ? (
          <span style={{ paddingLeft: '8px' }}>
            <LoadingIndicator size="xs" />
          </span>
        ) : null}
      </Button>
      <Text textAlign="center" bg="#f7f7f7" py="10px" borderRadius="8px" mt="11px">
        Offer Will Expire in{' '}
        <Text as="span" color="primary.purple">
          30 Days
        </Text>
      </Text>
    </Box>
  );
};

export default CreateCollectionOffer;
