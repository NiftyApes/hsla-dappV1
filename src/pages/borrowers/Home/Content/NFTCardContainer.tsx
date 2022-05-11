import NFTCard from 'components/molecules/NFTCard';
import { Contract, ethers } from 'ethers';
import NFTNoOfferCard from 'components/molecules/NFTNoOfferCard';
import { useLoanAuction } from 'hooks/useLoanAuction';
import { useLoanOffersForNFT } from 'hooks/useLoanOffersForNFT';

export const NFTCardContainer = ({ contract, item }: { contract?: Contract; item?: any }) => {
  const loanOffers = useLoanOffersForNFT({
    nftContractAddress: contract?.address,
    nftId: item.id,
  });

  const loanAuctions = useLoanAuction({ nftContractAddress: contract?.address, nftId: item.id });

  console.log('loanAuctions', loanAuctions);

  if (!contract || !item || !loanOffers) {
    return null;
  }

  if (!loanOffers) {
    return <div>Loading...</div>;
  }

  if (loanOffers?.length === 0) {
    return (
      <NFTNoOfferCard
        contract={contract}
        key={item.id.toNumber()}
        collectionName=""
        tokenName={`${item.name}`}
        id={`${item.id.toNumber()}`}
        img={item.image}
      />
    );
  }

  console.log('loanOffers', loanOffers);

  const loanOffer = loanOffers[0].offer;
  const offerHash = loanOffers[0].offerHash;

  return (
    <NFTCard
      contract={contract}
      id={`${item.id.toNumber()}`}
      offerHash={offerHash}
      offer={{
        type: 'top',
        price: Number(ethers.utils.formatEther(loanOffer.amount)),
        symbol: 'eth',
        aprPercentage: Number((loanOffer.interestRatePerSecond * 365 * 24 * 60 * 60).toFixed(2)),
        days: Number(((loanOffer.expiration - Date.now() / 1000) / (24 * 60 * 60)).toFixed(2)),
      }}
      numberOfOffers={loanOffers.length}
      key={item.id.toNumber()}
      collectionName=""
      tokenName={`${item.name}`}
      img={item.image}
    />
  );
};
