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
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export declare namespace IOffersStructs {
  export type OfferStruct = {
    creator: string;
    duration: BigNumberish;
    expiration: BigNumberish;
    fixedTerms: boolean;
    floorTerm: boolean;
    lenderOffer: boolean;
    nftContractAddress: string;
    nftId: BigNumberish;
    asset: string;
    amount: BigNumberish;
    interestRatePerSecond: BigNumberish;
  };

  export type OfferStructOutput = [
    string,
    number,
    number,
    boolean,
    boolean,
    boolean,
    string,
    BigNumber,
    string,
    BigNumber,
    BigNumber
  ] & {
    creator: string;
    duration: number;
    expiration: number;
    fixedTerms: boolean;
    floorTerm: boolean;
    lenderOffer: boolean;
    nftContractAddress: string;
    nftId: BigNumber;
    asset: string;
    amount: BigNumber;
    interestRatePerSecond: BigNumber;
  };
}

export interface ISigLendingInterface extends utils.Interface {
  contractName: "ISigLending";
  functions: {
    "executeLoanByBorrowerSignature((address,uint32,uint32,bool,bool,bool,address,uint256,address,uint128,uint96),bytes,uint256)": FunctionFragment;
    "executeLoanByLenderSignature((address,uint32,uint32,bool,bool,bool,address,uint256,address,uint128,uint96),bytes)": FunctionFragment;
    "lendingContractAddress()": FunctionFragment;
    "offersContractAddress()": FunctionFragment;
    "pause()": FunctionFragment;
    "refinanceByBorrowerSignature((address,uint32,uint32,bool,bool,bool,address,uint256,address,uint128,uint96),bytes,uint256,uint32)": FunctionFragment;
    "unpause()": FunctionFragment;
    "updateLendingContractAddress(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "executeLoanByBorrowerSignature",
    values: [IOffersStructs.OfferStruct, BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "executeLoanByLenderSignature",
    values: [IOffersStructs.OfferStruct, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "lendingContractAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "offersContractAddress",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "pause", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "refinanceByBorrowerSignature",
    values: [IOffersStructs.OfferStruct, BytesLike, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "unpause", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "updateLendingContractAddress",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "executeLoanByBorrowerSignature",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "executeLoanByLenderSignature",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lendingContractAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "offersContractAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "refinanceByBorrowerSignature",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "updateLendingContractAddress",
    data: BytesLike
  ): Result;

  events: {
    "SigLendingXLendingContractAddressUpdated(address,address)": EventFragment;
  };

  getEvent(
    nameOrSignatureOrTopic: "SigLendingXLendingContractAddressUpdated"
  ): EventFragment;
}

export type SigLendingXLendingContractAddressUpdatedEvent = TypedEvent<
  [string, string],
  { oldLendingContractAddress: string; newLendingContractAddress: string }
>;

export type SigLendingXLendingContractAddressUpdatedEventFilter =
  TypedEventFilter<SigLendingXLendingContractAddressUpdatedEvent>;

export interface ISigLending extends BaseContract {
  contractName: "ISigLending";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ISigLendingInterface;

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

  functions: {
    executeLoanByBorrowerSignature(
      offer: IOffersStructs.OfferStruct,
      signature: BytesLike,
      nftId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    executeLoanByLenderSignature(
      offer: IOffersStructs.OfferStruct,
      signature: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    lendingContractAddress(overrides?: CallOverrides): Promise<[string]>;

    offersContractAddress(overrides?: CallOverrides): Promise<[string]>;

    pause(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    refinanceByBorrowerSignature(
      offer: IOffersStructs.OfferStruct,
      signature: BytesLike,
      nftId: BigNumberish,
      expectedLastUpdatedTimestamp: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    unpause(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateLendingContractAddress(
      newLendingContractAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  executeLoanByBorrowerSignature(
    offer: IOffersStructs.OfferStruct,
    signature: BytesLike,
    nftId: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  executeLoanByLenderSignature(
    offer: IOffersStructs.OfferStruct,
    signature: BytesLike,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  lendingContractAddress(overrides?: CallOverrides): Promise<string>;

  offersContractAddress(overrides?: CallOverrides): Promise<string>;

  pause(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  refinanceByBorrowerSignature(
    offer: IOffersStructs.OfferStruct,
    signature: BytesLike,
    nftId: BigNumberish,
    expectedLastUpdatedTimestamp: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  unpause(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateLendingContractAddress(
    newLendingContractAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    executeLoanByBorrowerSignature(
      offer: IOffersStructs.OfferStruct,
      signature: BytesLike,
      nftId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    executeLoanByLenderSignature(
      offer: IOffersStructs.OfferStruct,
      signature: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    lendingContractAddress(overrides?: CallOverrides): Promise<string>;

    offersContractAddress(overrides?: CallOverrides): Promise<string>;

    pause(overrides?: CallOverrides): Promise<void>;

    refinanceByBorrowerSignature(
      offer: IOffersStructs.OfferStruct,
      signature: BytesLike,
      nftId: BigNumberish,
      expectedLastUpdatedTimestamp: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    unpause(overrides?: CallOverrides): Promise<void>;

    updateLendingContractAddress(
      newLendingContractAddress: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "SigLendingXLendingContractAddressUpdated(address,address)"(
      oldLendingContractAddress?: null,
      newLendingContractAddress?: null
    ): SigLendingXLendingContractAddressUpdatedEventFilter;
    SigLendingXLendingContractAddressUpdated(
      oldLendingContractAddress?: null,
      newLendingContractAddress?: null
    ): SigLendingXLendingContractAddressUpdatedEventFilter;
  };

  estimateGas: {
    executeLoanByBorrowerSignature(
      offer: IOffersStructs.OfferStruct,
      signature: BytesLike,
      nftId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    executeLoanByLenderSignature(
      offer: IOffersStructs.OfferStruct,
      signature: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    lendingContractAddress(overrides?: CallOverrides): Promise<BigNumber>;

    offersContractAddress(overrides?: CallOverrides): Promise<BigNumber>;

    pause(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    refinanceByBorrowerSignature(
      offer: IOffersStructs.OfferStruct,
      signature: BytesLike,
      nftId: BigNumberish,
      expectedLastUpdatedTimestamp: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    unpause(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateLendingContractAddress(
      newLendingContractAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    executeLoanByBorrowerSignature(
      offer: IOffersStructs.OfferStruct,
      signature: BytesLike,
      nftId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    executeLoanByLenderSignature(
      offer: IOffersStructs.OfferStruct,
      signature: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    lendingContractAddress(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    offersContractAddress(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    pause(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    refinanceByBorrowerSignature(
      offer: IOffersStructs.OfferStruct,
      signature: BytesLike,
      nftId: BigNumberish,
      expectedLastUpdatedTimestamp: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    unpause(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateLendingContractAddress(
      newLendingContractAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
