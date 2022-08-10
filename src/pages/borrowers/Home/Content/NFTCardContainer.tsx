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
  fetchLoanAuctionByNFT,
  fetchLoanOffersByNFT,
  useLoanAuctionByNFT,
  useLoanOffersByNFT,
} from 'loan';
import { NFTLoadingCard } from '../../../../components/molecules/NFTLoadingCard';
import NFTActiveLoanCard from '../../../../components/molecules/NFTActiveLoanCard';
import NFTDefaultedLoanCard from '../../../../components/molecules/NFTDefaultedLoanCard';
import { useLoanAuction } from '../../../../hooks/useLoanAuction';

interface Props {
  contract: Contract;
  item: NFT;
}

export const NFTCardContainer = ({ contract, item }: Props) => {
  const dispatch = useAppDispatch();

  const { content: loanOffers, fetching: fetchingOffers } = useLoanOffersByNFT(item);
  // const { content: loanAuction, fetching: fetchingAuctions } = useLoanAuctionByNFT(item);
  const loanAuction = useLoanAuction({ nftContractAddress: contract.address, nftId: item.id });

  useEffect(() => {
    if (!loanOffers && !fetchingOffers) {
      dispatch(fetchLoanOffersByNFT(item));
    }
  }, [item, fetchingOffers]);

  // useEffect(() => {
  //   if (!loanAuction && !fetchingAuctions) {
  //     //  Getting active loans
  //     dispatch(fetchLoanAuctionByNFT(item));
  //   }
  // }, [item, fetchingAuctions]);

  if (!loanOffers || fetchingOffers) {
    return <NFTLoadingCard />;
  }

  // TODO: Show loan offer with best terms
  const offer = loanOffers[0];

  //TODO: Why are we checking null address?
  if (loanAuction && loanAuction.nftOwner !== '0x0000000000000000000000000000000000000000') {
    //Active loan card
    return (
      <NFTActiveLoanCard
        contract={contract}
        key={item.id}
        collectionName="TEST"
        tokenName={`${item.name}`}
        tokenId={`${item.id}`}
        loan={{
          amountEth: loanAuction?.amount,
          amount: formatEther(loanAuction?.amount),
          amountDrawn: formatEther(loanAuction?.amountDrawn),
          interestRatePerSecond: loanAuction?.interestRatePerSecond,
          lenderInterest: formatEther(loanAuction?.accumulatedLenderInterest),
          loanBeginTimestamp: loanAuction?.loanBeginTimestamp,
          loanEndTimestamp: loanAuction?.loanEndTimestamp,
          protocolInterest: formatEther(loanAuction?.accumulatedProtocolInterest),
        }}
        img={item.image}
      />
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

  const offerAmount = BigNumber.from(String(offer.OfferTerms.Amount));

  // return <NFTDefaultedLoanCard
  //     contract={contract}
  //     key={item.id}
  //     collectionName="TEST"
  //     tokenName={`${item.name}`}
  //     id={`${item.id}`}
  //     offerHash={offer.OfferHash}
  //     offer={{
  //         type: 'top',
  //         price: Number(ethers.utils.formatEther(offerAmount)),
  //         symbol: 'eth',
  //         aprPercentage: offer.aprPercentage,
  //         days: offer.days,
  //     }}
  //     img={item.image}
  // />

  return (
    <NFTCard
      contract={contract}
      id={`${item.id}`}
      offerHash={offer.OfferHash}
      offer={{
        aprPercentage: offer.aprPercentage,
        expirationDays: offer.expirationDays,
        durationDays: offer.durationDays,
        price: Number(ethers.utils.formatEther(offerAmount)),
        totalInterest: offer.totalInterest,
        symbol: 'eth',
        type: 'top',
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
