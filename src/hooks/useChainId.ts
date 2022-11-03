import * as Sentry from '@sentry/react';
import { useSetChain } from '@web3-onboard/react';
import { useEffect } from 'react';

export const useChainId = () => {
  const [{ connectedChain }] = useSetChain();

  useEffect(() => {
    Sentry.setTag(
      'chain',
      connectedChain?.id || window?.ethereum?.chainId || 'none',
    );
  }, [connectedChain]);

  if (!connectedChain) {
    return window?.ethereum?.chainId;
  }

  return connectedChain.id;
};
