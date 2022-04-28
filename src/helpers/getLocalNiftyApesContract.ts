import { EIP1193Provider } from '@web3-onboard/core';
import NiftyApesArtifactJSON from '../generated/artifacts/contracts/NiftyApes.sol/NiftyApes.json';
import NiftyApesDeploymentJSON from '../generated/deployments/localhost/NiftyApes.json';
import { getEthersContractWithEIP1193Provider } from './getEthersContractWithEIP1193Provider';

export function getLocalNiftyApesContract({ provider }: { provider: EIP1193Provider }) {
  return getEthersContractWithEIP1193Provider({
    abi: NiftyApesArtifactJSON.abi,
    address: NiftyApesDeploymentJSON.address,
    provider,
  });
}
