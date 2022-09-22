import React from 'react';
import { Button, Flex, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import CryptoIcon from 'components/atoms/CryptoIcon';
import { LoanOffer } from '../../../loan';
import { BigNumber, ethers } from 'ethers';
import { roundForDisplay } from '../../../helpers/roundForDisplay';

interface callbackType {
  (offer: LoanOffer): void;
}

interface Props {
  offers: Array<LoanOffer>;
  onClick: callbackType;
}

const i18n = {
  colDuration: 'duration',
  colApr: 'apr',
  colAmount: 'amount',
  action: 'borrow',
};

const OffersTable: React.FC<Props> = ({ offers, onClick }) => {
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
          <Th borderRadius="8px 0px 0px 8px">{i18n.colAmount}</Th>
          <Th>{i18n.colDuration}</Th>
          <Th>{i18n.colApr}</Th>
          <Th borderRadius="0px 8px 8px 0px"></Th>
        </Tr>
      </Thead>
      <Tbody
        sx={{
          'tr:nth-child(2n)': {
            backgroundColor: 'gray.200',
          },
        }}
      >
        {offers.map((offer, idx) => {
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
