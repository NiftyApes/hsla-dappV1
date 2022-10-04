import { Box, Center, Flex, Table, Tag, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import CryptoIcon from 'components/atoms/CryptoIcon';
import LoadingIndicator from 'components/atoms/LoadingIndicator';
import { ethers } from 'ethers';
import { getAPR } from 'helpers/getAPR';
import { roundForDisplay } from 'helpers/roundForDisplay';
import { useCollectionOffers } from 'hooks/useCollectionOffers';
import { useWalletAddress } from 'hooks/useWalletAddress';
import _ from 'lodash';
import moment from 'moment';
import React, { useState } from 'react';
import { FaSort } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { DraftOffer } from './DraftOffer';

interface OfferBookProps {
  collectionOfferAmt: string;
  apr: string;
  duration: string;
  expiration: string;
  newlyAddedOfferHashes: string[];
}

const OfferBook: React.FC<OfferBookProps> = ({
  collectionOfferAmt,
  apr,
  duration,
  expiration,
  newlyAddedOfferHashes,
}) => {
  const { collectionAddress } = useParams();

  const walletAddress = useWalletAddress();

  const offers = useCollectionOffers({ nftContractAddress: collectionAddress });

  const expirationInMilliseconds =
    expiration === '1'
      ? 3600 * 24 * 1000
      : expiration === '7'
      ? 3600 * 24 * 7 * 1000
      : expiration === '30'
      ? 3600 * 24 * 30 * 1000
      : 0;

  const [sortOrder, setSortOrder] = useState<string>('APR_ASC');

  const sortedOffers: any =
    offers &&
    (!sortOrder
      ? offers
      : sortOrder === 'AMOUNT_ASC'
      ? _.sortBy(offers, (o) => o.amount)
      : sortOrder === 'AMOUNT_DESC'
      ? _.sortBy(offers, (o) => -o.amount)
      : sortOrder === 'APR_ASC'
      ? _.sortBy(offers, (o) =>
          getAPR({
            amount: o.amount,
            interestRatePerSecond: o.interestRatePerSecond,
          }),
        )
      : sortOrder === 'APR_DESC'
      ? _.sortBy(
          offers,
          (o) =>
            -getAPR({
              amount: o.amount,
              interestRatePerSecond: o.interestRatePerSecond,
            }),
        )
      : sortOrder === 'DURATION_ASC'
      ? _.sortBy(offers, (o) => o.duration)
      : sortOrder === 'DURATION_DESC'
      ? _.sortBy(offers, (o) => -o.duration)
      : sortOrder === 'EXPIRATION_ASC'
      ? _.sortBy(offers, (o) => o.expiration)
      : sortOrder === 'EXPIRATION_DESC'
      ? _.sortBy(offers, (o) => -o.expiration)
      : offers);

  const sortDraftOfferIndex =
    sortedOffers &&
    _.sortedIndexBy(
      sortedOffers,
      {
        amount: collectionOfferAmt,
        apr,
        duration: Number(duration) * 3600 * 24,
        expiration: expirationInMilliseconds,
      },
      (o: any) => {
        return sortOrder === 'AMOUNT_ASC'
          ? typeof o.amount === 'string'
            ? Number(o.amount)
            : Number(ethers.utils.formatEther(o.amount))
          : sortOrder === 'AMOUNT_DESC'
          ? typeof o.amount === 'string'
            ? -Number(o.amount)
            : -Number(ethers.utils.formatEther(o.amount))
          : sortOrder === 'APR_ASC'
          ? o.apr
            ? o.apr
            : getAPR({
                amount: o.amount,
                interestRatePerSecond: o.interestRatePerSecond,
              })
          : sortOrder === 'APR_DESC'
          ? o.apr
            ? -o.apr
            : -getAPR({
                amount: o.amount,
                interestRatePerSecond: o.interestRatePerSecond,
              })
          : sortOrder === 'DURATION_ASC'
          ? o.duration
          : sortOrder === 'DURATION_DESC'
          ? -o.duration
          : sortOrder === 'EXPIRATION_ASC'
          ? o.expiration
          : sortOrder === 'EXPIRATION_DESC'
          ? -o.expiration
          : o.apr
          ? o.apr
          : getAPR({
              amount: o.amount,
              interestRatePerSecond: o.interestRatePerSecond,
            });
      },
    );

  if (
    !_.isNil(sortDraftOfferIndex) &&
    collectionOfferAmt &&
    apr &&
    duration &&
    expirationInMilliseconds
  ) {
    sortedOffers.splice(sortDraftOfferIndex, 0, 'DRAFT_OFFER');
  }

  return (
    <Box ml="48px">
      <Text
        fontWeight="bold"
        color="solid.gray0"
        mb="13px"
        sx={{ position: 'relative', top: '-16px', left: '4px' }}
      >
        OFFER BOOK DATA
      </Text>
      <Table>
        <Thead
          sx={{
            'tr:first-of-type > th:first-of-type': {
              borderTopLeftRadius: '8px',
            },
            'tr:first-of-type > th:last-child': {
              borderTopRightRadius: '8px',
            },
            'tr:last-child > th:first-of-type': {
              borderBottomLeftRadius: '8px',
            },
            'tr:last-child > th:last-child': {
              borderBottomRightRadius: '8px',
            },
          }}
        >
          <Tr
            background="#F7F7F7"
            sx={{
              '& > th': {
                fontWeight: 'bold',
                fontSize: '2xs',
                color: 'solid.gray0',
                textAlign: 'center',
                border: 'none',
                py: '10px',
              },
            }}
          >
            <Th>
              <Flex alignItems="center" justifyContent="center">
                Amount{' '}
                <span
                  style={{ cursor: 'pointer', marginLeft: '2px' }}
                  onClick={() => {
                    if (sortOrder !== 'AMOUNT_ASC') {
                      setSortOrder('AMOUNT_ASC');
                    } else {
                      setSortOrder('AMOUNT_DESC');
                    }
                  }}
                >
                  <FaSort size="18px" />
                </span>
              </Flex>
            </Th>
            <Th>
              <Flex alignItems="center" justifyContent="center">
                APR{' '}
                <span
                  style={{ cursor: 'pointer', marginLeft: '2px' }}
                  onClick={() => {
                    if (sortOrder !== 'APR_ASC') {
                      setSortOrder('APR_ASC');
                    } else {
                      setSortOrder('APR_DESC');
                    }
                  }}
                >
                  <FaSort size="18px" />
                </span>
              </Flex>
            </Th>
            <Th>
              <Flex alignItems="center" justifyContent="center">
                Loan Duration{' '}
                <span
                  style={{ cursor: 'pointer', marginLeft: '2px' }}
                  onClick={() => {
                    if (sortOrder !== 'DURATION_ASC') {
                      setSortOrder('DURATION_ASC');
                    } else {
                      setSortOrder('DURATION_DESC');
                    }
                  }}
                >
                  <FaSort size="18px" />
                </span>
              </Flex>
            </Th>
            <Th minW="15rem">
              <Flex alignItems="center" justifyContent="center">
                Offer Expires{' '}
                <span
                  style={{ cursor: 'pointer', marginLeft: '2px' }}
                  onClick={() => {
                    if (sortOrder !== 'EXPIRATION_ASC') {
                      setSortOrder('EXPIRATION_ASC');
                    } else {
                      setSortOrder('EXPIRATION_DESC');
                    }
                  }}
                >
                  <FaSort size="18px" />
                </span>
              </Flex>
            </Th>
            <Th></Th>{' '}
          </Tr>
        </Thead>
        <Tbody
          sx={
            !sortedOffers?.includes('DRAFT_OFFER')
              ? {
                  'tr:nth-child(2n)': {
                    backgroundColor: 'solid.white',
                  },
                  'tr:nth-child(2n+1)': {
                    backgroundColor: 'transparent',
                  },
                }
              : {}
          }
        >
          {sortedOffers?.map((offer: any, i: number) => {
            return offer === 'DRAFT_OFFER' ? (
              <DraftOffer
                key={i}
                collectionOfferAmt={Number(collectionOfferAmt)}
                apr={Number(apr)}
                duration={Number(duration)}
                expirationInMilliseconds={expirationInMilliseconds}
              />
            ) : (
              <Tr
                key={i}
                sx={{
                  td: {
                    backgroundColor: newlyAddedOfferHashes.includes(offer.offerHash)
                      ? 'yellow.100'
                      : 'auto',
                    border: 'none',
                    fontSize: 'md',
                    textAlign: 'center',
                  },
                }}
              >
                <Td
                  sx={{
                    position: 'relative',
                  }}
                >
                  <span style={{ whiteSpace: 'nowrap' }}>
                    {walletAddress && walletAddress === offer.creator && (
                      <Tag
                        bgColor="orange.300"
                        color="white"
                        fontSize="xs"
                        fontWeight={600}
                        sx={{
                          position: 'absolute',
                          left: '-24px',
                          top: '14px',
                        }}
                      >
                        YOURS
                      </Tag>
                    )}
                    <Flex alignItems="center" justifyContent="center">
                      <CryptoIcon symbol="eth" size={16} />
                      <Text ml="8px">{ethers.utils.formatEther(offer.amount)}</Text>
                    </Flex>
                  </span>
                </Td>
                <Td>
                  <Text>
                    {roundForDisplay(
                      getAPR({
                        amount: offer.amount,
                        interestRatePerSecond: offer.interestRatePerSecond,
                      }),
                    )}
                    %
                  </Text>
                </Td>
                <Td>
                  <Text>
                    {moment.duration(offer.duration, 'seconds').asDays()} day
                    {moment.duration(offer, 'days').asDays() !== 1 && 's'}
                  </Text>
                </Td>
                <Td>
                  <Text>{moment(offer.expiration * 1000).format('h:mma, MMM D YYYY')}</Text>
                </Td>
                <Td></Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      {!sortedOffers && (
        <Center fontSize="24px" my="2rem">
          Loading offers{' '}
          <Box ml="3rem">
            <LoadingIndicator />
          </Box>
        </Center>
      )}
    </Box>
  );
};

export default OfferBook;
