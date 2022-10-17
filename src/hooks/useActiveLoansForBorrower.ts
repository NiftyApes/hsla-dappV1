/* eslint-disable no-await-in-loop */
import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { getLoanForNft } from 'helpers/getLoanForNft';
import { useEffect, useState } from 'react';
import { getActiveLoansByBorrower } from '../api/getActiveLoansByBorrower';
import { loanAuction, LoanAuction } from '../loan';
import { useChainId } from './useChainId';
import { useLendingContract } from './useContracts';
import { useWalletAddress } from './useWalletAddress';

export const useActiveLoansForBorrower = () => {
  const [loans, setLoans] = useState<any>();
  const address = useWalletAddress();
  const cacheCounter = useAppSelector((state: RootState) => state.counter);

  const lendingContract = useLendingContract();

  const chainId = useChainId();

  useEffect(() => {
    const fetchLoans = async () => {
      if (!lendingContract || !address || !chainId) {
        return;
      }

      const dbLoans = await getActiveLoansByBorrower({ chainId, address });

      const chainLoans: Array<LoanAuction> = [];

      for (let i = 0; i < dbLoans.length; i++) {
        const loan: any = dbLoans[i];

        const chainLoan = await getLoanForNft({
          nftContractAddress: loan.nftContractAddress,
          nftId: loan.nftId,
          lendingContract,
        });

        if (
          chainLoan &&
          chainLoan[0] !== '0x0000000000000000000000000000000000000000'
        ) {
          const la: LoanAuction = loanAuction(chainLoan, loan.transactionHash);

          // Amend loan auction with NFT props that are not included in the LoanAuctionStructOutput struct
          la.nftId = loan.nftId;
          la.nftContractAddress = loan.nftContractAddress;

          chainLoans.push(la);
        }
      }
      setLoans(chainLoans);
    };

    fetchLoans();
  }, [address, lendingContract, chainId, cacheCounter]);

  return loans;
};
