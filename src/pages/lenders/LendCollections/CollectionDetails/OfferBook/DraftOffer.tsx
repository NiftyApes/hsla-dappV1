import { Flex, Td, Text, Tr } from '@chakra-ui/react';
import CryptoIcon from 'components/atoms/CryptoIcon';
import moment from 'moment';

interface DraftOfferProps {
  collectionOfferAmt: number;
  apr: number;
  duration: number;
  expirationInSeconds: number;
}

export const DraftOffer: React.FC<DraftOfferProps> = ({
  collectionOfferAmt,
  apr,
  duration,
  expirationInSeconds,
}) => (
  <>
    <Tr
      sx={{
        backgroundColor: 'transparent !important',
        height: 0,
        td: { border: 'none' },
      }}
    >
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
        backgroundColor: '#fff !important',
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
  </>
);
