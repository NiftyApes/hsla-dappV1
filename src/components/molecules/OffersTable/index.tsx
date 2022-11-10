/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  HStack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import CryptoIcon from 'components/atoms/CryptoIcon';
import { BigNumber, ethers } from 'ethers';
import { getAPR } from 'helpers/getAPR';
import _ from 'lodash';
import { FaSortDown, FaSortUp } from 'react-icons/fa';
import { LoanOffer } from '../../../loan';
import { roundForDisplay } from '../../../helpers/roundForDisplay';

interface CallbackType {
  (offer: LoanOffer): void;
}

interface Props {
  offers: Array<LoanOffer>;
  onClick: CallbackType;
}

const i18n = {
  colDuration: 'duration',
  colApr: 'apr',
  colAmount: 'amount',
  action: 'borrow',
};

const OffersTable: React.FC<Props> = ({ offers, onClick }) => {
  const [sortOrder, setSortOrder] = useState<string>('AMOUNT_DESC');

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

  return (
    <Table>
      <Thead>
        <Tr
          background="gray.200"
          sx={{
            '& > th': {
              fontWeight: 'bold',
              fontSize: '2xs',
              color: 'solid.gray0',
              border: 'none',
              width: '33%',
              textAlign: 'left',
              py: '8px',
            },
          }}
        >
          <Th borderRadius="8px 0px 0px 8px">
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
                <HStack align="center" spacing="2px">
                  <Box>{i18n.colAmount}</Box>
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
                  if (sortOrder !== 'DURATION_ASC') {
                    setSortOrder('DURATION_ASC');
                  } else {
                    setSortOrder('DURATION_DESC');
                  }
                }}
              >
                <HStack align="center" spacing="2px">
                  <Box>{i18n.colDuration}</Box>
                  {sortOrder === 'DURATION_ASC' && <FaSortUp size="18px" />}
                  {sortOrder === 'DURATION_DESC' && <FaSortDown size="18px" />}
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
                <HStack align="center" spacing="2px">
                  <Box>{i18n.colApr}</Box>
                  {sortOrder === 'APR_ASC' && <FaSortUp size="18px" />}
                  {sortOrder === 'APR_DESC' && <FaSortDown size="18px" />}
                </HStack>
              </span>
            </Flex>
          </Th>
          <Th borderRadius="0px 8px 8px 0px" />
        </Tr>
      </Thead>
      <Tbody
        sx={{
          'tr:nth-of-type(2n)': {
            backgroundColor: 'gray.200',
          },
        }}
      >
        {sortedOffers.map((offer: any, idx: number) => {
          const fmtOfferAmount: string = ethers.utils.formatEther(
            BigNumber.from(String(offer.OfferTerms.Amount)),
          );

          return (
            <Tr sx={{ td: { border: 'none', fontSize: 'md' } }} key={idx}>
              <Td>
                <Flex alignItems="center">
                  <CryptoIcon symbol={offer.symbol} size={20} />
                  <Text ml="10px">{fmtOfferAmount}</Text>
                </Flex>
              </Td>
              <Td>
                <Text>{offer.durationDays} days</Text>
              </Td>
              <Td>
                <Text>{roundForDisplay(offer.aprPercentage)}%</Text>
              </Td>
              <Td>
                <Button
                  color="notification.notify"
                  variant="neutral"
                  fontSize="2xs"
                  onClick={() => onClick(offer)}
                  _hover={{
                    bg: 'notification.notify',
                    color: 'solid.white',
                  }}
                >
                  {i18n.action}
                </Button>
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export default OffersTable;
