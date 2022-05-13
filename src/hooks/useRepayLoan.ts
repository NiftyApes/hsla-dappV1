import { useAppDispatch } from 'app/hooks';
import { increment } from 'counter/counterSlice';
import { ethers } from 'ethers';
import { useNiftyApesContract } from './useNiftyApesContract';

// TODO: Replace with dynamic value
const TEST_ETH_AMOUNT = '2.0';

export const useRepayLoanByBorrower = ({
  nftContractAddress,
  nftId,
}: {
  nftContractAddress?: string;
  nftId: string;
}) => {
  const niftyApesContract = useNiftyApesContract();

  const dispatch = useAppDispatch();

  if (!niftyApesContract) {
    return {
      executeLoanByBorrower: undefined,
    };
  }

  return {
    repayLoanByBorrower: async () => {
      const tx = await niftyApesContract.repayLoan(nftContractAddress, nftId, {
        value: ethers.utils.parseEther(TEST_ETH_AMOUNT),
      });

      await tx.wait();

      dispatch(increment());
    },
  };
};