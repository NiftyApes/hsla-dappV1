import { useAppDispatch } from 'app/hooks';
import { increment } from 'counter/counterSlice';
import { saveLoanInDb } from 'helpers/saveLoanInDb';
import { useLendingContract } from './useContracts';

export const useExecuteLoanByBorrower = ({
  nftContractAddress,
  nftId,
  offerHash,
  floorTerm = false,
}: {
  nftContractAddress?: string;
  nftId: string;
  offerHash: string;
  floorTerm?: boolean;
}) => {
  const niftyApesContract = useLendingContract();

  const dispatch = useAppDispatch();

  if (!niftyApesContract) {
    return {
      executeLoanByBorrower: undefined,
    };
  }

  return {
    executeLoanByBorrower: async () => {
      if (!nftContractAddress) {
        throw new Error('NFT Contract Address not specified');
      }
      const tx = await niftyApesContract.executeLoanByBorrower(
        nftContractAddress,
        nftId,
        offerHash,
        floorTerm,
      );

      const receipt: any = await tx.wait();

      const loan = receipt.events[6].args[2];

      console.log('receipt', receipt);

      console.log(loan, loan.nftId);

      const loanObj = {
        creator: loan.creator,
        nftContractAddress: loan.nftContractAddress,
        nftId: String(Number(receipt.events[6].topics[2])),
        amount: loan.amount.toString(),
      };

      await saveLoanInDb({
        loanObj,
      });

      dispatch(increment());
    },
  };
};
