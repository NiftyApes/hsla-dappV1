import React from 'react';
import _ from 'lodash';
import { AvatarGroup, Avatar, Td, Text, Tr, Button } from '@chakra-ui/react';
import NFTCollectionCardSmall from '../../../../components/cards/NFTCollectionCardSmall';
import { useRaribleTokenMeta } from '../../../../hooks/useRaribleTokenMeta';

interface Props {
  contractAddress: string;
  index: number;
  floor: number | undefined;
  principal: number | undefined;
  tokens: [];
}

const WalletCollectionRow: React.FC<Props> = ({
  contractAddress,
  index,
  floor,
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
        <Text
          fontWeight="bold"
          color={_.isUndefined(principal) ? 'solid.gray0' : 'green'}
        >
          {_.isUndefined(principal) &&
            !_.isUndefined(floor) &&
            `Estimated ${Number(floor * tokens.length).toFixed(2)}Ξ`}

          {!_.isUndefined(principal) &&
            `Actual ${Number(principal * tokens.length).toFixed(2)}Ξ`}
        </Text>
      </Td>
      <Td>
        <Button
          colorScheme={_.isUndefined(principal) ? 'purple' : 'green'}
          textTransform="uppercase"
        >
          {_.isUndefined(principal) ? 'Request Loan' : 'Borrow ETH'}
        </Button>
      </Td>
    </Tr>
  );
};

export default WalletCollectionRow;
