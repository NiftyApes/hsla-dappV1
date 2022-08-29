/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useAppDispatch } from 'app/hooks';

import { NFTLoadingCard } from '../../../../components/molecules/NFTLoadingCard';
import { Contract, NFT } from 'nft';
import NFTCard from 'components/molecules/NFTCard';
import NFTNoOfferCard from 'components/molecules/NFTNoOfferCard';
import { fetchLoanOffersByNFT, useLoanOffersByNFT } from 'loan';
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

  //Active loan card
  if (loanAuction && loanAuction.nftOwner !== '0x0000000000000000000000000000000000000000') {
    return <NFTActiveLoanCard key={item.id} nft={item} loan={loanAuction} />;
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
