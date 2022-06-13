import { EIP1193Provider } from '@web3-onboard/core';
import { NiftyApesContract } from 'nft/model';
import NiftyApesArtifactJSON from '../generated/artifacts/contracts/NiftyApes.sol/NiftyApes.json';
import NiftyApesDeploymentJSON from '../generated/deployments/localhost/NiftyApes.json';
import { getEthersContractWithEIP1193Provider } from './getEthersContractWithEIP1193Provider';
import { getStoreNiftyApesContract, setStoreNiftyApesContract } from 'app/store';

export function getLocalNiftyApesContract({ provider }: { provider: EIP1193Provider }) {
  let contract = getStoreNiftyApesContract();

  if (!contract) {
    contract = getEthersContractWithEIP1193Provider({
      abi: NiftyApesArtifactJSON.abi,
      address: NiftyApesDeploymentJSON.address,
      provider,
    }) as NiftyApesContract;
    setStoreNiftyApesContract(contract);
  }

  return contract;
}
