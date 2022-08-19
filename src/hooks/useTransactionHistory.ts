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
      // Note: an item's SK attribute is a string consisting
      // of its timestamp and transaction hash joined by "#"
      // i.e., `${timestamp}#${transactionHash}`
      const sortedItems = _.sortBy(items, (i) => -Number(i.SK.split('#')[0]));
      const processedItems = sortedItems.map((item: any) => ({
        ...item,
        Timestamp: item.SK.split('#')[0] * 1000,
        TransactionHash: item.SK.split('#')[1],
      }));
      setTransactions(processedItems);
    }

    if (address) {
      fetchLoanOffersForNFT();
    }
  }, [address, cacheCounter]);

  return transactions;
};
