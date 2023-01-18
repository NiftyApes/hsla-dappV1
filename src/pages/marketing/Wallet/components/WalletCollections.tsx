import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { useCollectionStats } from 'providers/hooks/useCollectionStats';
import React from 'react';
import { useRaribleCollectionStats } from '../../../../hooks/useRaribleColectionStats';
import { IRaribleCollection } from '../../../../hooks/useRaribleWalletNFTs';
import WalletCollectionRow from './WalletCollectionRow';

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
          {list.map(({ contractAddress, tokens }, idx) => {
            const { floorPrice } = useRaribleCollectionStats({
              enabled: true,
              throttle: idx * 100,
              contractAddress,
            });

            const { loading, collectionStats } = useCollectionStats({
              nftContractAddress: contractAddress.replace('ETHEREUM:', ''),
            });

            if (loading) {
              return <div>Loading</div>;
            }

            const {
              highestPrincipal,
              lowestApr,
              longestDuration,
              numberOfOffers,
              totalLiquidity,
            } = collectionStats;

            return (
              <WalletCollectionRow
                index={idx}
                apr={lowestApr}
                contractAddress={contractAddress}
                duration={longestDuration}
                floor={floorPrice}
                liquidity={totalLiquidity}
                offers={String(numberOfOffers)}
                principal={highestPrincipal}
                tokens={tokens}
              />
            );
            // }
            // return '';
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default WalletCollections;
