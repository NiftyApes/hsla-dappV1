import { Box, Button, Flex, Td, Text, Tr } from '@chakra-ui/react';

import Icon from 'components/atoms/Icon';
import { ethers } from 'ethers';
import { getAPR } from 'helpers/getAPR';
import { roundForDisplay } from 'helpers/roundForDisplay';
import { useCancelOffer } from 'hooks/useCancelOffer';
import moment from 'moment';

export const OfferRow = ({ offer, offerHash }: any) => {
  const { cancelOffer } = useCancelOffer({
    nftContractAddress: offer.nftContractAddress,
    nftId: offer.nftId,
    offerHash,
  });

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
        <Flex flexDir="column" alignItems="center" justifyContent="center">
          <Text fontWeight="bold" fontSize="xs" color="solid.gray0" mt="4px">
            <span
              style={{
                display: 'inline-block',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                width: '80px',
              }}
            >
              {offer.nftContractAddress}
            </span>
          </Text>
          <Flex>
            <Icon name="os" size={25} />
            <Box border="2px solid" borderRadius="50%" borderColor="solid.white" bgColor="white">
              <Icon name="etherscan" size={20} />
            </Box>
          </Flex>
          {!(offer.nftId === 0) && (
            <Text fontWeight="bold" fontSize="sm">
              #{offer.nftId}
            </Text>
          )}
        </Flex>
      </Td>
      <Td>
        <Flex>
          <Box flex="1" />
          <Flex flexDirection="column" alignItems="flex-start" justifyContent="flex-start">
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
        <Text fontSize="md" fontWeight="bold" color={hasExpired ? 'notification.info' : '#24DFA5'}>
          {hasExpired ? 'Expired' : 'Active'}
        </Text>
        {hasExpired
          ? `Expired ${moment(offer.expiration * 1000).toNow(true)} ago`
          : `Expires in ${moment(offer.expiration * 1000).toNow(true)}`}
      </Td>
      <Td>
        {!hasExpired && (
          <Flex flexDir="column" alignItems="center">
            <Button variant="neutral" onClick={cancelOffer}>
              Cancel
            </Button>
          </Flex>
        )}
      </Td>
    </Tr>
  );
};
