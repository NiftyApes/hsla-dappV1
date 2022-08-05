import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { BigNumber } from 'ethers';
import { getLoanForNft } from 'helpers/getLoanForNft';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useLendingContract } from './useContracts';
import { useWalletAddress } from './useWalletAddress';
import { useWalletProvider } from './useWalletProvider';

export const useActiveLoansForLender = () => {
  const [loans, setLoans] = useState<any>();
  const address = useWalletAddress();
  const cacheCounter = useAppSelector((state: RootState) => state.counter);

  const provider = useWalletProvider();
  const lendingContract = useLendingContract();

  useEffect(() => {
    async function fetchLoanOffersForNFT() {
      if (!lendingContract) {
        return;
      }

      const result = await fetch(
        `https://qqxeqsrt39.execute-api.us-west-2.amazonaws.com/DEV/api/loans?creator=${address}&status=ACTIVE`,
      );

      const json = await result.json();

      console.log('1', json);

      const processedLoans = json.Items.map((item: any) => {
        return {
          nftId: item['NftContractAddress#NftId'].split('#')[1],
          nftContractAddress: item['NftContractAddress#NftId'].split('#')[0],
          amount: BigNumber.from(String(item.LoanTerms.Amount)),
        };
      });

      for (let i = 0; i < processedLoans.length; i++) {
        const loan = processedLoans[i];

        const loanFromChain = await getLoanForNft({
          nftContractAddress: loan.nftContractAddress,
          nftId: loan.nftId,
          lendingContract,
        });

        console.log(loan.nftContractAddress, loan.nftId, loanFromChain);

        if (!loanFromChain || loanFromChain[0] === '0x0000000000000000000000000000000000000000') {
          processedLoans[i] = undefined;
        }
      }

      const filteredOffers = _.compact(processedLoans);

      setLoans(filteredOffers);
    }

    fetchLoanOffersForNFT();
  }, [address, lendingContract, cacheCounter]);

  if (!loans) {
    return undefined;
  }

  return loans;
};
