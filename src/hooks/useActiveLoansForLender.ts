/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-shadow */
import { getActiveLoansByLender } from 'api/getActiveLoansByLender';
import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { ethers } from 'ethers';
import { getLoanForNft } from 'helpers/getLoanForNft';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useChainId } from './useChainId';
import { useLendingContract } from './useContracts';
import { useWalletAddress } from './useWalletAddress';

export const useActiveLoansForLender = () => {
  const [loans, setLoans] = useState<any>();
  const address = useWalletAddress();
  const cacheCounter = useAppSelector((state: RootState) => state.counter);

  const lendingContract = useLendingContract();

  const chainId = useChainId();

  useEffect(() => {
    async function fetchActiveLoansForLender() {
      if (!lendingContract || !address || !chainId) {
        return;
      }

      const loans = await getActiveLoansByLender({
        chainId,
        lenderAddress: address,
      });

      // remove any loans in DB but not on-chain
      for (let i = 0; i < loans.length; i++) {
        const loan = loans[i];

        const loanFromChain = await getLoanForNft({
          nftContractAddress: loan.nftContractAddress,
          nftId: loan.nftId,
          lendingContract,
        });

        if (
          !loanFromChain ||
          loanFromChain[0] === '0x0000000000000000000000000000000000000000'
        ) {
          loans[i] = undefined;
        } else {
          const [accruedInterest] =
            await lendingContract.calculateInterestAccrued(
              loan.nftContractAddress,
              loan.nftId,
            );
          loans[i] = {
            ...loans[i],
            accruedInterest: Number(ethers.utils.formatEther(accruedInterest)),
            loanEndTimestamp: loanFromChain.loanEndTimestamp,
          };
        }
      }

      const filteredLoans = _.uniqBy(
        _.compact(loans),
        (loan: any) => `${loan.nftContractAddress}${loan.nftId}`,
      );

      setLoans(filteredLoans);
    }

    fetchActiveLoansForLender();
  }, [address, lendingContract, chainId, cacheCounter]);

  console.log('loans', loans);

  return loans;
};
