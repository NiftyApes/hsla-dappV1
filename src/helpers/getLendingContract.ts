import { EIP1193Provider } from '@web3-onboard/core';

import { LendingContract, LiquidityContract, OffersContract } from 'nft/model';

import LendingDeploymentJSON from '../generated/deployments/localhost/NiftyApesLending.json';
import Lending from '../generated/artifacts/contracts/Lending.sol/NiftyApesLending.json';
import LiquidityDeploymentJSON from '../generated/deployments/localhost/NiftyApesLiquidity.json';

import Liquidity from '../generated/artifacts/contracts/Liquidity.sol/NiftyApesLiquidity.json';
import OffersDeploymentJSON from '../generated/deployments/localhost/NiftyApesOffers.json';
import Offers from '../generated/artifacts/contracts/Offers.sol/NiftyApesOffers.json';

import { getEthersContractWithEIP1193Provider } from './getEthersContractWithEIP1193Provider';

import {
  getStoreLendingContract,
  getStoreLiquidityContract,
  getStoreOffersContract,
  setStoreLendingContract,
  setStoreLiquidityContract,
  setStoreOffersContract,
} from '../app/store';

export function getLendingContract({ provider }: { provider: EIP1193Provider }) {
  let contract = getStoreLendingContract();
  if (!contract) {
    contract = getEthersContractWithEIP1193Provider({
      abi: Lending.abi,
      address: LendingDeploymentJSON.address,
      provider,
    }) as LendingContract;

    setStoreLendingContract(contract);
  }
  return contract;
}

export function getLiquidityContract({ provider }: { provider: EIP1193Provider }) {
  let contract = getStoreLiquidityContract();
  if (!contract) {
    contract = getEthersContractWithEIP1193Provider({
      abi: Liquidity.abi,
      address: LiquidityDeploymentJSON.address,
      provider,
    }) as LiquidityContract;

    setStoreLiquidityContract(contract);
  }
  return contract;
}

export function getOffersContract({ provider }: { provider: EIP1193Provider }) {
  let contract = getStoreOffersContract();
  if (!contract) {
    contract = getEthersContractWithEIP1193Provider({
      abi: Offers.abi,
      address: OffersDeploymentJSON.address,
      provider,
    }) as OffersContract;
    setStoreOffersContract(contract);
  }
  return contract;
}
