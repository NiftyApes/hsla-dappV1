/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { BaseContract, BigNumber, BigNumberish, Signer, utils } from "ethers";
import { EventFragment } from "@ethersproject/abi";
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

export interface ILendingEventsInterface extends utils.Interface {
  contractName: "ILendingEvents";
  functions: {};

  events: {
    "AmountDrawn(address,uint256,uint256,uint256)": EventFragment;
    "AssetSeized(address,address,address,uint256)": EventFragment;
    "DefaultRefinancePremiumBpsUpdated(uint16,uint16)": EventFragment;
    "GasGriefingPremiumBpsUpdated(uint16,uint16)": EventFragment;
    "GasGriefingProtocolPremiumBpsUpdated(uint16,uint16)": EventFragment;
    "LendingSanctionsPaused()": EventFragment;
    "LendingSanctionsUnpaused()": EventFragment;
    "LoanExecuted(address,uint256,tuple)": EventFragment;
    "LoanRepaid(address,address,address,uint256,address,uint256)": EventFragment;
    "OriginationPremiumBpsUpdated(uint16,uint16)": EventFragment;
    "PartialRepayment(address,address,address,uint256,address,uint256)": EventFragment;
    "ProtocolInterestBpsUpdated(uint96,uint96)": EventFragment;
    "Refinance(address,uint256,tuple)": EventFragment;
    "TermGriefingPremiumBpsUpdated(uint16,uint16)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AmountDrawn"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AssetSeized"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "DefaultRefinancePremiumBpsUpdated"
  ): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "GasGriefingPremiumBpsUpdated"
  ): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "GasGriefingProtocolPremiumBpsUpdated"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LendingSanctionsPaused"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LendingSanctionsUnpaused"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LoanExecuted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LoanRepaid"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "OriginationPremiumBpsUpdated"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PartialRepayment"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProtocolInterestBpsUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Refinance"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "TermGriefingPremiumBpsUpdated"
  ): EventFragment;
}

export type AmountDrawnEvent = TypedEvent<
  [string, BigNumber, BigNumber, BigNumber],
  {
    nftContractAddress: string;
    nftId: BigNumber;
    drawAmount: BigNumber;
    totalDrawn: BigNumber;
  }
>;

export type AmountDrawnEventFilter = TypedEventFilter<AmountDrawnEvent>;

export type AssetSeizedEvent = TypedEvent<
  [string, string, string, BigNumber],
  {
    lender: string;
    borrower: string;
    nftContractAddress: string;
    nftId: BigNumber;
  }
>;

export type AssetSeizedEventFilter = TypedEventFilter<AssetSeizedEvent>;

export type DefaultRefinancePremiumBpsUpdatedEvent = TypedEvent<
  [number, number],
  {
    oldDefaultRefinancePremiumBps: number;
    newDefaultRefinancePremiumBps: number;
  }
>;

export type DefaultRefinancePremiumBpsUpdatedEventFilter =
  TypedEventFilter<DefaultRefinancePremiumBpsUpdatedEvent>;

export type GasGriefingPremiumBpsUpdatedEvent = TypedEvent<
  [number, number],
  { oldGasGriefingPremiumBps: number; newGasGriefingPremiumBps: number }
>;

export type GasGriefingPremiumBpsUpdatedEventFilter =
  TypedEventFilter<GasGriefingPremiumBpsUpdatedEvent>;

export type GasGriefingProtocolPremiumBpsUpdatedEvent = TypedEvent<
  [number, number],
  {
    oldGasGriefingProtocolPremiumBps: number;
    newGasGriefingProtocolPremiumBps: number;
  }
>;

export type GasGriefingProtocolPremiumBpsUpdatedEventFilter =
  TypedEventFilter<GasGriefingProtocolPremiumBpsUpdatedEvent>;

export type LendingSanctionsPausedEvent = TypedEvent<[], {}>;

export type LendingSanctionsPausedEventFilter =
  TypedEventFilter<LendingSanctionsPausedEvent>;

export type LendingSanctionsUnpausedEvent = TypedEvent<[], {}>;

export type LendingSanctionsUnpausedEventFilter =
  TypedEventFilter<LendingSanctionsUnpausedEvent>;

export type LoanExecutedEvent = TypedEvent<
  [string, BigNumber, IOffersStructs.OfferStructOutput],
  {
    nftContractAddress: string;
    nftId: BigNumber;
    offer: IOffersStructs.OfferStructOutput;
  }
>;

export type LoanExecutedEventFilter = TypedEventFilter<LoanExecutedEvent>;

export type LoanRepaidEvent = TypedEvent<
  [string, string, string, BigNumber, string, BigNumber],
  {
    lender: string;
    borrower: string;
    nftContractAddress: string;
    nftId: BigNumber;
    asset: string;
    totalPayment: BigNumber;
  }
>;

export type LoanRepaidEventFilter = TypedEventFilter<LoanRepaidEvent>;

export type OriginationPremiumBpsUpdatedEvent = TypedEvent<
  [number, number],
  { oldOriginationPremiumBps: number; newOriginationPremiumBps: number }
>;

export type OriginationPremiumBpsUpdatedEventFilter =
  TypedEventFilter<OriginationPremiumBpsUpdatedEvent>;

export type PartialRepaymentEvent = TypedEvent<
  [string, string, string, BigNumber, string, BigNumber],
  {
    lender: string;
    borrower: string;
    nftContractAddress: string;
    nftId: BigNumber;
    asset: string;
    amount: BigNumber;
  }
>;

export type PartialRepaymentEventFilter =
  TypedEventFilter<PartialRepaymentEvent>;

export type ProtocolInterestBpsUpdatedEvent = TypedEvent<
  [BigNumber, BigNumber],
  { oldProtocolInterestBps: BigNumber; newProtocolInterestBps: BigNumber }
>;

export type ProtocolInterestBpsUpdatedEventFilter =
  TypedEventFilter<ProtocolInterestBpsUpdatedEvent>;

export type RefinanceEvent = TypedEvent<
  [string, BigNumber, IOffersStructs.OfferStructOutput],
  {
    nftContractAddress: string;
    nftId: BigNumber;
    offer: IOffersStructs.OfferStructOutput;
  }
>;

export type RefinanceEventFilter = TypedEventFilter<RefinanceEvent>;

export type TermGriefingPremiumBpsUpdatedEvent = TypedEvent<
  [number, number],
  { oldTermGriefingPremiumBps: number; newTermGriefingPremiumBps: number }
>;

export type TermGriefingPremiumBpsUpdatedEventFilter =
  TypedEventFilter<TermGriefingPremiumBpsUpdatedEvent>;

export interface ILendingEvents extends BaseContract {
  contractName: "ILendingEvents";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ILendingEventsInterface;

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
    "AmountDrawn(address,uint256,uint256,uint256)"(
      nftContractAddress?: string | null,
      nftId?: BigNumberish | null,
      drawAmount?: null,
      totalDrawn?: null
    ): AmountDrawnEventFilter;
    AmountDrawn(
      nftContractAddress?: string | null,
      nftId?: BigNumberish | null,
      drawAmount?: null,
      totalDrawn?: null
    ): AmountDrawnEventFilter;

    "AssetSeized(address,address,address,uint256)"(
      lender?: string | null,
      borrower?: null,
      nftContractAddress?: string | null,
      nftId?: BigNumberish | null
    ): AssetSeizedEventFilter;
    AssetSeized(
      lender?: string | null,
      borrower?: null,
      nftContractAddress?: string | null,
      nftId?: BigNumberish | null
    ): AssetSeizedEventFilter;

    "DefaultRefinancePremiumBpsUpdated(uint16,uint16)"(
      oldDefaultRefinancePremiumBps?: null,
      newDefaultRefinancePremiumBps?: null
    ): DefaultRefinancePremiumBpsUpdatedEventFilter;
    DefaultRefinancePremiumBpsUpdated(
      oldDefaultRefinancePremiumBps?: null,
      newDefaultRefinancePremiumBps?: null
    ): DefaultRefinancePremiumBpsUpdatedEventFilter;

    "GasGriefingPremiumBpsUpdated(uint16,uint16)"(
      oldGasGriefingPremiumBps?: null,
      newGasGriefingPremiumBps?: null
    ): GasGriefingPremiumBpsUpdatedEventFilter;
    GasGriefingPremiumBpsUpdated(
      oldGasGriefingPremiumBps?: null,
      newGasGriefingPremiumBps?: null
    ): GasGriefingPremiumBpsUpdatedEventFilter;

    "GasGriefingProtocolPremiumBpsUpdated(uint16,uint16)"(
      oldGasGriefingProtocolPremiumBps?: null,
      newGasGriefingProtocolPremiumBps?: null
    ): GasGriefingProtocolPremiumBpsUpdatedEventFilter;
    GasGriefingProtocolPremiumBpsUpdated(
      oldGasGriefingProtocolPremiumBps?: null,
      newGasGriefingProtocolPremiumBps?: null
    ): GasGriefingProtocolPremiumBpsUpdatedEventFilter;

    "LendingSanctionsPaused()"(): LendingSanctionsPausedEventFilter;
    LendingSanctionsPaused(): LendingSanctionsPausedEventFilter;

    "LendingSanctionsUnpaused()"(): LendingSanctionsUnpausedEventFilter;
    LendingSanctionsUnpaused(): LendingSanctionsUnpausedEventFilter;

    "LoanExecuted(address,uint256,tuple)"(
      nftContractAddress?: string | null,
      nftId?: BigNumberish | null,
      offer?: null
    ): LoanExecutedEventFilter;
    LoanExecuted(
      nftContractAddress?: string | null,
      nftId?: BigNumberish | null,
      offer?: null
    ): LoanExecutedEventFilter;

    "LoanRepaid(address,address,address,uint256,address,uint256)"(
      lender?: string | null,
      borrower?: null,
      nftContractAddress?: string | null,
      nftId?: BigNumberish | null,
      asset?: null,
      totalPayment?: null
    ): LoanRepaidEventFilter;
    LoanRepaid(
      lender?: string | null,
      borrower?: null,
      nftContractAddress?: string | null,
      nftId?: BigNumberish | null,
      asset?: null,
      totalPayment?: null
    ): LoanRepaidEventFilter;

    "OriginationPremiumBpsUpdated(uint16,uint16)"(
      oldOriginationPremiumBps?: null,
      newOriginationPremiumBps?: null
    ): OriginationPremiumBpsUpdatedEventFilter;
    OriginationPremiumBpsUpdated(
      oldOriginationPremiumBps?: null,
      newOriginationPremiumBps?: null
    ): OriginationPremiumBpsUpdatedEventFilter;

    "PartialRepayment(address,address,address,uint256,address,uint256)"(
      lender?: string | null,
      borrower?: null,
      nftContractAddress?: string | null,
      nftId?: BigNumberish | null,
      asset?: null,
      amount?: null
    ): PartialRepaymentEventFilter;
    PartialRepayment(
      lender?: string | null,
      borrower?: null,
      nftContractAddress?: string | null,
      nftId?: BigNumberish | null,
      asset?: null,
      amount?: null
    ): PartialRepaymentEventFilter;

    "ProtocolInterestBpsUpdated(uint96,uint96)"(
      oldProtocolInterestBps?: null,
      newProtocolInterestBps?: null
    ): ProtocolInterestBpsUpdatedEventFilter;
    ProtocolInterestBpsUpdated(
      oldProtocolInterestBps?: null,
      newProtocolInterestBps?: null
    ): ProtocolInterestBpsUpdatedEventFilter;

    "Refinance(address,uint256,tuple)"(
      nftContractAddress?: string | null,
      nftId?: BigNumberish | null,
      offer?: null
    ): RefinanceEventFilter;
    Refinance(
      nftContractAddress?: string | null,
      nftId?: BigNumberish | null,
      offer?: null
    ): RefinanceEventFilter;

    "TermGriefingPremiumBpsUpdated(uint16,uint16)"(
      oldTermGriefingPremiumBps?: null,
      newTermGriefingPremiumBps?: null
    ): TermGriefingPremiumBpsUpdatedEventFilter;
    TermGriefingPremiumBpsUpdated(
      oldTermGriefingPremiumBps?: null,
      newTermGriefingPremiumBps?: null
    ): TermGriefingPremiumBpsUpdatedEventFilter;
  };

  estimateGas: {};

  populateTransaction: {};
}