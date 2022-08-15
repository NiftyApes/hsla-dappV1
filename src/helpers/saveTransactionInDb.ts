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
  transactionType:
    | 'DEPOSIT_LIQUIDITY'
    | 'WITHDRAW_LIQUIDITY'
    | 'LOAN_EXECUTED_BY_BORROWER'
    | 'REFINANCE_EXECUTED_BY_LENDER'
    | 'LOAN_FULLY_REPAID_BY_BORROWER'
    | 'ASSET_SEIZED_BY_LENDER';
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
