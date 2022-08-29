import { getLiquidityEventsByLender } from 'api/getLiquidityEventsByLender';
import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { useEffect, useState } from 'react';
import { useWalletAddress } from './useWalletAddress';

export const useTransactionHistory = () => {
  const [transactions, setTransactions] = useState<any>();
  const address = useWalletAddress();
  const cacheCounter = useAppSelector((state: RootState) => state.counter);

  useEffect(() => {
    async function fetchLoanOffersForNFT() {
      if (address) {
        const liquidityEvents = await getLiquidityEventsByLender({ lenderAddress: address });
        setTransactions(liquidityEvents);
      }
    }

    if (address) {
      fetchLoanOffersForNFT();
    }
  }, [address, cacheCounter]);

  return transactions;
};
