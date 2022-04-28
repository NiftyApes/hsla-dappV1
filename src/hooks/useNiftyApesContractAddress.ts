import { useChainId } from './useChainId';
import NiftyApesDeploymentJSON from '../generated/deployments/localhost/NiftyApes.json';

export const useNiftyApesContractAddress = () => {
  const chainId = useChainId();

  if (chainId === '0x7a69') {
    return NiftyApesDeploymentJSON.address;
  }
};
