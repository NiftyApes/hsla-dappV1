import React from 'react';
import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { useRaribleCollectionStats } from '../../../../hooks/useRaribleColectionStats';
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

            const key: string = `${contractAddress}${idx}`;

            // const { loading, collectionStats } = useCollectionStats({
            //   nftContractAddress: contractAddress.replace('ETHEREUM:', ''),
            // });
            //
            // if (loading) {
            //   return <div>Loading</div>;
            // }
            //
            // const {
            //   highestPrincipal,
            //   lowestApr,
            //   longestDuration,
            //   numberOfOffers,
            //   totalLiquidity,
            // } = collectionStats;

            return (
              <WalletCollectionRow
                apr={undefined}
                contractAddress={contractAddress}
                duration={undefined}
                floor={floorPrice}
                index={idx}
                key={key}
                liquidity={undefined}
                offers={undefined}
                principal={undefined}
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
