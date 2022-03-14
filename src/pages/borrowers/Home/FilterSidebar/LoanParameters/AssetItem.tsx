import React from 'react';
import { Checkbox, Flex, Image, Text } from '@chakra-ui/react';

import CryptoIcon from 'components/atoms/CryptoIcon';
import { CoinSymbol, COIN_SYMBOL_MAP } from 'lib/constants/coinSymbols';

type Props = {
  symbol: CoinSymbol;
};

const AssetItem: React.FC<Props> = ({ symbol }) => {
  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Flex alignItems="center">
        <Checkbox mr="16px" defaultChecked />
        <CryptoIcon symbol={symbol} />
        <Text fontSize="sm" ml="12px">
          {COIN_SYMBOL_MAP[symbol].name}
        </Text>
      </Flex>
      <Image src="/assets/images/etherscan.png" />
    </Flex>
  );
};

export default AssetItem;
