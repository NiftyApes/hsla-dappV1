import { Box, Button, Flex, Td, Text, Tr, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';

import LoadingIndicator from 'components/atoms/LoadingIndicator';
import { ethers } from 'ethers';
import { getAPR } from 'helpers/getAPR';
import { roundForDisplay } from 'helpers/roundForDisplay';
import { useCancelOffer } from 'hooks/useCancelOffer';
import moment from 'moment';
import NFTCollectionCardSmall from '../../../../components/cards/NFTCollectionCardSmall';
import { ToastSuccessCard } from '../../../../components/cards/ToastSuccessCard';

export const OfferRow = ({ offer, offerHash, index }: any) => {
  const toast = useToast();

  console.log('offer', offer);

  const { cancelOffer, cancelStatus, txReceipt } = useCancelOffer({
    nftContractAddress: offer.nftContractAddress,
    nftId: offer.nftId,
    offerHash,
    offer,
  });

  useEffect(() => {
    if (cancelStatus === 'SUCCESS' && txReceipt) {
      toast({
        render: (props) => (
          <ToastSuccessCard
            title="Offer Cancelled"
            txn={txReceipt}
            {...props}
          />
        ),
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      });
    }
  }, [cancelStatus, txReceipt]);

  if (!offer) {
    return null;
  }

  const expirationMoment = moment(offer.expiration * 1000);
  const hasExpired = moment().isAfter(expirationMoment);

  return (
    <Tr
      border="1px solid #eee"
      sx={{
        td: {
          border: 'none',
          fontSize: 'md',
          textAlign: 'center',
        },
      }}
    >
      <Td>
        <NFTCollectionCardSmall
          throttle={250 * index}
          contractAddress={offer.nftContractAddress}
        />
      </Td>
      <Td>
        <Flex>
          <Box flex="1" />
          <Flex
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="flex-start"
          >
            <Box mb="2px">
              <Text as="span" fontSize="xl" fontWeight="bold">
                {ethers.utils.formatEther(offer.amount)}Ξ
              </Text>{' '}
              <Text as="span" color="#555">
                {moment.duration(offer.duration, 'seconds').asDays()} days,
              </Text>
            </Box>
            <Box>
              <Text as="span" fontWeight="bold">
                {roundForDisplay(
                  getAPR({
                    amount: offer.amount,
                    interestRatePerSecond: offer.interestRatePerSecond,
                  }),
                )}
                %
              </Text>{' '}
              <Text as="span" color="#555">
                APR
              </Text>
            </Box>
          </Flex>
          <Box flex="1" />
        </Flex>
      </Td>
      <Td>
        <Text
          fontSize="md"
          fontWeight="bold"
          color={hasExpired ? 'notification.info' : '#24DFA5'}
        >
          {hasExpired ? 'Expired' : 'Active'}
        </Text>
        {hasExpired
          ? `Expired ${moment(offer.expiration * 1000).toNow(true)} ago`
          : `Expires in ${moment(offer.expiration * 1000).toNow(true)}`}
      </Td>
      <Td>
        {!hasExpired && (
          <Flex flexDir="column" alignItems="center">
            <Button
              disabled={cancelStatus !== 'READY'}
              variant="neutral"
              onClick={cancelOffer}
            >
              Cancel
              {cancelStatus !== 'READY' ? (
                <Flex as="span" alignItems="center" ml="8px">
                  <LoadingIndicator size="sm" />
                </Flex>
              ) : null}
            </Button>
          </Flex>
        )}
      </Td>
    </Tr>
  );
};
