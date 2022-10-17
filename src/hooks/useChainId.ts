import { useSetChain } from '@web3-onboard/react';

export const useChainId = () => {
  const [{ connectedChain }] = useSetChain();

  if (!connectedChain) {
    return window?.ethereum?.chainId;
  }

  return connectedChain.id;
};
