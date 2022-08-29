import { getActiveLoansByLender } from 'api/getActiveLoansByLender';
import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { getLoanForNft } from 'helpers/getLoanForNft';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useLendingContract } from './useContracts';
import { useWalletAddress } from './useWalletAddress';

export const useActiveLoansForLender = () => {
  const [loans, setLoans] = useState<any>();
  const address = useWalletAddress();
  const cacheCounter = useAppSelector((state: RootState) => state.counter);

  const lendingContract = useLendingContract();

  useEffect(() => {
    async function fetchLoanOffersForNFT() {
      if (!lendingContract || !address) {
        return;
      }

      const loans = await getActiveLoansByLender({ lenderAddress: address });

      // remove any loans in DB but not on-chain
      for (let i = 0; i < loans.length; i++) {
        const loan = loans[i];

        const loanFromChain = await getLoanForNft({
          nftContractAddress: loan.nftContractAddress,
          nftId: loan.nftId,
          lendingContract,
        });

        if (!loanFromChain || loanFromChain[0] === '0x0000000000000000000000000000000000000000') {
          loans[i] = undefined;
        }
      }

      const filteredOffers = _.compact(loans);

      setLoans(filteredOffers);
    }

    fetchLoanOffersForNFT();
  }, [address, lendingContract, cacheCounter]);

  console.log('loans', loans);

  return loans;
};
