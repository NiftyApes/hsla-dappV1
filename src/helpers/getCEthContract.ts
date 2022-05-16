import { EIP1193Provider } from '@web3-onboard/core';
import cEthSON from '../external/cEth/cEth.json';
import { getEthersContractWithEIP1193Provider } from './getEthersContractWithEIP1193Provider';

let cachedResult: any;

export function getCEthContract({ provider }: { provider: EIP1193Provider }) {
  if (!cachedResult) {
    cachedResult = getEthersContractWithEIP1193Provider({
      abi: cEthSON.abi,
      address: cEthSON.address,
      provider,
    });
  }

  return cachedResult;
}
