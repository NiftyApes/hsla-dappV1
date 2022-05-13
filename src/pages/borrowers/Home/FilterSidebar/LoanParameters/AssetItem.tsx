import React from 'react';
import { Checkbox, Text } from '@chakra-ui/react';

import CryptoIcon from 'components/atoms/CryptoIcon';
import { CoinSymbol, COIN_SYMBOL_MAP } from 'lib/constants/coinSymbols';

type Props = {
  symbol: CoinSymbol;
};

const AssetItem: React.FC<Props> = ({ symbol }) => {
  return (
    <Checkbox mr="16px" defaultChecked>
      <CryptoIcon symbol={symbol} display="inline-block" />
      <Text fontSize="sm" ml="12px">
        {COIN_SYMBOL_MAP[symbol].name}
      </Text>
    </Checkbox>
  );
};

export default AssetItem;
