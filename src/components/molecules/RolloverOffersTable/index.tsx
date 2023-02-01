/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import CryptoIcon from 'components/atoms/CryptoIcon';
import { BigNumber, ethers } from 'ethers';
import { getAPR } from 'helpers/getAPR';
import _ from 'lodash';
import { FaSortDown, FaSortUp } from 'react-icons/fa';
import { LoanAuction, LoanOffer } from '../../../loan';
import { roundForDisplay } from '../../../helpers/roundForDisplay';
import RolloverLoanVisual from '../RolloverLoanVisual';

interface CallbackType {
  (offer: LoanOffer): void;
}

interface Props {
  offers: Array<LoanOffer>;
  onClick: CallbackType;
  loan: LoanAuction;
}

const i18n = {
  colDuration: 'duration',
  colApr: 'apr',
  colAmount: 'amount',
  action: 'borrow',
};

const OffersTable: React.FC<Props> = ({ offers, onClick, loan }) => {
  const [sortOrder, setSortOrder] = useState<string>('APR_ASC');

  const [selectedOffer, setSelectedOffer] = useState<LoanOffer>();

  const onSelect = useCallback((value: LoanOffer) => {
    setSelectedOffer(value);
  }, []);

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
    <Flex flexDirection="column" width="100%">
      <Table sx={{ maxHeight: 600, overflowY: 'scroll', display: 'block' }}>
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
            <Th maxWidth="2%" borderRadius="8px 0px 0px 8px">
              <Flex alignItems="center" justifyContent="center">
                <span style={{ cursor: 'pointer', marginLeft: '2px' }}>
                  <HStack align="center" spacing="2px">
                    <Box>Selected</Box>
                  </HStack>
                </span>
              </Flex>
            </Th>
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
                    {sortOrder === 'DURATION_DESC' && (
                      <FaSortDown size="18px" />
                    )}
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
              <Tr
                onClick={() => onSelect(offer)}
                cursor="pointer"
                _hover={{ opacity: '0.8' }}
                sx={{ td: { border: 'none', fontSize: 'md' } }}
                key={idx}
              >
                <Td>
                  <Flex justifyContent="center">
                    <Checkbox
                      isChecked={selectedOffer?.OfferHash === offer.OfferHash}
                      sx={{
                        span: { borderRadius: '100%', borderColor: 'gray.500' },
                      }}
                      _checked={{
                        span: {
                          backgroundColor: '#15e9a7',
                          borderColor: '#15e9a7',
                        },
                      }}
                    />
                  </Flex>
                </Td>
                <Td textAlign="center">
                  <Flex alignItems="center">
                    <CryptoIcon symbol={offer.symbol} size={20} />
                    <Text ml="10px">{fmtOfferAmount}</Text>
                  </Flex>
                </Td>
                <Td textAlign="center">
                  <Text>{offer.durationDays} days</Text>
                </Td>
                <Td textAlign="center">
                  <Text>{roundForDisplay(offer.aprPercentage)}%</Text>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      {selectedOffer ? (
        <VStack>
          <RolloverLoanVisual loan={loan} offer={selectedOffer} />
          <Button
            marginTop={4}
            marginBottom={1}
            borderRadius="8px"
            colorScheme="purple"
            backgroundColor="purple.500"
            onClick={() => onClick(selectedOffer)}
            py="6px"
            size="lg"
            textTransform="uppercase"
            variant="solid"
            w="100%"
          >
            Select offer
          </Button>
        </VStack>
      ) : null}
    </Flex>
  );
};

export default OffersTable;
