import { EIP1193Provider } from '@web3-onboard/core';
import { GNOSIS, GOERLI, LOCAL, MAINNET } from 'constants/contractAddresses';
import { CEthContract } from 'nft';
import { getEthersContractWithEIP1193Provider } from './getEthersContractWithEIP1193Provider';

export function getCEthContract({
  chainId,
  provider,
}: {
  chainId: string;
  provider: EIP1193Provider;
}) {
  return getEthersContractWithEIP1193Provider({
    abi:
      chainId === '0x7a69'
        ? LOCAL.CETH.ABI
        : chainId === '0x5'
        ? GOERLI.CETH.ABI
        : chainId === '0x64'
        ? GNOSIS.CETH.ABI
        : MAINNET.CETH.ABI,
    address:
      chainId === '0x7a69'
        ? LOCAL.CETH.ADDRESS
        : chainId === '0x5'
        ? GOERLI.CETH.ADDRESS
        : chainId === '0x64'
        ? GNOSIS.CETH.ADDRESS
        : MAINNET.CETH.ADDRESS,
    provider,
  }) as CEthContract;
}
