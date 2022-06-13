/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useAppDispatch } from 'app/hooks';
import { BigNumber, ethers } from 'ethers';
import { Button } from '@chakra-ui/react';
import { formatEther } from '@ethersproject/units';

import NFTCard from 'components/molecules/NFTCard';
import { Contract, NFT } from 'nft/model';
import NFTNoOfferCard from 'components/molecules/NFTNoOfferCard';
import { useRepayLoanByBorrower } from 'hooks/useRepayLoan';
import {
  fetchLoanOffersByNFT,
  fetchLoanAuctionByNFT,
  useLoanOffersByNFT,
  useLoanAuctionByNFT,
} from 'loan';

export const NFTCardContainer = ({ contract, item }: { contract: Contract; item: NFT }) => {
  const dispatch = useAppDispatch();

  const { content: loanOffers, fetching: loanOffersFetching } = useLoanOffersByNFT(item);

  useEffect(() => {
    if (!loanOffers && !loanOffersFetching) {
      dispatch(fetchLoanOffersByNFT(item));
    }
  }, [item, loanOffersFetching]);

  const { content: loanAuction, fetching: loanAuctionFetching } = useLoanAuctionByNFT(item);

  useEffect(() => {
    if (!loanOffers && !loanOffersFetching) {
      dispatch(fetchLoanAuctionByNFT(item));
    }
  }, [item, loanAuctionFetching]);

  const { repayLoanByBorrower } = useRepayLoanByBorrower({
    nftContractAddress: contract.address,
    nftId: item.id,
  });

  if (!loanOffers || loanOffersFetching) {
    return <div>Loading...</div>;
  }

  if (loanAuction && loanAuction.nftOwner !== '0x0000000000000000000000000000000000000000') {
    return (
      <div>
        <strong>
          {item.name} #{item.id}
        </strong>
        <div>Amount: {formatEther(loanAuction?.amount)} ETH</div>
        <div>Amount Drawn: {formatEther(loanAuction?.amountDrawn)} ETH</div>
        <div>Lender Interest: {formatEther(loanAuction?.accumulatedLenderInterest)} ETH</div>
        <div>Protocol Interest: {formatEther(loanAuction?.accumulatedProtocolInterest)} ETH</div>
        <Button onClick={() => repayLoanByBorrower && repayLoanByBorrower()}>Repay</Button>
      </div>
    );
  }

  if (loanOffers.length === 0) {
    return (
      <NFTNoOfferCard
        contract={contract}
        key={item.id}
        collectionName=""
        tokenName={`${item.name}`}
        id={item.id}
        img={item.image}
      />
    );
  }

  // TODO: Show loan offer with best terms
  const offer = loanOffers[0];
  const offerAmount = BigNumber.from(String(offer.OfferTerms.Amount));

  return (
    <NFTCard
      contract={contract}
      id={`${item.id}`}
      offerHash={offer.OfferHash}
      offer={{
        type: 'top',
        price: Number(ethers.utils.formatEther(offerAmount)),
        symbol: 'eth',
        aprPercentage: offer.aprPercentage,
        days: offer.days,
      }}
      floorTerm={offer.OfferTerms.FloorTerm}
      numberOfOffers={loanOffers.length}
      key={item.id}
      collectionName=""
      tokenName={`${item.name}`}
      img={item.image}
    />
  );
};
