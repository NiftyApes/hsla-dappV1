import { getAPR } from 'helpers/getAPR';
import { roundForDisplay } from 'helpers/roundForDisplay';
import { CoinSymbol } from '../../lib/constants/coinSymbols';

export type OfferTerms = {
  NftId: string;
  FloorTerm: boolean;
  Amount: string;
  Expiration: string;
  Duration: number;
  InterestRatePerSecond: number;
};

export enum OfferStatus {
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  CANCELED = 'CANCELED',
  ACCEPTED = 'ACCEPTED',
  CLOSED = 'CLOSED',
}

export interface LoanOffer {
  Creator: string;
  OfferHash: string;
  OfferStatus: string;
  OfferStatusEnum?: OfferStatus;
  OfferTerms: OfferTerms;
  Timestamp: number;
  amount: number;
  aprPercentage: number;
  duration: number;
  durationDays: number;
  expiration: number;
  expirationDays: number;
  totalInterest: number;
  interestRatePerSecond: number;
  type: 'top' | 'floor';
  symbol: CoinSymbol;
  floorOfferCount?: number;
  floorTermLimit?: number;
  signature?: string;
  OfferAttempt?: any;
}

const loanOffer = (json: any): LoanOffer => {
  const amount = json.OfferTerms.Amount;
  const interestRatePerSecond = Number(json.OfferTerms.InterestRatePerSecond);
  const expiration = Number(json.OfferTerms.Expiration);
  const duration = Number(json.OfferTerms.Duration);
  const offerStatus: keyof typeof OfferStatus = json.OfferStatus;

  const secondsInDay = 86400;

  return {
    ...json,
    OfferStatusEnum:
      json.OfferStatus && OfferStatus[offerStatus]
        ? OfferStatus[offerStatus]
        : undefined,
    // TODO: double check
    amount,
    aprPercentage: roundForDisplay(getAPR({ amount, interestRatePerSecond })),
    duration,
    durationDays: duration / secondsInDay,
    expiration,
    expirationDays: Number(
      ((Number(expiration) - Date.now() / 1000) / secondsInDay).toFixed(2),
    ),
    interestRatePerSecond,
    // Actual interest over the period of a loan
    totalInterest: ((interestRatePerSecond * duration) / amount) * 100,
    type: 'top',
    symbol: 'eth',
  };
};

export default loanOffer;

export const getBestLoanOffer = (offers: Array<LoanOffer>): LoanOffer => {
  if (offers.length === 1) {
    return offers[0];
  }

  return Array.from(offers).sort(
    (a: LoanOffer, b: LoanOffer) =>
      a.interestRatePerSecond - b.interestRatePerSecond,
  )[0];
};
