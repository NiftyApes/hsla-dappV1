/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from 'ethers';
import { FunctionFragment, Result, EventFragment } from '@ethersproject/abi';
import { Listener, Provider } from '@ethersproject/providers';
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from './common';

export interface ILiquidityInterface extends utils.Interface {
  contractName: 'ILiquidity';
  functions: {
    'assetToCAsset(address)': FunctionFragment;
    'getCAssetBalance(address,address)': FunctionFragment;
    'maxBalanceByCAsset(address)': FunctionFragment;
    'supplyCErc20(address,uint256)': FunctionFragment;
    'supplyErc20(address,uint256)': FunctionFragment;
    'supplyEth()': FunctionFragment;
    'withdrawCErc20(address,uint256)': FunctionFragment;
    'withdrawErc20(address,uint256)': FunctionFragment;
    'withdrawEth(uint256)': FunctionFragment;
  };

  encodeFunctionData(functionFragment: 'assetToCAsset', values: [string]): string;
  encodeFunctionData(functionFragment: 'getCAssetBalance', values: [string, string]): string;
  encodeFunctionData(functionFragment: 'maxBalanceByCAsset', values: [string]): string;
  encodeFunctionData(functionFragment: 'supplyCErc20', values: [string, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'supplyErc20', values: [string, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'supplyEth', values?: undefined): string;
  encodeFunctionData(functionFragment: 'withdrawCErc20', values: [string, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'withdrawErc20', values: [string, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'withdrawEth', values: [BigNumberish]): string;

  decodeFunctionResult(functionFragment: 'assetToCAsset', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getCAssetBalance', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'maxBalanceByCAsset', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'supplyCErc20', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'supplyErc20', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'supplyEth', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'withdrawCErc20', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'withdrawErc20', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'withdrawEth', data: BytesLike): Result;

  events: {
    'CErc20Supplied(address,address,uint256)': EventFragment;
    'CErc20Withdrawn(address,address,uint256)': EventFragment;
    'Erc20Supplied(address,address,uint256,uint256)': EventFragment;
    'Erc20Withdrawn(address,address,uint256,uint256)': EventFragment;
    'EthSupplied(address,uint256,uint256)': EventFragment;
    'EthWithdrawn(address,uint256,uint256)': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'CErc20Supplied'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'CErc20Withdrawn'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'Erc20Supplied'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'Erc20Withdrawn'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'EthSupplied'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'EthWithdrawn'): EventFragment;
}

export type CErc20SuppliedEvent = TypedEvent<
  [string, string, BigNumber],
  { liquidityProvider: string; cAsset: string; cTokenAmount: BigNumber }
>;

export type CErc20SuppliedEventFilter = TypedEventFilter<CErc20SuppliedEvent>;

export type CErc20WithdrawnEvent = TypedEvent<
  [string, string, BigNumber],
  { liquidityProvider: string; cAsset: string; cTokenAmount: BigNumber }
>;

export type CErc20WithdrawnEventFilter = TypedEventFilter<CErc20WithdrawnEvent>;

export type Erc20SuppliedEvent = TypedEvent<
  [string, string, BigNumber, BigNumber],
  {
    liquidityProvider: string;
    asset: string;
    tokenAmount: BigNumber;
    cTokenAmount: BigNumber;
  }
>;

export type Erc20SuppliedEventFilter = TypedEventFilter<Erc20SuppliedEvent>;

export type Erc20WithdrawnEvent = TypedEvent<
  [string, string, BigNumber, BigNumber],
  {
    liquidityProvider: string;
    asset: string;
    tokenAmount: BigNumber;
    cTokenAmount: BigNumber;
  }
>;

export type Erc20WithdrawnEventFilter = TypedEventFilter<Erc20WithdrawnEvent>;

export type EthSuppliedEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  { liquidityProvider: string; amount: BigNumber; cTokenAmount: BigNumber }
>;

export type EthSuppliedEventFilter = TypedEventFilter<EthSuppliedEvent>;

export type EthWithdrawnEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  { liquidityProvider: string; amount: BigNumber; cTokenAmount: BigNumber }
>;

export type EthWithdrawnEventFilter = TypedEventFilter<EthWithdrawnEvent>;

export interface ILiquidity extends BaseContract {
  contractName: 'ILiquidity';
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ILiquidityInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined,
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>,
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    assetToCAsset(asset: string, overrides?: CallOverrides): Promise<[string]>;

    getCAssetBalance(
      account: string,
      cAsset: string,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>;

    maxBalanceByCAsset(cAsset: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    supplyCErc20(
      cAsset: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    supplyErc20(
      asset: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    supplyEth(
      overrides?: PayableOverrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    withdrawCErc20(
      cAsset: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    withdrawErc20(
      asset: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    withdrawEth(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;
  };

  assetToCAsset(asset: string, overrides?: CallOverrides): Promise<string>;

  getCAssetBalance(account: string, cAsset: string, overrides?: CallOverrides): Promise<BigNumber>;

  maxBalanceByCAsset(cAsset: string, overrides?: CallOverrides): Promise<BigNumber>;

  supplyCErc20(
    cAsset: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;

  supplyErc20(
    asset: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;

  supplyEth(
    overrides?: PayableOverrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;

  withdrawCErc20(
    cAsset: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;

  withdrawErc20(
    asset: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;

  withdrawEth(
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;

  callStatic: {
    assetToCAsset(asset: string, overrides?: CallOverrides): Promise<string>;

    getCAssetBalance(
      account: string,
      cAsset: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    maxBalanceByCAsset(cAsset: string, overrides?: CallOverrides): Promise<BigNumber>;

    supplyCErc20(cAsset: string, amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    supplyErc20(asset: string, amount: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    supplyEth(overrides?: CallOverrides): Promise<BigNumber>;

    withdrawCErc20(cAsset: string, amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    withdrawErc20(
      asset: string,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    withdrawEth(amount: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    'CErc20Supplied(address,address,uint256)'(
      liquidityProvider?: string | null,
      cAsset?: string | null,
      cTokenAmount?: null,
    ): CErc20SuppliedEventFilter;
    CErc20Supplied(
      liquidityProvider?: string | null,
      cAsset?: string | null,
      cTokenAmount?: null,
    ): CErc20SuppliedEventFilter;

    'CErc20Withdrawn(address,address,uint256)'(
      liquidityProvider?: string | null,
      cAsset?: string | null,
      cTokenAmount?: null,
    ): CErc20WithdrawnEventFilter;
    CErc20Withdrawn(
      liquidityProvider?: string | null,
      cAsset?: string | null,
      cTokenAmount?: null,
    ): CErc20WithdrawnEventFilter;

    'Erc20Supplied(address,address,uint256,uint256)'(
      liquidityProvider?: string | null,
      asset?: string | null,
      tokenAmount?: null,
      cTokenAmount?: null,
    ): Erc20SuppliedEventFilter;
    Erc20Supplied(
      liquidityProvider?: string | null,
      asset?: string | null,
      tokenAmount?: null,
      cTokenAmount?: null,
    ): Erc20SuppliedEventFilter;

    'Erc20Withdrawn(address,address,uint256,uint256)'(
      liquidityProvider?: string | null,
      asset?: string | null,
      tokenAmount?: null,
      cTokenAmount?: null,
    ): Erc20WithdrawnEventFilter;
    Erc20Withdrawn(
      liquidityProvider?: string | null,
      asset?: string | null,
      tokenAmount?: null,
      cTokenAmount?: null,
    ): Erc20WithdrawnEventFilter;

    'EthSupplied(address,uint256,uint256)'(
      liquidityProvider?: string | null,
      amount?: null,
      cTokenAmount?: null,
    ): EthSuppliedEventFilter;
    EthSupplied(
      liquidityProvider?: string | null,
      amount?: null,
      cTokenAmount?: null,
    ): EthSuppliedEventFilter;

    'EthWithdrawn(address,uint256,uint256)'(
      liquidityProvider?: string | null,
      amount?: null,
      cTokenAmount?: null,
    ): EthWithdrawnEventFilter;
    EthWithdrawn(
      liquidityProvider?: string | null,
      amount?: null,
      cTokenAmount?: null,
    ): EthWithdrawnEventFilter;
  };

  estimateGas: {
    assetToCAsset(asset: string, overrides?: CallOverrides): Promise<BigNumber>;

    getCAssetBalance(
      account: string,
      cAsset: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    maxBalanceByCAsset(cAsset: string, overrides?: CallOverrides): Promise<BigNumber>;

    supplyCErc20(
      cAsset: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>;

    supplyErc20(
      asset: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>;

    supplyEth(
      overrides?: PayableOverrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>;

    withdrawCErc20(
      cAsset: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>;

    withdrawErc20(
      asset: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>;

    withdrawEth(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    assetToCAsset(asset: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getCAssetBalance(
      account: string,
      cAsset: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    maxBalanceByCAsset(cAsset: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    supplyCErc20(
      cAsset: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>;

    supplyErc20(
      asset: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>;

    supplyEth(
      overrides?: PayableOverrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>;

    withdrawCErc20(
      cAsset: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>;

    withdrawErc20(
      asset: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>;

    withdrawEth(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>;
  };
}