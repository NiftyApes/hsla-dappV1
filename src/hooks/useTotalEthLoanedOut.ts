import { ethers } from 'ethers';
import { useActiveLoansForLender } from './useActiveLoansForLender';

export const useTotalEthLoanedOut = () => {
  const activeLoans = useActiveLoansForLender();

  const totalEthLoanedOut = activeLoans?.reduce((acc: number, loan: any) => {
    return acc + Number(ethers.utils.formatEther(loan.amount));
  }, 0);

  return { totalEthLoanedOut };
};
