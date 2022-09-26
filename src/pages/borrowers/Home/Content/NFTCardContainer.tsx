/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch } from 'app/hooks';

import NFTCard from 'components/molecules/NFTCard';
import NFTNoOfferCard from 'components/molecules/NFTNoOfferCard';
import NFTActiveLoanCard from '../../../../components/molecules/NFTActiveLoanCard';

import { useLoanOffersByNFT } from 'loan';
import { NFTLoadingCard } from '../../../../components/molecules/NFTLoadingCard';
import { useLoanAuction } from '../../../../hooks/useLoanAuction';

import { Contract, NFT } from 'nft';

interface Props {
  contract: Contract;
  item: NFT;
}

export const NFTCardContainer = ({ contract, item }: Props) => {
  const dispatch = useAppDispatch();

  const { content: loanOffers, fetching: fetchingOffers } = useLoanOffersByNFT(item);
  const loanAuction = useLoanAuction({ nftContractAddress: contract.address, nftId: item.id });

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
        collectionName={item.collectionName || ''}
        tokenName={`${item.name}`}
        tokenId={item.id}
        img={item.image}
      />
    );
  }

  return <NFTCard contract={contract} key={item.id} nft={item} offers={loanOffers} />;
};
