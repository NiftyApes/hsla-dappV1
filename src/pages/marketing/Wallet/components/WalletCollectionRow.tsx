import React from 'react';
import { Td, Text, Tr } from '@chakra-ui/react';

import { SECONDS_IN_DAY } from '../../../../constants/misc';
import NFTCollectionCardSmall from '../../../../components/cards/NFTCollectionCardSmall';

interface Props {
  address: string;
  apr: number;
  duration: number;
  itemsCount: number;
  liquidity: number;
  ltv: number | undefined;
  offers: string;
  principal: number;
}

const i18n = {
  days: (num: number) => (num === 1 ? `${num} day` : `${num} days`),
};

const WalletCollectionRow: React.FC<Props> = ({
  address,
  apr,
  duration,
  itemsCount,
  liquidity,
  ltv,
  offers,
  principal,
}) => {
  return (
    <Tr>
      <Td>
        <NFTCollectionCardSmall
          contractAddress={address.replace('ETHEREUM:', '')}
          throttle={0}
        />
      </Td>
      <Td>
        <Text fontWeight="bold">{itemsCount}</Text>
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

export default WalletCollectionRow;
