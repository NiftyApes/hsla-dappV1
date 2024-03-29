import { Button, Flex, Td, Text, Tr, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';

import LoadingIndicator from 'components/atoms/LoadingIndicator';
import { ACTIONS, CATEGORIES, LABELS } from 'constants/googleAnalytics';
import { ethers } from 'ethers';
import { getAPR } from 'helpers/getAPR';
import { roundForDisplay } from 'helpers/roundForDisplay';
import { useAnalyticsEventTracker } from 'hooks/useAnalyticsEventTracker';
import { useCancelOffer } from 'hooks/useCancelOffer';
import moment from 'moment';
import NFTCollectionCardSmall from '../../../../components/cards/NFTCollectionCardSmall';
import { ToastSuccessCard } from '../../../../components/cards/ToastSuccessCard';

const i18n = {
  durationAndApr: (offer: any) =>
    `${moment
      .duration(offer.duration, 'seconds')
      .asDays()} days, ${roundForDisplay(
      getAPR({
        amount: offer.amount,
        interestRatePerSecond: offer.interestRatePerSecond,
      }),
    )}% APR`,
};

export const OfferRow = ({ offer, offerHash, index }: any) => {
  const gaEventTracker = useAnalyticsEventTracker(CATEGORIES.LENDERS);
  const toast = useToast();

  const { cancelOffer, cancelStatus, txReceipt } = useCancelOffer({
    nftContractAddress: offer.nftContractAddress,
    nftId: offer.nftId,
    offerHash,
    offer,
  });

  useEffect(() => {
    if (cancelStatus === 'SUCCESS' && txReceipt) {
      gaEventTracker(ACTIONS.OFFER, LABELS.CANCEL);
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
          tokenId={offer.nftId}
          throttle={100 * index}
          contractAddress={offer.nftContractAddress}
        />
      </Td>
      <Td>
        <Text fontSize="md" fontWeight="bold">
          {ethers.utils.formatEther(offer.amount)}Ξ
        </Text>
        <small>{i18n.durationAndApr(offer)}</small>
      </Td>
      <Td>
        <Text
          fontSize="md"
          fontWeight="bold"
          color={hasExpired ? 'notification.info' : '#24DFA5'}
        >
          {hasExpired ? 'Expired' : 'Active'}
        </Text>
        <small>
          {hasExpired
            ? `Expired ${moment(offer.expiration * 1000).toNow(true)} ago`
            : `Expires in ${moment(offer.expiration * 1000).toNow(true)}`}
        </small>
      </Td>
      <Td>
        <Text fontSize="md" fontWeight="bold">
          {offer.floorTerm
            ? `${offer.floorOfferCount}/${offer.floorTermLimit}`
            : `0/1 `}
        </Text>
        <small>loans used</small>
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
