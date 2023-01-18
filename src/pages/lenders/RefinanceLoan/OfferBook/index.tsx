/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  Box,
  Center,
  Flex,
  HStack,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import LoadingIndicator from 'components/atoms/LoadingIndicator';
import { ethers } from 'ethers';
import { getAPR } from 'helpers/getAPR';
import { useCollectionOffers } from 'hooks/useCollectionOffers';
import _ from 'lodash';
import React, { useState } from 'react';
import { FaSortDown, FaSortUp } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { DraftOffer } from './DraftOffer';
import BookOfferRow from './OfferRow';

interface OfferBookProps {
  collectionOfferAmt: string;
  apr: string;
  duration: string;
  expiration: string;
  newlyAddedOfferHashes: string[];
  tokenId: string;
}

const OfferBook: React.FC<OfferBookProps> = ({
  collectionOfferAmt,
  apr,
  duration,
  expiration,
  newlyAddedOfferHashes,
  tokenId,
}) => {
  const { collectionAddress } = useParams();

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
      : sortOrder === 'ASSET_ASC'
      ? _.sortBy(offers, (o) => o.nftId)
      : sortOrder === 'ASSET_DESC'
      ? _.sortBy(offers, (o) => -o.nftId)
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
          : sortOrder === 'ASSET_ASC'
          ? o.nftId
          : sortOrder === 'ASSET_DESC'
          ? -o.nftId
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
    <Box>
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
                  <HStack spacing="2px">
                    <Box>Amount</Box>
                    {sortOrder === 'AMOUNT_ASC' && <FaSortUp size="18px" />}
                    {sortOrder === 'AMOUNT_DESC' && <FaSortDown size="18px" />}
                  </HStack>
                </span>
              </Flex>
            </Th>
            <Th>
              <Flex alignItems="center" justifyContent="center">
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
                  <HStack spacing="2px">
                    <Box>APR</Box>
                    {sortOrder === 'APR_ASC' && <FaSortUp size="18px" />}
                    {sortOrder === 'APR_DESC' && <FaSortDown size="18px" />}
                  </HStack>
                </span>
              </Flex>
            </Th>
            <Th>
              <Flex alignItems="center" justifyContent="center">
                <span
                  style={{ cursor: 'pointer', marginLeft: '2px' }}
                  onClick={() => {
                    if (sortOrder !== 'ASSET_ASC') {
                      setSortOrder('ASSET_ASC');
                    } else {
                      setSortOrder('ASSET_DESC');
                    }
                  }}
                >
                  <HStack spacing="2px">
                    <Box>Asset</Box>
                    {sortOrder === 'ASSET_ASC' && <FaSortUp size="18px" />}
                    {sortOrder === 'ASSET_DESC' && <FaSortDown size="18px" />}
                  </HStack>
                </span>
              </Flex>
            </Th>
            <Th>
              <Flex alignItems="center" justifyContent="center">
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
                  <HStack spacing="2px">
                    <Box>Loan Duration</Box>
                    {sortOrder === 'DURATION_ASC' && <FaSortUp size="18px" />}
                    {sortOrder === 'DURATION_DESC' && (
                      <FaSortDown size="18px" />
                    )}
                  </HStack>
                </span>
              </Flex>
            </Th>
            <Th minW="15rem">
              <Flex alignItems="center" justifyContent="center">
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
                  <HStack spacing="2px">
                    <Box>Offer Expires</Box>
                    {sortOrder === 'EXPIRATION_ASC' && <FaSortUp size="18px" />}
                    {sortOrder === 'EXPIRATION_DESC' && (
                      <FaSortDown size="18px" />
                    )}
                  </HStack>
                </span>
              </Flex>
            </Th>
            <Th />{' '}
          </Tr>
        </Thead>
        <Tbody
          sx={
            !sortedOffers?.includes('DRAFT_OFFER')
              ? {
                  'tr:nth-of-type(2n)': {
                    backgroundColor: 'solid.white',
                  },
                  'tr:nth-of-type(2n+1)': {
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
                tokenId={tokenId}
                collectionAddress={collectionAddress}
              />
            ) : (
              <BookOfferRow
                offer={offer}
                newlyAddedOfferHashes={newlyAddedOfferHashes}
              />
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
