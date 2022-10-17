import { Box, Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import { OfferRow } from './OfferRow';

const OffersTable: React.FC<any> = ({ offers }) => {
  const sortedOffers = _.sortBy(offers, (offer: any) =>
    offer.offer.expiration < Date.now() / 1000
      ? Infinity
      : offer.offer.expiration,
  );

  return (
    <Box minW="800px">
      <Table>
        <Thead>
          <Tr
            background="#eee"
            sx={{
              '& > th': {
                fontWeight: 'bold',
                fontSize: '2xs',
                color: 'solid.gray0',
                border: 'none',
                textAlign: 'center',
              },
            }}
          >
            <Th>collateral</Th>
            <Th>terms</Th>
            <Th>status</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody
          sx={{
            'tr:first-of-type > td:first-of-type': {
              borderTopLeftRadius: '10px',
            },
            'tr:first-of-type > td:last-child': {
              borderTopRightRadius: '10px',
            },
            'tr:last-child > td:first-of-type': {
              borderBottomLeftRadius: '10px',
            },
            'tr:last-child > td:last-child': {
              borderBottomRightRadius: '10px',
            },
          }}
        >
          {sortedOffers?.map((offer: any) => (
            <OfferRow
              key={offer.offerHash}
              offer={offer.offer}
              offerHash={offer.offerHash}
            />
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default OffersTable;
