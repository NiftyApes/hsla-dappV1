import React from 'react';
import _ from 'lodash';
import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { useRaribleCollectionStats } from '../../../../hooks/useRaribleColectionStats';
import { useCollectionStats } from '../../../../providers/hooks/useCollectionStats';
import { IRaribleCollection } from '../../../../hooks/useRaribleWalletNFTs';
import WalletCollectionRow from './WalletCollectionRow';

const i18n = {
  thNFTS: 'your nfts',
  thApr: 'lowest apr',
  thCollection: 'collection',
  thDuration: 'longest duration',
  thLiquidity: 'total liquidity',
  thLtv: 'ltv',
  thOffers: '# of offers',
  thPrincipal: 'principal',
  thPotential: 'borrow potential',
};

const WalletCollections: React.FC<{ list: Array<IRaribleCollection> }> = ({
  list,
}) => {
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
          {list.map(({ contractAddress, tokens }, idx) => {
            const { floorPrice } = useRaribleCollectionStats({
              enabled: true,
              throttle: idx * 100,
              contractAddress,
            });

            const key: string = `${contractAddress}${idx}`;

            const { collectionStats } = useCollectionStats({
              nftContractAddress: contractAddress.replace('ETHEREUM:', ''),
            });

            return (
              <WalletCollectionRow
                contractAddress={contractAddress}
                floor={floorPrice}
                index={idx}
                key={key}
                principal={
                  _.isUndefined(collectionStats)
                    ? undefined
                    : collectionStats.highestPrincipal
                }
                tokens={tokens}
              />
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default WalletCollections;
