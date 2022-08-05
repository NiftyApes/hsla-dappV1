/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useAppDispatch } from 'app/hooks';
import { BigNumber, ethers } from 'ethers';
import { Button, Center, Flex } from '@chakra-ui/react';
import { formatEther } from '@ethersproject/units';

import NFTCard from 'components/molecules/NFTCard';
import { Contract, NFT } from 'nft/model';
import NFTNoOfferCard from 'components/molecules/NFTNoOfferCard';
import { useRepayLoanByBorrower } from 'hooks/useRepayLoan';
import {
  fetchLoanAuctionByNFT,
  fetchLoanOffersByNFT,
  useLoanAuctionByNFT,
  useLoanOffersByNFT,
} from 'loan';
import { NFTLoadingCard } from '../../../../components/molecules/NFTLoadingCard';

interface Props {
  contract: Contract;
  item: NFT;
}

export const NFTCardContainer = ({ contract, item }: Props) => {
  const dispatch = useAppDispatch();

  const { content: loanOffers, fetching: fetchingOffers } = useLoanOffersByNFT(item);
  const { content: loanAuction, fetching: fetchingAuctions } = useLoanAuctionByNFT(item);

  const { repayLoanByBorrower } = useRepayLoanByBorrower({
    nftContractAddress: contract.address,
    nftId: item.id,
  });

  useEffect(() => {
    if (!loanOffers && !fetchingOffers) {
      dispatch(fetchLoanOffersByNFT(item));
    }
  }, [item, fetchingOffers]);

  useEffect(() => {
    if (!loanAuction && !fetchingAuctions) {
      //  Getting active loans
      dispatch(fetchLoanAuctionByNFT(item));
    }
  }, [item, fetchingAuctions]);

  if (!loanOffers || fetchingOffers || !loanAuction || fetchingAuctions) {
    return <NFTLoadingCard />;
  }

  //TODO: Why are we checking null address?
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
        tokenId={item.id}
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
