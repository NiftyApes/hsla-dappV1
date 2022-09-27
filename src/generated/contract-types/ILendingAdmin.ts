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
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface ILendingAdminInterface extends utils.Interface {
  contractName: "ILendingAdmin";
  functions: {
    "pause()": FunctionFragment;
    "pauseSanctions()": FunctionFragment;
    "unpause()": FunctionFragment;
    "unpauseSanctions()": FunctionFragment;
    "updateDefaultRefinancePremiumBps(uint16)": FunctionFragment;
    "updateGasGriefingPremiumBps(uint16)": FunctionFragment;
    "updateOriginationPremiumLenderBps(uint16)": FunctionFragment;
    "updateProtocolInterestBps(uint16)": FunctionFragment;
    "updateTermGriefingPremiumBps(uint16)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "pause", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "pauseSanctions",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "unpause", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "unpauseSanctions",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "updateDefaultRefinancePremiumBps",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "updateGasGriefingPremiumBps",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "updateOriginationPremiumLenderBps",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "updateProtocolInterestBps",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "updateTermGriefingPremiumBps",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pauseSanctions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "unpauseSanctions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateDefaultRefinancePremiumBps",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateGasGriefingPremiumBps",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateOriginationPremiumLenderBps",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateProtocolInterestBps",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateTermGriefingPremiumBps",
    data: BytesLike
  ): Result;

  events: {};
}

export interface ILendingAdmin extends BaseContract {
  contractName: "ILendingAdmin";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ILendingAdminInterface;

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
    pause(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    pauseSanctions(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    unpause(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    unpauseSanctions(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateDefaultRefinancePremiumBps(
      newDefaultRefinancePremiumBps: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateGasGriefingPremiumBps(
      newGasGriefingPremiumBps: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateOriginationPremiumLenderBps(
      newOriginationPremiumBps: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateProtocolInterestBps(
      newProtocolInterestBps: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateTermGriefingPremiumBps(
      newTermGriefingPremiumBps: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  pause(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  pauseSanctions(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  unpause(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  unpauseSanctions(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateDefaultRefinancePremiumBps(
    newDefaultRefinancePremiumBps: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateGasGriefingPremiumBps(
    newGasGriefingPremiumBps: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateOriginationPremiumLenderBps(
    newOriginationPremiumBps: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateProtocolInterestBps(
    newProtocolInterestBps: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateTermGriefingPremiumBps(
    newTermGriefingPremiumBps: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    pause(overrides?: CallOverrides): Promise<void>;

    pauseSanctions(overrides?: CallOverrides): Promise<void>;

    unpause(overrides?: CallOverrides): Promise<void>;

    unpauseSanctions(overrides?: CallOverrides): Promise<void>;

    updateDefaultRefinancePremiumBps(
      newDefaultRefinancePremiumBps: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    updateGasGriefingPremiumBps(
      newGasGriefingPremiumBps: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    updateOriginationPremiumLenderBps(
      newOriginationPremiumBps: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    updateProtocolInterestBps(
      newProtocolInterestBps: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    updateTermGriefingPremiumBps(
      newTermGriefingPremiumBps: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    pause(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    pauseSanctions(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    unpause(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    unpauseSanctions(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateDefaultRefinancePremiumBps(
      newDefaultRefinancePremiumBps: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateGasGriefingPremiumBps(
      newGasGriefingPremiumBps: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateOriginationPremiumLenderBps(
      newOriginationPremiumBps: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateProtocolInterestBps(
      newProtocolInterestBps: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateTermGriefingPremiumBps(
      newTermGriefingPremiumBps: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    pause(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    pauseSanctions(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    unpause(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    unpauseSanctions(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateDefaultRefinancePremiumBps(
      newDefaultRefinancePremiumBps: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateGasGriefingPremiumBps(
      newGasGriefingPremiumBps: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateOriginationPremiumLenderBps(
      newOriginationPremiumBps: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateProtocolInterestBps(
      newProtocolInterestBps: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateTermGriefingPremiumBps(
      newTermGriefingPremiumBps: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
