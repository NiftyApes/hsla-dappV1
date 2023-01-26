import React from 'react';
import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';

import WalletCollectionRow from './WalletCollectionRow';

export type IWalletCollection = {
  contractAddress: string;
  highestPrincipal?: number;
  longestDuration?: number;
  lowestApr?: number;
  numberOfOffers?: number;
  tokens: [];
  totalLiquidity?: number;
  floorPrice?: number;
};

const i18n = {
  thCollection: 'collection',
  thNFTS: 'your nfts',
  thPotential: 'borrow potential',
};

const WalletCollections: React.FC<{
  list: Array<IWalletCollection>;
}> = ({ list }) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>{i18n.thCollection}</Th>
            <Th>{i18n.thNFTS}</Th>
            <Th>{i18n.thPotential}</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>

        <Tbody>
          {list.map(
            (
              { contractAddress, tokens, highestPrincipal, floorPrice },
              idx,
            ) => {
              const key: string = `${contractAddress}${idx}`;

              return (
                <WalletCollectionRow
                  contractAddress={contractAddress}
                  floor={floorPrice}
                  index={idx}
                  key={key}
                  principal={highestPrincipal}
                  tokens={tokens}
                />
              );
            },
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default WalletCollections;
