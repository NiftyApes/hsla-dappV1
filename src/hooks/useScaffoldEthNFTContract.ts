import { useContract } from './useContract';
import YourCollectibleArtifactJSON from '../generated/artifacts/contracts/YourCollectible.sol/YourCollectible.json';
import YourCollectibleDeploymentJSON from '../generated/deployments/localhost/YourCollectible.json';

export const useScaffoldEthNFTContract = () => {
  const contract = useContract({
    address: YourCollectibleDeploymentJSON.address,
    abi: YourCollectibleArtifactJSON.abi,
  });

  return contract;
};
