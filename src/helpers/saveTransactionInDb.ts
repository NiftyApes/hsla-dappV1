import { TransactionType } from 'constants/transactionTypes';
import { getApiUrl } from './getApiUrl';

export async function saveTransactionInDb({
  chainId,
  from,
  transactionType,
  timestamp,
  transactionHash,
  borrower,
  lender,
  refinancedLender,
  data,
}: {
  chainId: string;
  from: string;
  transactionType: TransactionType;
  timestamp: number;
  transactionHash: string;
  borrower?: string;
  lender?: string;
  refinancedLender?: string;
  data: any;
}) {
  const result = await fetch(getApiUrl(chainId, 'events'), {
    method: 'POST',
    body: JSON.stringify({
      eventType: transactionType,
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
