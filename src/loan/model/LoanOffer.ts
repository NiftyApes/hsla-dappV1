export type OfferTerms = {
  NftId: string;
  FloorTerm: boolean;
  Amount: string;
  Expiration: string;
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
  OfferHash: string;
  OfferStatus: string;
  OfferStatusEnum?: OfferStatus;
  OfferTerms: OfferTerms;
  Creator: string;
  Timestamp: number;
  amount: number;
  aprPercentage: number;
  days: number;
  expiration: number;
  interestRatePerSecond: number;
}

const loanOffer = (json: any): LoanOffer => {
  const amount = json.OfferTerms.Amount;
  const interestRatePerSecond = Number(json.OfferTerms.InterestRatePerSecond);
  const expiration = Number(json.OfferTerms.Expiration);
  const offerStatus: keyof typeof OfferStatus = json.OfferStatus;

  return {
    ...json,
    OfferStatusEnum:
      json.OfferStatus && OfferStatus[offerStatus] ? OfferStatus[offerStatus] : undefined,
    amount,
    interestRatePerSecond,
    expiration,
    // TODO: double check
    aprPercentage:
      amount !== 0
        ? Number(Number(((interestRatePerSecond * (365 * 24 * 60 * 60)) / amount) * 100).toFixed(2))
        : 0,
    days: Number(((Number(expiration) - Date.now() / 1000) / (24 * 60 * 60)).toFixed(2)),
  };
};

export default loanOffer;
