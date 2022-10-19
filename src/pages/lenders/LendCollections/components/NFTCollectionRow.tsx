import React from 'react';
import Humanize from 'humanize-plus';

import { Flex, Image, Link, Td, Text, Tr } from '@chakra-ui/react';
import { useRaribleCollectionStats } from '../../../../hooks/useRaribleColectionStats';
import { NFTCollection } from '../../../../hooks/useTopCollections';
import Icon from '../../../../components/atoms/Icon';

interface Props {
  collection: NFTCollection;
  throttle?: number;
  onClick?: () => void;
}

const NFTCollectionRow: React.FC<Props> = ({
  collection,
  throttle = 0,
  onClick,
}) => {
  const { floorPrice, items, owners, volume } = useRaribleCollectionStats({
    enabled: true,
    contractAddress: collection?.address,
    throttle,
  });

  const osLink: string = `https://opensea.io/assets?search[query]=${collection.address}`;
  const esLink: string = `https://etherscan.io/token/${collection.address}`;

  return (
    <Tr>
      <Td>
        <Flex flexDir="row">
          <Image
            cursor="pointer"
            onClick={onClick}
            src={collection.image}
            w="55px"
            h="55px"
            mr="7px"
            borderRadius="full"
          />
          <Flex as="button" flexDir="column" ml="10px" onClick={onClick}>
            <Text fontWeight="bold" mt="4px">
              {collection.name}
            </Text>

            <Flex flexDir="row" mt="5px" gap="1">
              <Link href={esLink} target="_blank">
                <Icon name="etherscan" mt="1px" />
              </Link>

              <Link href={osLink} target="_blank">
                <Icon name="os" size={22} />
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Td>
      <Td>
        <Text fontWeight="bold">
          {Humanize.formatNumber(Number(floorPrice))}Ξ
        </Text>
      </Td>
      <Td>
        <Text fontWeight="bold">{Humanize.formatNumber(Number(volume))}Ξ</Text>
      </Td>
      <Td>
        <Text fontWeight="bold">{Humanize.formatNumber(Number(owners))}</Text>
      </Td>
      <Td>
        <Text fontWeight="bold">{Humanize.formatNumber(Number(items))}</Text>
      </Td>
    </Tr>
  );
};

export default NFTCollectionRow;
