import { BigNumber } from 'ethers';
import { ILendingStructs } from '../../generated/contract-types/ILending';

export interface LoanAuction {
  accumulatedLenderInterest: BigNumber;
  accumulatedPaidProtocolInterest: BigNumber;
  amount: BigNumber;
  amountDrawn: BigNumber;
  asset: string;
  fixedTerms: boolean;
  interestRatePerSecond: BigNumber;
  lastUpdatedTimestamp: number;
  lender: string;
  loanBeginTimestamp: number;
  loanEndTimestamp: number;
  loanTxnHash?: string;
  nftContractAddress?: string;
  nftId?: string;
  nftOwner: string;
  protocolInterestRatePerSecond: BigNumber;
}

const loanAuction = (
  {
    accumulatedLenderInterest,
    accumulatedPaidProtocolInterest,
    amount,
    amountDrawn,
    asset,
    fixedTerms,
    interestRatePerSecond,
    lastUpdatedTimestamp,
    lender,
    loanBeginTimestamp,
    loanEndTimestamp,
    nftOwner,
    protocolInterestRatePerSecond,
  }: ILendingStructs.LoanAuctionStructOutput,
  txnHash?: string | undefined,
): LoanAuction => {
  return {
    accumulatedLenderInterest,
    accumulatedPaidProtocolInterest,
    amount,
    amountDrawn,
    asset,
    fixedTerms,
    interestRatePerSecond,
    lastUpdatedTimestamp,
    lender,
    loanBeginTimestamp,
    loanEndTimestamp,
    loanTxnHash: txnHash,
    nftOwner,
    protocolInterestRatePerSecond,
  };
};

export default loanAuction;
