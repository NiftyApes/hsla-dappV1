import {useEffect, useState} from 'react';
import {useAppSelector} from 'app/hooks';
import {RootState} from 'app/store';
import {getLoanForNft} from 'helpers/getLoanForNft';
import {useLendingContract} from './useContracts';
import {useWalletAddress} from './useWalletAddress';
import {getActiveLoansByBorrower} from '../api/getActiveLoansByBorrower';
import {loanAuction, LoanAuction} from '../loan';

export const useActiveLoansForBorrower = () => {
    const [loans, setLoans] = useState<any>();
    const address = useWalletAddress();
    const cacheCounter = useAppSelector((state: RootState) => state.counter);

    const lendingContract = useLendingContract();

    useEffect(() => {
        const fetchLoans = async () => {
            if (!lendingContract || !address) {
                return;
            }
            const dbLoans = await getActiveLoansByBorrower({address});
            const chainLoans: Array<LoanAuction> = [];

            for (let i = 0; i < dbLoans.length; i++) {


                const loan: any = dbLoans[i];

                const chainLoan = await getLoanForNft({
                    nftContractAddress: loan.nftContractAddress,
                    nftId: loan.nftId,
                    lendingContract,
                });


                if (chainLoan && chainLoan[0] !== '0x0000000000000000000000000000000000000000') {
                    const la: LoanAuction = loanAuction(chainLoan);

                    // Amend loan auction with NFT props that are not included in the LoanAuctionStructOutput struct
                    la.nftId = loan.nftId;
                    la.nftContractAddress = loan.nftContractAddress;

                    chainLoans.push(la);
                }
            }
            setLoans(chainLoans);
        };

        fetchLoans();
    }, [address, lendingContract, cacheCounter]);

    return loans;
};
