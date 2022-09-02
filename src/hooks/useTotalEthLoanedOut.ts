import { useActiveLoansForLender } from './useActiveLoansForLender';

export const useTotalEthLoanedOut = () => {
  const activeLoans = useActiveLoansForLender();

  const totalEthLoanedOut = activeLoans?.reduce((acc: number, loan: any) => {
    return acc + loan.amount;
  }, 0);

  return { totalEthLoanedOut };
};
