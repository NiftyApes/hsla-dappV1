import { Image } from '@chakra-ui/react';
import React from 'react';

import { CoinSymbol } from 'lib/constants/coinSymbols';
import useDynamicSVGImport, {
  DynamicSVGImportOptions,
} from './useDynamicSVGImport';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  symbol: CoinSymbol;
  size?: number;
  onCompleted?: DynamicSVGImportOptions['onCompleted'];
  onError?: DynamicSVGImportOptions['onError'];
}

/**
 * Simple wrapper for dynamic SVG import hook. You can implement your own wrapper,
 * or even use the hook directly in your components.
 */
const CryptoIcon: React.FC<IconProps> = ({
  symbol,
  size = 32,
  onCompleted,
  onError,
}): React.ReactElement | null => {
  const { error, loading, iconURL } = useDynamicSVGImport(symbol, {
    onCompleted,
    onError,
  });
  if (error) {
    return <p>{error.message}</p>;
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (iconURL) {
    return (
      <Image
        src={`${iconURL}`}
        width={`${size}px`}
        height={`${size}px`}
        objectFit="contain"
      />
    );
  }
  return null;
};

export default CryptoIcon;
