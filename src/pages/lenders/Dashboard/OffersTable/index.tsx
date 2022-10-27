import {
  Button,
  Box,
  Center,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Flex,
  Tr,
  VStack,
} from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import { OfferRow } from './OfferRow';

const OffersTable: React.FC<any> = ({ offers }) => {
  const sortedOffers = _.sortBy(offers, (offer: any) =>
    offer.offer.expiration < Date.now() / 1000
      ? Infinity
      : offer.offer.expiration,
  );

  const navigateToQuickStart = () => {
    window.open(
      'https://docs.niftyapes.money/lenders-dapp-guide/lender-quick-start-guide',
      '_blank',
    );
  };

  const renderEmptyState = () => {
    return (
      <Center>
        <Flex h="200px">
          <Center>
            <VStack>
              <Text color="gray.500" as="i">
                No Offers Found
              </Text>
              <Button
                colorScheme="purple"
                variant="link"
                textTransform="uppercase"
                onClick={navigateToQuickStart}
              >
                🏃 ‍️Lender Quick Start Guide 💨
              </Button>
            </VStack>
          </Center>
        </Flex>
      </Center>
    );
  };

  return (
    <Box minW="800px" border="1px solid" borderColor="accents.100">
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
          {sortedOffers?.map((offer: any, index) => (
            <OfferRow
              index={index}
              key={offer.offerHash}
              offer={offer.offer}
              offerHash={offer.offerHash}
            />
          ))}
        </Tbody>
      </Table>

      {sortedOffers.length === 0 && renderEmptyState()}
    </Box>
  );
};
export default OffersTable;
