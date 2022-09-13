import { useActiveLoansForLender } from './useActiveLoansForLender';

export const useTotalEthLoanedOut = () => {
  const activeLoans = useActiveLoansForLender();

  const totalEthLoanedOut = activeLoans?.reduce((acc: number, loan: any) => {
    return acc + Number(loan.amount);
  }, 0);

  return { totalEthLoanedOut };
};
