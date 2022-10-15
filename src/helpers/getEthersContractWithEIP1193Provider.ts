import { AlchemyProvider } from '@ethersproject/providers';
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

  // Apparently passing an Alchemy URL to make an EIP-1193 provider
  // doesn't work :( This is a super hacky way of allowing us to
  // query contracts when the user isn't connected.
  const isAlchemy = (ethersProvider.provider as any).connection.url.includes('alchemy');

  if (isAlchemy) {
    return new ethers.Contract(
      address,
      abi,
      new AlchemyProvider(
        (ethersProvider.provider as any).connection.url.split('.')[0].split('-')[1],
        (ethersProvider.provider as any).connection.url.slice(-32),
      ),
    );
  }

  return new ethers.Contract(address, abi, ethersProvider);
}
