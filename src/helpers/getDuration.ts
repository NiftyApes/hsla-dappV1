import moment from 'moment';
import { LoanAuction, LoanOffer } from '../loan';

export const getLoanDurationDays = (loan: LoanAuction): string => {
  return `${Math.round(
    (loan.loanEndTimestamp - loan.loanBeginTimestamp) / 86400,
  )} days`;
};
export const getLoanBeginDate = (loan: LoanAuction): string => {
  return moment(loan.loanBeginTimestamp * 1000).format('MMM D, YYYY');
};

export const getLoanTimeRemaining = (loan: LoanAuction): string => {
  const endMoment = moment(loan.loanEndTimestamp * 1000);
  return endMoment.toNow(true);
};
export const isLoanDefaulted = (loan: LoanAuction): boolean => {
  const endMoment = moment(loan.loanEndTimestamp * 1000);
  return moment().isAfter(endMoment);
};
export const getOfferTimeRemaining = (offer: LoanOffer): string => {
  const endMoment = moment(offer.expiration * 1000);
  return endMoment.toNow(true);
};
