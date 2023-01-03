import React from 'react';
import { Td, Text, Tr } from '@chakra-ui/react';

import NFTCollectionCardSmall from '../../../../components/cards/NFTCollectionCardSmall';

interface Props {
  apr: string;
  duration: string;
  liquidity: string;
  address: string;
  offers: string;
  principal: string;
}

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
        <Text fontWeight="bold">{principal}</Text>
      </Td>
      <Td>
        <Text fontWeight="bold">{apr}%</Text>
      </Td>
      <Td>
        <Text fontWeight="bold">{duration}</Text>
      </Td>
      <Td>
        <Text fontWeight="bold">{offers}</Text>
      </Td>
      <Td>
        <Text fontWeight="bold">{liquidity}</Text>
      </Td>
    </Tr>
  );
};

export default CollectionRow;
