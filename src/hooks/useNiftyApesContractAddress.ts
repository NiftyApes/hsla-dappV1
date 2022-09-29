import { LOCAL } from 'constants/contractAddresses';
import { useChainId } from './useChainId';

export const useNiftyApesContractAddress = () => {
  const chainId = useChainId();

  if (chainId === '0x7a69') {
    return LOCAL.LENDING.ADDRESS;
  }
};
