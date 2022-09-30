/* eslint-disable react-hooks/exhaustive-deps */

import NFTCard from 'components/molecules/NFTCard';
import NFTNoOfferCard from 'components/molecules/NFTNoOfferCard';
import NFTActiveLoanCard from '../../../../components/molecules/NFTActiveLoanCard';

import { useLoanOffersByNFT } from 'loan';
import { NFTLoadingCard } from '../../../../components/molecules/NFTLoadingCard';
import { useLoanAuction } from '../../../../hooks/useLoanAuction';

import { NFT } from 'nft';

interface Props {
  item: NFT;
}

export const NFTCardContainer = ({ item }: Props) => {
  const { content: loanOffers, fetching: fetchingOffers } = useLoanOffersByNFT(item);

  const loanAuction = useLoanAuction({ nftContractAddress: item.contractAddress, nftId: item.id });

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
        key={item.id}
        collectionName={item.collectionName || ''}
        tokenName={`${item.name}`}
        tokenId={item.id}
        img={item.image}
      />
    );
  }

  return <NFTCard key={item.id} nft={item} offers={loanOffers} />;
};
