import React from 'react';
import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import CollectionRow from './CollectionRow';

interface Props {
  list: Array<any>;
}

const i18n = {
  thApr: 'lowest apr',
  thCollection: 'collection',
  thDuration: 'longest duration',
  thLiquidity: 'total liquidity',
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
            <Th>{i18n.thApr}</Th>
            <Th>{i18n.thDuration}</Th>
            <Th>{i18n.thOffers}</Th>
            <Th>{i18n.thLiquidity}</Th>
          </Tr>
        </Thead>

        <Tbody>
          {list.map(
            ({
              address,
              highestPrincipal,
              lowestApr,
              duration,
              numberOfOffers,
              totalLiquidity,
            }) => {
              return (
                <CollectionRow
                  address={address}
                  principal={highestPrincipal}
                  apr={lowestApr}
                  duration={duration}
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
