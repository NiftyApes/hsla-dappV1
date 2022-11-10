/* eslint-disable @typescript-eslint/no-shadow */
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { transactionTypes } from 'constants/transactionTypes';
import { increment } from 'counter/counterSlice';
import { ErrorWithReason } from 'errors';
import { ethers } from 'ethers';
import { getEventFromReceipt } from 'helpers/getEventFromReceipt';
import { saveLoanInDb } from 'helpers/saveLoanInDb';
import { saveTransactionInDb } from 'helpers/saveTransactionInDb';
import { fetchLoanAuctionByNFT } from 'loan';
import { NFT } from 'nft';
import NiftyApesLendingDeploymentJSON from '../generated/deployments/localhost/NiftyApesLending.json';
import { useChainId } from './useChainId';
import {
  useLendingContract,
  useOffersContract,
  useSigLendingContract,
} from './useContracts';
import { useGetTransactionTimestamp } from './useGetTransactionTimestamp';
import { useWalletAddress } from './useWalletAddress';

export const useExecuteLoanByBorrower = ({
  nftContractAddress,
  nftId,
  offerHash,
  floorTerm = false,
  signature,
  offerAttempt,
}: {
  nftContractAddress?: string;
  nftId: string;
  offerHash: string;
  floorTerm?: boolean;
  signature?: string;
  offerAttempt?: any;
}) => {
  const address = useWalletAddress();

  const lendingContract = useLendingContract();

  const offersContract = useOffersContract();

  const dispatch = useAppDispatch();

  const { getTransactionTimestamp } = useGetTransactionTimestamp();

  const chainId = useChainId();

  const walletAddress = useWalletAddress();

  const SigLendingContract = useSigLendingContract();

  const nft = useAppSelector(
    (state: RootState) =>
      walletAddress &&
      state.nfts.nftsByWalletAddress[walletAddress].content?.find(
        (nft: NFT) =>
          nft.id === nftId && nft.contractAddress === nftContractAddress,
      ),
  );

  if (!lendingContract || !offersContract) {
    return {
      executeLoanByBorrower: undefined,
    };
  }

  return {
    executeLoanByBorrower: async () => {
      if (!address) {
        throw new Error('No address to send txn from');
      }

      if (!nftContractAddress) {
        throw new Error('NFT Contract Address not specified');
      }

      if (!nft) {
        throw new Error('NFT information not in Redux store');
      }

      if (signature) {
        if (!SigLendingContract) {
          throw new Error('No SigLendingContract');
        }

        const tx = await SigLendingContract.executeLoanByBorrowerSignature(
          offerAttempt,
          signature,
          nftId,
        );

        console.log('tx', tx);

        const receipt: any = await tx.wait();

        console.log('receipt', receipt);

        if (receipt.status !== 1) {
          throw new ErrorWithReason('reason: revert');
        }

        console.log(nftContractAddress, nftId, offerHash, true);

        const loanExecutedEvent = getEventFromReceipt({
          eventName: 'LoanExecuted',
          receipt,
          abi: NiftyApesLendingDeploymentJSON.abi,
        });

        console.log('loanExecutedEvent', loanExecutedEvent);

        const loan = loanExecutedEvent.args.loanAuction;

        console.log('loan', loan);

        dispatch(fetchLoanAuctionByNFT(nft));

        console.log('what we save in the loan db', {
          chainId,
          nftContractAddress: ethers.utils.getAddress(nftContractAddress),
          nftId,
          creator: offerAttempt.creator,
          borrower: address,
          lender: offerAttempt.creator,
          transactionHash: receipt.transactionHash,
          loanTerms: {
            amount: offerAttempt.amount.toString(),
            asset: 'ETH',
            interestRatePerSecond:
              offerAttempt.interestRatePerSecond.toString(),
            duration: offerAttempt.duration,
            loanBeginTimestamp: loan.loanBeginTimestamp,
            loanEndTimestamp: loan.loanEndTimestamp,
          },
        });

        await saveLoanInDb({
          chainId,
          nftContractAddress: ethers.utils.getAddress(nftContractAddress),
          nftId,
          creator: offerAttempt.creator,
          borrower: address,
          lender: offerAttempt.creator,
          transactionHash: receipt.transactionHash,
          loanTerms: {
            amount: offerAttempt.amount.toString(),
            asset: 'ETH',
            interestRatePerSecond:
              offerAttempt.interestRatePerSecond.toString(),
            duration: offerAttempt.duration,
            loanBeginTimestamp: loan.loanBeginTimestamp,
            loanEndTimestamp: loan.loanEndTimestamp,
          },
        });

        const timestamp = await getTransactionTimestamp(receipt);

        console.log('what we save in the txn db', {
          chainId,
          transactionHash: receipt.transactionHash,
          from: receipt.from,
          transactionType: transactionTypes.LOAN_CREATED,
          timestamp,
          borrower: address,
          lender: offerAttempt.creator,
          data: {
            lender: offerAttempt.creator,
            nftContractAddress: offerAttempt.nftContractAddress,
            nftId,
            amount: offerAttempt.amount.toString(),
            asset: 'ETH',
            interestRatePerSecond:
              offerAttempt.interestRatePerSecond.toString(),
            duration: offerAttempt.duration,
          },
        });

        await saveTransactionInDb({
          chainId,
          transactionHash: receipt.transactionHash,
          from: receipt.from,
          transactionType: transactionTypes.LOAN_CREATED,
          timestamp,
          borrower: address,
          lender: offerAttempt.creator,
          data: {
            lender: offerAttempt.creator,
            nftContractAddress: offerAttempt.nftContractAddress,
            nftId,
            amount: offerAttempt.amount.toString(),
            asset: 'ETH',
            interestRatePerSecond:
              offerAttempt.interestRatePerSecond.toString(),
            duration: offerAttempt.duration,
          },
        });

        dispatch(increment());

        return { receipt };
      }

      const tx = await lendingContract.executeLoanByBorrower(
        nftContractAddress,
        nftId,
        offerHash,
        floorTerm,
      );

      const receipt: any = await tx.wait();

      if (receipt.status !== 1) {
        throw new ErrorWithReason('reason: revert');
      }

      const offer = await offersContract.getOffer(
        nftContractAddress,
        nftId,
        offerHash,
        true,
      );

      const loanExecutedEvent = getEventFromReceipt({
        eventName: 'LoanExecuted',
        receipt,
        abi: NiftyApesLendingDeploymentJSON.abi,
      });

      const loan = loanExecutedEvent.args.loanAuction;

      dispatch(fetchLoanAuctionByNFT(nft));

      await saveLoanInDb({
        chainId,
        nftContractAddress: ethers.utils.getAddress(nftContractAddress),
        nftId,
        creator: offer.creator,
        borrower: address,
        lender: offer.creator,
        transactionHash: receipt.transactionHash,
        loanTerms: {
          amount: offer.amount.toString(),
          asset: 'ETH',
          interestRatePerSecond: offer.interestRatePerSecond.toString(),
          duration: offer.duration,
          loanBeginTimestamp: loan.loanBeginTimestamp,
          loanEndTimestamp: loan.loanEndTimestamp,
        },
      });

      const timestamp = await getTransactionTimestamp(receipt);

      await saveTransactionInDb({
        chainId,
        transactionHash: receipt.transactionHash,
        from: receipt.from,
        transactionType: transactionTypes.LOAN_CREATED,
        timestamp,
        borrower: address,
        lender: offer.creator,
        data: {
          lender: offer.creator,
          nftContractAddress: offer.nftContractAddress,
          nftId,
          amount: offer.amount.toString(),
          asset: 'ETH',
          interestRatePerSecond: offer.interestRatePerSecond.toString(),
          duration: offer.duration,
        },
      });

      dispatch(increment());

      return { receipt };
    },
  };
};
