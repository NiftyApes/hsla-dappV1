import { ILendingStructs } from '../../generated/contract-types/ILending';

export interface LoanAuction {
  nftOwner: string;
  loanEndTimestamp: number;
  lastUpdatedTimestamp: number;
  fixedTerms: boolean;
  lender: string;
  interestRatePerSecond: number;
  asset: string;
  loanBeginTimestamp: number;
  accumulatedLenderInterest: number;
  accumulatedProtocolInterest: number;
  amount: number;
  amountDrawn: number;
  protocolInterestRatePerSecond: number;
}

const loanAuction = ({
  nftOwner,
  loanEndTimestamp,
  lastUpdatedTimestamp,
  fixedTerms,
  lender,
  interestRatePerSecond,
  asset,
  loanBeginTimestamp,
  accumulatedLenderInterest,
  accumulatedProtocolInterest,
  amount,
  amountDrawn,
  protocolInterestRatePerSecond,
}: ILendingStructs.LoanAuctionStructOutput): LoanAuction => {
  return {
    nftOwner,
    loanEndTimestamp,
    lastUpdatedTimestamp,
    fixedTerms,
    lender,
    interestRatePerSecond: interestRatePerSecond.toNumber(),
    asset,
    loanBeginTimestamp,
    accumulatedLenderInterest: accumulatedLenderInterest.toNumber(),
    accumulatedProtocolInterest: accumulatedProtocolInterest.toNumber(),
    amount: amount.toNumber(),
    amountDrawn: amountDrawn.toNumber(),
    protocolInterestRatePerSecond: protocolInterestRatePerSecond.toNumber(),
  };
};

export default loanAuction;
