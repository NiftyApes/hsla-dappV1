import { useEffect } from 'react';
import { Button, Flex, Td, Text, Tr, useToast } from '@chakra-ui/react';

import LoadingIndicator from 'components/atoms/LoadingIndicator';
import { ethers } from 'ethers';
import { getAPR } from 'helpers/getAPR';
import { roundForDisplay } from 'helpers/roundForDisplay';
import { useCancelOffer } from 'hooks/useCancelOffer';
import moment from 'moment';
import { useAnalyticsEventTracker } from 'hooks/useAnalyticsEventTracker';
import { ACTIONS, CATEGORIES, LABELS } from 'constants/googleAnalytics';
import { ToastSuccessCard } from '../../../../components/cards/ToastSuccessCard';
import NFTCollectionCardSmall from '../../../../components/cards/NFTCollectionCardSmall';

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
  const { isCancelled } = offer;

  const getLabel = () => {
    if (isCancelled) {
      return 'Cancelled';
    }

    if (hasExpired) {
      return 'Expired';
    }

    return 'Active';
  };

  const getColor = () => {
    if (isCancelled) {
      return 'red.400';
    }

    if (hasExpired) {
      return 'notification.info';
    }

    return '#24DFA5';
  };

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
        <Text fontSize="md" fontWeight="bold" color={getColor()}>
          {getLabel()}
        </Text>
        <small>
          {hasExpired
            ? `Expired ${moment(offer.expiration * 1000).toNow(true)} ago`
            : `Expires in ${moment(offer.expiration * 1000).toNow(true)}`}
        </small>
      </Td>
      <Td>
        <Text fontSize="md" fontWeight="bold">
          {`${offer.floorOfferCount}/${offer.floorTermLimit} `}
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
