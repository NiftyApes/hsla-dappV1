import { Checkbox, Flex, Text } from '@chakra-ui/react';

import CryptoIcon from 'components/atoms/CryptoIcon';
import { CoinSymbol, COIN_SYMBOL_MAP } from 'lib/constants/coinSymbols';

type Props = {
  symbol: CoinSymbol;
};

const AssetItem: React.FC<Props> = ({ symbol }) => {
  return (
    <Checkbox mr="16px" defaultChecked>
      <Flex ml="5px" alignItems="center">
        <CryptoIcon symbol={symbol} />
        <Text fontSize="sm" ml="12px">
          {COIN_SYMBOL_MAP[symbol]?.name}
        </Text>
      </Flex>
    </Checkbox>
  );
};

export default AssetItem;
