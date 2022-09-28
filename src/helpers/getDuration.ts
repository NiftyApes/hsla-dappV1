import moment from "moment";
import {LoanAuction} from "../loan";

export const getLoanDurationDays = (loan: LoanAuction): string => {
    return `${Math.round((loan.loanEndTimestamp - loan.loanBeginTimestamp) / 86400)} days`;
}
export const getLoanTimeRemaining = (loan: LoanAuction): string => {
    const endMoment = moment(loan.loanEndTimestamp * 1000);
    return endMoment.toNow(true);
}
export const isLoanDefaulted = (loan: LoanAuction): boolean => {
    const endMoment = moment(loan.loanEndTimestamp * 1000);
    return moment().isAfter(endMoment);
}