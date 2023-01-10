import React from 'react';
import { Td, Text, Tr } from '@chakra-ui/react';

import { SECONDS_IN_DAY } from '../../../../constants/misc';
import NFTCollectionCardSmall from '../../../../components/cards/NFTCollectionCardSmall';

interface Props {
  address: string;
  apr: number;
  duration: number;
  liquidity: number;
  ltv: number | undefined;
  offers: string;
  principal: number;
}

const i18n = {
  days: (num: number) => (num === 1 ? `${num} day` : `${num} days`),
};

const CollectionRow: React.FC<Props> = ({
  address,
  apr,
  duration,
  liquidity,
  ltv,
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
        <Text fontWeight="bold">
          {ltv !== undefined ? `${((principal / ltv) * 100).toFixed(2)}%` : ''}
        </Text>
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
