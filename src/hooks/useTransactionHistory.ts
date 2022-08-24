import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { getApiUrl } from 'helpers';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useWalletAddress } from './useWalletAddress';

export const useTransactionHistory = () => {
  const [transactions, setTransactions] = useState<any>();
  const address = useWalletAddress();
  const cacheCounter = useAppSelector((state: RootState) => state.counter);

  useEffect(() => {
    async function fetchLoanOffersForNFT() {
      const result = await fetch(getApiUrl(`transactions?from=${address}&lender=${address}`));
      const json = await result.json();
      const items = json;
      const sortedItems = _.sortBy(items, (i) => -i.Timestamp);
      setTransactions(sortedItems);
    }

    if (address) {
      fetchLoanOffersForNFT();
    }
  }, [address, cacheCounter]);

  return transactions;
};
