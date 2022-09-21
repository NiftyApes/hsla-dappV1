import {getApiUrl} from 'helpers';

export const getActiveLoansByBorrower = async ({address}: { address: string }) => {
    const result = await fetch(getApiUrl(`loans?borrower=${address}&status=active`));
    const json = await result.json();

    return json.map((item: any) => {

        return {
            amount: item.LoanTerms.Amount,
            duration: item.LoanTerms.Duration,
            interestRatePerSecond: item.LoanTerms.InterestRatePerSecond,
            loanBeginTimestamp: item.LoanTerms.LoanBeginTimestamp,
            loanEndTimestamp: item.LoanTerms.LoanEndTimestamp,
            nftContractAddress: item.Collection,
            nftId: item.NftId,
            transactionHash: item.TransactionHash,
        };
    });
};
