import { TransactionType } from 'constants/transactionTypes';
import { getApiUrl } from './getApiUrl';

export async function saveTransactionInDb({
  from,
  transactionType,
  timestamp,
  transactionHash,
  borrower,
  lender,
  refinancedLender,
  data,
}: {
  from: string;
  transactionType: TransactionType;
  timestamp: number;
  transactionHash: string;
  borrower?: string;
  lender?: string;
  refinancedLender?: string;
  data: any;
}) {
  const result = await fetch(getApiUrl('transactions'), {
    method: 'POST',
    body: JSON.stringify({
      transactionType,
      timestamp,
      transactionHash,
      from,
      lender,
      borrower,
      refinancedLender,
      data,
    }),
  });
}
