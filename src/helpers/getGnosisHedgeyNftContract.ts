import { EIP1193Provider } from '@web3-onboard/core';
import { GNOSIS } from 'constants/contractAddresses';
import { getEthersContractWithEIP1193Provider } from './getEthersContractWithEIP1193Provider';

const abi = [
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'uint256', name: 'index', type: 'uint256' },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];

export function getGnosisHedgeyNftContract({
  provider,
}: {
  provider: EIP1193Provider;
}) {
  return getEthersContractWithEIP1193Provider({
    abi,
    address: GNOSIS.HEDGEY.ADDRESS,
    provider,
  });
}
