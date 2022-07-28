import { EIP1193Provider } from '@web3-onboard/core';
import { NiftyApesContract } from 'nft/model';
import NiftyApesLendingArtifactJSON from '../generated/artifacts/contracts/Lending.sol/NiftyApesLending.json';
import NiftyApesLendingDeploymentJSON from '../generated/deployments/localhost/NiftyApesLending.json';
import { getEthersContractWithEIP1193Provider } from './getEthersContractWithEIP1193Provider';
import { getStoreNiftyApesContract, setStoreNiftyApesContract } from 'app/store';

export function getLocalNiftyApesContract({ provider }: { provider: EIP1193Provider }) {
  let contract = getStoreNiftyApesContract();

  if (!contract) {
    contract = getEthersContractWithEIP1193Provider({
      abi: NiftyApesLendingArtifactJSON.abi,
      address: NiftyApesLendingDeploymentJSON.address,
      provider,
    }) as NiftyApesContract;
    setStoreNiftyApesContract(contract);
  }

  return contract;
}
