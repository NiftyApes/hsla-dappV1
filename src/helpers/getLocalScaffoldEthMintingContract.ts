import { EIP1193Provider } from '@web3-onboard/core';
import YourCollectibleArtifactJSON from '../generated/artifacts/contracts/YourCollectible.sol/YourCollectible.json';
import YourCollectibleDeploymentJSON from '../generated/deployments/localhost/YourCollectible.json';
import { getEthersContractWithEIP1193Provider } from './getEthersContractWithEIP1193Provider';

export function getLocalScaffoldEthMintingContract({
  provider,
}: {
  provider: EIP1193Provider;
}) {
  return getEthersContractWithEIP1193Provider({
    abi: YourCollectibleArtifactJSON.abi,
    address: YourCollectibleDeploymentJSON.address,
    provider,
  });
}
