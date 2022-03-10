import { Image } from '@chakra-ui/react';
import React from 'react';

import { COIN_SYMBOL_MAP } from './constants';
import useDynamicSVGImport, { DynamicSVGImportOptions } from './useDynamicSVGImport';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  symbol: keyof typeof COIN_SYMBOL_MAP;
  size?: number;
  onCompleted?: DynamicSVGImportOptions['onCompleted'];
  onError?: DynamicSVGImportOptions['onError'];
}

/**
 * Simple wrapper for dynamic SVG import hook. You can implement your own wrapper,
 * or even use the hook directly in your components.
 */
const Icon: React.FC<IconProps> = ({
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
      <Image src={`${iconURL}`} width={`${size}px`} height={`${size}px`} objectFit="contain" />
    );
  }
  return null;
};

export default Icon;
