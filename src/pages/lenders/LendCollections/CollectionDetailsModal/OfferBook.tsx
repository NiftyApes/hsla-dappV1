import { Box, Flex, Table, Tag, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import CryptoIcon from 'components/atoms/CryptoIcon';
import { ethers } from 'ethers';
import { getAPR } from 'helpers/getAPR';
import { roundForDisplay } from 'helpers/roundForDisplay';
import { useCollectionOffers } from 'hooks/useCollectionOffers';
import { useWalletAddress } from 'hooks/useWalletAddress';
import moment from 'moment';
import React from 'react';
import { useParams } from 'react-router-dom';

const OfferBook: React.FC<any> = ({ collectionOfferAmt, apr, duration, expiration }: any) => {
  const { collectionAddress } = useParams();

  const walletAddress = useWalletAddress();

  const offers = useCollectionOffers({ nftContractAddress: collectionAddress });

  const expirationInSeconds =
    expiration === '1_DAY'
      ? 3600 * 24 * 1000
      : expiration === '7_DAYS'
      ? 3600 * 24 * 7 * 1000
      : expiration === '30_DAYS'
      ? 3600 * 24 * 30 * 1000
      : 0;

  return (
    <Box ml="48px">
      <Text
        fontWeight="bold"
        color="solid.gray0"
        mb="13px"
        sx={{ position: 'relative', top: '-16px' }}
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
            <Th>Amount</Th>
            <Th>APR</Th>
            <Th>Loan Duration</Th>
            <Th minW="15rem">Offer Expires</Th>
            <Th></Th>{' '}
          </Tr>
        </Thead>
        <Tbody
          sx={{
            'tr:nth-child(2n)': {
              backgroundColor: 'solid.white',
            },
            'tr:nth-child(2n+1)': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <Tr>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
          </Tr>

          <Tr
            sx={{
              /*
              Can't border-radius a table row :(
              Complicated workaround https://stackoverflow.com/questions/4094126/how-to-add-border-radius-on-table-row
              Pretty clearly not worth spending a day or so on this
              */
              backgroundColor: '#fff',
              border: '2px solid #00a2ff',
              mt: '24px',
              td: {
                border: 'none',
                fontSize: 'md',
                textAlign: 'center',
              },
              boxShadow: '0px 4px 24px 0px #4910921A',
            }}
          >
            <Td sx={{ position: 'relative' }}>
              <Flex alignItems="center" justifyContent="center">
                <CryptoIcon symbol="eth" size={16} />
                <Text ml="8px">{collectionOfferAmt}</Text>
              </Flex>
              <Flex
                sx={{
                  alignItems: 'center',
                  background: '#00a2ff',
                  borderRadius: '4px 4px 0 0',
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: 600,
                  height: '24px',
                  justifyContent: 'center',
                  padding: '4px 8px',
                  position: 'absolute',
                  top: '-26px',
                  left: '24px',
                  width: '120px',
                }}
              >
                DRAFT OFFER
              </Flex>
            </Td>
            <Td>
              <Text>{apr}%</Text>
            </Td>
            <Td>
              <Text>
                {duration && moment.duration(duration, 'days').asDays()} day
                {moment.duration(duration, 'days').asDays() !== 1 && 's'}
              </Text>
            </Td>
            <Td>
              <Text>{moment(expirationInSeconds + Date.now()).format('h:mma, MMM D YYYY')}</Text>
            </Td>
            <Td></Td>
          </Tr>

          {offers?.map(({ offer }: any, i: number) => (
            <Tr
              key={i}
              sx={{
                td: {
                  border: 'none',
                  fontSize: 'md',
                  textAlign: 'center',
                },
              }}
            >
              <Td sx={{ position: 'relative' }}>
                <span style={{ whiteSpace: 'nowrap' }}>
                  {walletAddress === offer.creator && (
                    <Tag
                      bgColor="orange.300"
                      color="white"
                      fontSize="xs"
                      fontWeight={600}
                      sx={{
                        position: 'absolute',
                        left: '-28px',
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
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default OfferBook;
