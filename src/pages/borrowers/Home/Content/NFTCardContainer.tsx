import NFTCard from 'components/molecules/NFTCard';
import NFTNoOfferCard from 'components/molecules/NFTNoOfferCard';
import { useLoanOffersByNFT } from 'loan';
import { NFT } from 'nft';
import NFTActiveLoanCard from '../../../../components/molecules/NFTActiveLoanCard';

import { NFTLoadingCard } from '../../../../components/molecules/NFTLoadingCard';
import { useLoanAuction } from '../../../../hooks/useLoanAuction';

interface Props {
  item: NFT;
}

export const NFTCardContainer = ({ item }: Props) => {
  const { content: loanOffers, fetching: fetchingOffers } =
    useLoanOffersByNFT(item);

  const loanAuction = useLoanAuction({
    nftContractAddress: item.contractAddress,
    nftId: item.id,
  });

  if (!loanOffers || fetchingOffers) {
    return <NFTLoadingCard />;
  }

  // Active loan card
  if (
    loanAuction &&
    loanAuction.nftOwner !== '0x0000000000000000000000000000000000000000'
  ) {
    return (
      <NFTActiveLoanCard
        offers={loanOffers}
        key={item.id}
        nft={item}
        loan={loanAuction}
      />
    );
  }

  if (loanOffers.length === 0) {
    return (
      <NFTNoOfferCard
        attributes={item.attributes}
        collectionName={item.collectionName || ''}
        contractAddress={item.contractAddress}
        img={item.image}
        key={item.id}
        tokenId={item.id}
        tokenName={`${item.name}`}
      />
    );
  }

  return <NFTCard key={item.id} nft={item} offers={loanOffers} />;
};
