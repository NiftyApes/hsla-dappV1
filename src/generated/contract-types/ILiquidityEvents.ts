/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { BaseContract, BigNumber, Signer, utils } from "ethers";
import { EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface ILiquidityEventsInterface extends utils.Interface {
  contractName: "ILiquidityEvents";
  functions: {};

  events: {
    "AssetToCAssetSet(address,address)": EventFragment;
    "CErc20Supplied(address,address,uint256)": EventFragment;
    "CErc20Withdrawn(address,address,uint256)": EventFragment;
    "Erc20Supplied(address,address,uint256,uint256)": EventFragment;
    "Erc20Withdrawn(address,address,uint256,uint256)": EventFragment;
    "EthSupplied(address,uint256,uint256)": EventFragment;
    "EthWithdrawn(address,uint256,uint256)": EventFragment;
    "LiquiditySanctionsPaused()": EventFragment;
    "LiquiditySanctionsUnpaused()": EventFragment;
    "LiquidityXLendingContractAddressUpdated(address,address)": EventFragment;
    "PercentForRegen(address,address,uint256,uint256)": EventFragment;
    "RegenCollectiveAddressUpdated(address)": EventFragment;
    "RegenCollectiveBpsOfRevenueUpdated(uint16,uint16)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AssetToCAssetSet"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "CErc20Supplied"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "CErc20Withdrawn"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Erc20Supplied"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Erc20Withdrawn"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EthSupplied"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EthWithdrawn"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LiquiditySanctionsPaused"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LiquiditySanctionsUnpaused"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "LiquidityXLendingContractAddressUpdated"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PercentForRegen"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "RegenCollectiveAddressUpdated"
  ): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "RegenCollectiveBpsOfRevenueUpdated"
  ): EventFragment;
}

export type AssetToCAssetSetEvent = TypedEvent<
  [string, string],
  { asset: string; cAsset: string }
>;

export type AssetToCAssetSetEventFilter =
  TypedEventFilter<AssetToCAssetSetEvent>;

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

export type LiquiditySanctionsPausedEvent = TypedEvent<[], {}>;

export type LiquiditySanctionsPausedEventFilter =
  TypedEventFilter<LiquiditySanctionsPausedEvent>;

export type LiquiditySanctionsUnpausedEvent = TypedEvent<[], {}>;

export type LiquiditySanctionsUnpausedEventFilter =
  TypedEventFilter<LiquiditySanctionsUnpausedEvent>;

export type LiquidityXLendingContractAddressUpdatedEvent = TypedEvent<
  [string, string],
  { oldLendingContractAddress: string; newLendingContractAddress: string }
>;

export type LiquidityXLendingContractAddressUpdatedEventFilter =
  TypedEventFilter<LiquidityXLendingContractAddressUpdatedEvent>;

export type PercentForRegenEvent = TypedEvent<
  [string, string, BigNumber, BigNumber],
  {
    liquidityProvider: string;
    asset: string;
    tokenAmount: BigNumber;
    cTokenAmount: BigNumber;
  }
>;

export type PercentForRegenEventFilter = TypedEventFilter<PercentForRegenEvent>;

export type RegenCollectiveAddressUpdatedEvent = TypedEvent<
  [string],
  { newRegenCollectiveAddress: string }
>;

export type RegenCollectiveAddressUpdatedEventFilter =
  TypedEventFilter<RegenCollectiveAddressUpdatedEvent>;

export type RegenCollectiveBpsOfRevenueUpdatedEvent = TypedEvent<
  [number, number],
  {
    oldRegenCollectiveBpsOfRevenue: number;
    newRegenCollectiveBpsOfRevenue: number;
  }
>;

export type RegenCollectiveBpsOfRevenueUpdatedEventFilter =
  TypedEventFilter<RegenCollectiveBpsOfRevenueUpdatedEvent>;

export interface ILiquidityEvents extends BaseContract {
  contractName: "ILiquidityEvents";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ILiquidityEventsInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {};

  callStatic: {};

  filters: {
    "AssetToCAssetSet(address,address)"(
      asset?: null,
      cAsset?: null
    ): AssetToCAssetSetEventFilter;
    AssetToCAssetSet(asset?: null, cAsset?: null): AssetToCAssetSetEventFilter;

    "CErc20Supplied(address,address,uint256)"(
      liquidityProvider?: string | null,
      cAsset?: string | null,
      cTokenAmount?: null
    ): CErc20SuppliedEventFilter;
    CErc20Supplied(
      liquidityProvider?: string | null,
      cAsset?: string | null,
      cTokenAmount?: null
    ): CErc20SuppliedEventFilter;

    "CErc20Withdrawn(address,address,uint256)"(
      liquidityProvider?: string | null,
      cAsset?: string | null,
      cTokenAmount?: null
    ): CErc20WithdrawnEventFilter;
    CErc20Withdrawn(
      liquidityProvider?: string | null,
      cAsset?: string | null,
      cTokenAmount?: null
    ): CErc20WithdrawnEventFilter;

    "Erc20Supplied(address,address,uint256,uint256)"(
      liquidityProvider?: string | null,
      asset?: string | null,
      tokenAmount?: null,
      cTokenAmount?: null
    ): Erc20SuppliedEventFilter;
    Erc20Supplied(
      liquidityProvider?: string | null,
      asset?: string | null,
      tokenAmount?: null,
      cTokenAmount?: null
    ): Erc20SuppliedEventFilter;

    "Erc20Withdrawn(address,address,uint256,uint256)"(
      liquidityProvider?: string | null,
      asset?: string | null,
      tokenAmount?: null,
      cTokenAmount?: null
    ): Erc20WithdrawnEventFilter;
    Erc20Withdrawn(
      liquidityProvider?: string | null,
      asset?: string | null,
      tokenAmount?: null,
      cTokenAmount?: null
    ): Erc20WithdrawnEventFilter;

    "EthSupplied(address,uint256,uint256)"(
      liquidityProvider?: string | null,
      amount?: null,
      cTokenAmount?: null
    ): EthSuppliedEventFilter;
    EthSupplied(
      liquidityProvider?: string | null,
      amount?: null,
      cTokenAmount?: null
    ): EthSuppliedEventFilter;

    "EthWithdrawn(address,uint256,uint256)"(
      liquidityProvider?: string | null,
      amount?: null,
      cTokenAmount?: null
    ): EthWithdrawnEventFilter;
    EthWithdrawn(
      liquidityProvider?: string | null,
      amount?: null,
      cTokenAmount?: null
    ): EthWithdrawnEventFilter;

    "LiquiditySanctionsPaused()"(): LiquiditySanctionsPausedEventFilter;
    LiquiditySanctionsPaused(): LiquiditySanctionsPausedEventFilter;

    "LiquiditySanctionsUnpaused()"(): LiquiditySanctionsUnpausedEventFilter;
    LiquiditySanctionsUnpaused(): LiquiditySanctionsUnpausedEventFilter;

    "LiquidityXLendingContractAddressUpdated(address,address)"(
      oldLendingContractAddress?: null,
      newLendingContractAddress?: null
    ): LiquidityXLendingContractAddressUpdatedEventFilter;
    LiquidityXLendingContractAddressUpdated(
      oldLendingContractAddress?: null,
      newLendingContractAddress?: null
    ): LiquidityXLendingContractAddressUpdatedEventFilter;

    "PercentForRegen(address,address,uint256,uint256)"(
      liquidityProvider?: string | null,
      asset?: string | null,
      tokenAmount?: null,
      cTokenAmount?: null
    ): PercentForRegenEventFilter;
    PercentForRegen(
      liquidityProvider?: string | null,
      asset?: string | null,
      tokenAmount?: null,
      cTokenAmount?: null
    ): PercentForRegenEventFilter;

    "RegenCollectiveAddressUpdated(address)"(
      newRegenCollectiveAddress?: null
    ): RegenCollectiveAddressUpdatedEventFilter;
    RegenCollectiveAddressUpdated(
      newRegenCollectiveAddress?: null
    ): RegenCollectiveAddressUpdatedEventFilter;

    "RegenCollectiveBpsOfRevenueUpdated(uint16,uint16)"(
      oldRegenCollectiveBpsOfRevenue?: null,
      newRegenCollectiveBpsOfRevenue?: null
    ): RegenCollectiveBpsOfRevenueUpdatedEventFilter;
    RegenCollectiveBpsOfRevenueUpdated(
      oldRegenCollectiveBpsOfRevenue?: null,
      newRegenCollectiveBpsOfRevenue?: null
    ): RegenCollectiveBpsOfRevenueUpdatedEventFilter;
  };

  estimateGas: {};

  populateTransaction: {};
}