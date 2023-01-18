import React from 'react';
import { AvatarGroup, Avatar, Td, Text, Tr } from '@chakra-ui/react';
import { SECONDS_IN_DAY } from '../../../../constants/misc';
import NFTCollectionCardSmall from '../../../../components/cards/NFTCollectionCardSmall';
import { useRaribleTokenMeta } from '../../../../hooks/useRaribleTokenMeta';

interface Props {
  apr: number;
  contractAddress: string;
  duration: number;
  index: number;
  liquidity: number;
  ltv: number | undefined;
  offers: string;
  principal: number;
  tokens: [];
}

const i18n = {
  days: (num: number) => (num === 1 ? `${num} day` : `${num} days`),
};

const WalletCollectionRow: React.FC<Props> = ({
  apr,
  contractAddress,
  duration,
  index,
  liquidity,
  ltv,
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
          {ltv !== undefined ? `${((principal / ltv) * 100).toFixed(2)}%` : ''}
        </Text>
      </Td>
      <Td>
        <Text fontWeight="bold">{apr.toFixed(2)}%</Text>
      </Td>
      <Td>
        <Text fontWeight="bold">{i18n.days(duration / SECONDS_IN_DAY)}</Text>
      </Td>
      <Td>
        <Text fontWeight="bold">{offers}</Text>
      </Td>
      <Td>
        <Text fontWeight="bold">{liquidity.toFixed(2)}Ξ</Text>
      </Td>
    </Tr>
  );
};

export default WalletCollectionRow;
