/* eslint-disable @typescript-eslint/no-shadow */
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { transactionTypes } from 'constants/transactionTypes';
import { increment } from 'counter/counterSlice';
import { ethers } from 'ethers';
import { saveLoanInDb } from 'helpers/saveLoanInDb';
import { saveTransactionInDb } from 'helpers/saveTransactionInDb';
import { fetchLoanAuctionByNFT } from 'loan';
import { NFT } from 'nft';
import { useChainId } from './useChainId';
import { useLendingContract, useOffersContract } from './useContracts';
import { useGetTransactionTimestamp } from './useGetTransactionTimestamp';
import { useWalletAddress } from './useWalletAddress';

export const useExecuteLoanByBorrower = ({
  nftContractAddress,
  nftId,
  offerHash,
  floorTerm = false,
}: {
  nftContractAddress?: string;
  nftId: string;
  offerHash: string;
  floorTerm?: boolean;
}) => {
  const address = useWalletAddress();

  const lendingContract = useLendingContract();

  const offersContract = useOffersContract();

  const dispatch = useAppDispatch();

  const { getTransactionTimestamp } = useGetTransactionTimestamp();

  const chainId = useChainId();

  const walletAddress = useWalletAddress();

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

      const tx = await lendingContract.executeLoanByBorrower(
        nftContractAddress,
        nftId,
        offerHash,
        floorTerm,
      );

      const receipt: any = await tx.wait();

      const offer = await offersContract.getOffer(
        nftContractAddress,
        nftId,
        offerHash,
        true,
      );

      const loan =
        chainId === '0x7a69'
          ? receipt.events[6].args[2]
          : chainId === '0x5'
          ? receipt.events[5].args.loanAuction
          : null;

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
    },
  };
};
