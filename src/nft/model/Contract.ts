import { Contract as EthersContract } from 'ethers';
import { NiftyApesLending } from 'generated/contract-types/NiftyApesLending';

export type ContractAddress = string;
export type Contract = EthersContract;
export type NiftyApesContract = NiftyApesLending;
