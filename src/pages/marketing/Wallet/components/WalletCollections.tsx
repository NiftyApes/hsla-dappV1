import React from 'react';
import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import WalletCollectionRow from './WalletCollectionRow';
import { useRaribleCollectionStats } from '../../../../hooks/useRaribleColectionStats';
import { IRaribleCollection } from '../../../../hooks/useRaribleWalletNFTs';

interface Props {
  list: Array<IRaribleCollection>;
}

const i18n = {
  thNFTS: 'your nfts',
  thApr: 'lowest apr',
  thCollection: 'collection',
  thDuration: 'longest duration',
  thLiquidity: 'total liquidity',
  thLtv: 'ltv',
  thOffers: '# of offers',
  thPrincipal: 'principal',
};

const WalletCollections: React.FC<Props> = ({ list }) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>{i18n.thCollection}</Th>
            <Th>{i18n.thNFTS}</Th>
            <Th>{i18n.thPrincipal}</Th>
            <Th>{i18n.thLtv}</Th>
            <Th>{i18n.thApr}</Th>
            <Th>{i18n.thDuration}</Th>
            <Th>{i18n.thOffers}</Th>
            <Th>{i18n.thLiquidity}</Th>
          </Tr>
        </Thead>

        <Tbody>
          {list.map(({ contractAddress, itemsCount }, idx) => {
            const { floorPrice } = useRaribleCollectionStats({
              enabled: true,
              throttle: idx * 100,
              contractAddress: contractAddress.replace('ETHEREUM:', ''),
            });

            return (
              <WalletCollectionRow
                address={contractAddress}
                itemsCount={itemsCount}
                ltv={floorPrice}
                principal={0}
                apr={0}
                duration={0}
                offers="0"
                liquidity={0}
              />
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default WalletCollections;
