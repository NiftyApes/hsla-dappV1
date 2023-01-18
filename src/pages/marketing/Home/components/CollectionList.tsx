import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';
import { useRaribleCollectionStats } from '../../../../hooks/useRaribleColectionStats';
import CollectionRow from './CollectionRow';

interface Props {
  list: Array<any>;
}

const i18n = {
  thApr: 'lowest apr',
  thCollection: 'collection',
  thDuration: 'longest duration',
  thLiquidity: 'total liquidity',
  thLtv: 'ltv',
  thOffers: '# of offers',
  thPrincipal: 'principal',
};

const CollectionList: React.FC<Props> = ({ list }) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>{i18n.thCollection}</Th>
            <Th>{i18n.thPrincipal}</Th>
            <Th>{i18n.thLtv}</Th>
            <Th>{i18n.thApr}</Th>
            <Th>{i18n.thDuration}</Th>
            <Th>{i18n.thOffers}</Th>
            <Th>{i18n.thLiquidity}</Th>
          </Tr>
        </Thead>

        <Tbody>
          {list.map(
            (
              {
                address,
                highestPrincipal,
                lowestApr,
                longestDuration,
                numberOfOffers,
                totalLiquidity,
              },
              idx,
            ) => {
              const { floorPrice } = useRaribleCollectionStats({
                enabled: true,
                throttle: idx * 100,
                contractAddress: address,
              });

              return (
                <CollectionRow
                  address={address}
                  ltv={floorPrice}
                  principal={highestPrincipal}
                  apr={lowestApr}
                  duration={longestDuration}
                  offers={numberOfOffers}
                  liquidity={totalLiquidity}
                />
              );
            },
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default CollectionList;
