import React from 'react';
import _ from 'lodash';
import { AvatarGroup, Avatar, Td, Text, Tr } from '@chakra-ui/react';
import { SECONDS_IN_DAY } from '../../../../constants/misc';
import NFTCollectionCardSmall from '../../../../components/cards/NFTCollectionCardSmall';
import { useRaribleTokenMeta } from '../../../../hooks/useRaribleTokenMeta';

interface Props {
  apr: number | undefined;
  contractAddress: string;
  duration: number | undefined;
  index: number;
  liquidity: number | undefined;
  floor: number | undefined;
  offers: string | undefined;
  principal: number | undefined;
  tokens: [];
}

const i18n = {
  apr: (val: any) => (_.isUndefined(val) ? '' : `${Number(val).toFixed(2)}%`),
  days: (num: number) => (num === 1 ? `${num} day` : `${num} days`),
  liquidity: (val: any) =>
    _.isUndefined(val) ? '' : `${Number(val).toFixed(2)}Ξ`,
  principal: (principal: any, floor: number) =>
    _.isUndefined(principal)
      ? ''
      : `${((Number(principal) / floor) * 100).toFixed(2)}%`,
};

const WalletCollectionRow: React.FC<Props> = ({
  apr,
  contractAddress,
  duration,
  index,
  liquidity,
  floor,
  offers,
  principal,
  tokens,
}) => {
  return (
    <Tr>
      <Td>
        <NFTCollectionCardSmall
          contractAddress={contractAddress}
          throttle={index * 100}
        />
      </Td>
      <Td>
        <AvatarGroup size="lg" max={4}>
          {tokens.map((item: string, idx) => {
            const key = `${idx}`;
            const tokenId = item.split(':')[2];
            const { image, name }: any = useRaribleTokenMeta({
              contractAddress,
              tokenId,
            });
            return <Avatar size="lg" name={name} key={key} src={image} />;
          })}
        </AvatarGroup>
      </Td>
      <Td>
        <Text fontWeight="bold">{principal}Ξ</Text>
      </Td>
      <Td>
        <Text fontWeight="bold">
          {!_.isUndefined(floor) && i18n.principal(principal, floor)}
        </Text>
      </Td>
      <Td>
        <Text fontWeight="bold">{i18n.apr(apr)}%</Text>
      </Td>
      <Td>
        <Text fontWeight="bold">
          {!_.isUndefined(duration) &&
            i18n.days(Number(duration) / SECONDS_IN_DAY)}
        </Text>
      </Td>
      <Td>
        <Text fontWeight="bold">{offers}</Text>
      </Td>
      <Td>
        <Text fontWeight="bold">{i18n.liquidity(liquidity)}</Text>
      </Td>
    </Tr>
  );
};

export default WalletCollectionRow;
