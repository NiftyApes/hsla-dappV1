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
  args,
}: {
  from: string;
  transactionType: TransactionType;
  timestamp: number;
  transactionHash: string;
  borrower?: string;
  lender?: string;
  refinancedLender?: string;
  args: any;
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
      args,
    }),
  });
}
