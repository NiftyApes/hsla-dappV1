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

const AVATAR_GROUP_SIZE = 4;

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
        <AvatarGroup size="lg" max={AVATAR_GROUP_SIZE}>
          {tokens.map((item: string, idx) => {
            const key = `${idx}`;
            const tokenId = item.split(':')[2];

            let image: string = '';
            let name: string = '';
            // avoid loading data for the hidden image
            if (idx + 1 <= AVATAR_GROUP_SIZE) {
              const result: any = useRaribleTokenMeta({
                contractAddress,
                tokenId,
              });
              image = result.image;
              name = result.name;
            }

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
