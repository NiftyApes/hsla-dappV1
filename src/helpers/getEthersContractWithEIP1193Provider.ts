import { EIP1193Provider } from '@web3-onboard/core';
import { ContractInterface, ethers } from 'ethers';

export function getEthersContractWithEIP1193Provider({
  abi,
  address,
  provider,
}: {
  abi: ContractInterface;
  address: string;
  provider: EIP1193Provider;
}) {
  const ethersProvider = new ethers.providers.Web3Provider(provider);
  const contract = new ethers.Contract(
    address,
    abi,
    ethersProvider.getUncheckedSigner(),
  );

  return contract;
}
