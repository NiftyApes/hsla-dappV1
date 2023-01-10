import React from 'react';
import { Td, Text, Tr } from '@chakra-ui/react';

import { SECONDS_IN_DAY } from '../../../../constants/misc';
import NFTCollectionCardSmall from '../../../../components/cards/NFTCollectionCardSmall';

interface Props {
  apr: number;
  duration: number;
  liquidity: number;
  address: string;
  offers: string;
  principal: string;
}

const i18n = {
  days: (num: number) => (num === 1 ? `${num} day` : `${num} days`),
};

const CollectionRow: React.FC<Props> = ({
  apr,
  duration,
  liquidity,
  address,
  offers,
  principal,
}) => {
  return (
    <Tr>
      <Td>
        <NFTCollectionCardSmall contractAddress={address} throttle={0} />
      </Td>
      <Td>
        <Text fontWeight="bold">{principal}Ξ</Text>
      </Td>
      <Td>
        <Text fontWeight="bold">{apr.toFixed(2)}%</Text>
      </Td>
      <Td>
        <Text fontWeight="bold">{i18n.days(duration / SECONDS_IN_DAY)}</Text>
      </Td>
      <Td>
        <Text fontWeight="bold">{offers}</Text>
      </Td>
      <Td>
        <Text fontWeight="bold">{liquidity.toFixed(2)}Ξ</Text>
      </Td>
    </Tr>
  );
};

export default CollectionRow;
