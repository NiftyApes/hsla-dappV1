import { Contract as EthersContract } from 'ethers';
import { NiftyApesLending } from 'generated/contract-types/NiftyApesLending';
import {
  NiftyApesLiquidity,
  NiftyApesOffers,
  NiftyApesSigLending,
} from '../../generated/contract-types';

export type ContractAddress = string;
export type Contract = EthersContract;
export type LendingContract = NiftyApesLending;
export type LiquidityContract = NiftyApesLiquidity;
export type OffersContract = NiftyApesOffers;
export type SigLendingContract = NiftyApesSigLending;
export type CEthContract = Contract;
