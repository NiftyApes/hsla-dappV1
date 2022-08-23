/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useAppDispatch } from 'app/hooks';
import { BigNumber, ethers } from 'ethers';
import { formatEther } from '@ethersproject/units';

import NFTCard from 'components/molecules/NFTCard';
import { Contract, NFT } from 'nft/model';
import NFTNoOfferCard from 'components/molecules/NFTNoOfferCard';
import { fetchLoanOffersByNFT, LoanOffer, useLoanOffersByNFT } from 'loan';
import { NFTLoadingCard } from '../../../../components/molecules/NFTLoadingCard';
import NFTActiveLoanCard from '../../../../components/molecules/NFTActiveLoanCard';
import { useLoanAuction } from '../../../../hooks/useLoanAuction';

interface Props {
  contract: Contract;
  item: NFT;
}

export const NFTCardContainer = ({ contract, item }: Props) => {
  const dispatch = useAppDispatch();

  const { content: loanOffers, fetching: fetchingOffers } = useLoanOffersByNFT(item);
  const loanAuction = useLoanAuction({ nftContractAddress: contract.address, nftId: item.id });

  useEffect(() => {
    if (!loanOffers && !fetchingOffers) {
      dispatch(fetchLoanOffersByNFT(item));
    }
  }, [item, fetchingOffers]);

  if (!loanOffers || fetchingOffers) {
    return <NFTLoadingCard />;
  }

  if (loanAuction && loanAuction.nftOwner !== '0x0000000000000000000000000000000000000000') {
    //Active loan card
    return (
      <NFTActiveLoanCard
        contract={contract}
        key={item.id}
        collectionName=""
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

  return <NFTCard contract={contract} key={item.id} nft={item} offers={loanOffers} />;
};
