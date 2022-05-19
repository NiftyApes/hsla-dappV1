import NFTCard from 'components/molecules/NFTCard';
import { Contract, ethers } from 'ethers';
import NFTNoOfferCard from 'components/molecules/NFTNoOfferCard';

import { useLoanAuction } from 'hooks/useLoanAuction';
import { useLoanOffersForNFT } from 'hooks/useLoanOffersForNFT';
import { formatEther } from '@ethersproject/units';
import { useRepayLoanByBorrower } from 'hooks/useRepayLoan';
import { Button } from '@chakra-ui/react';

export const NFTCardContainer = ({ contract, item }: { contract?: Contract; item?: any }) => {
  const loanOffers = useLoanOffersForNFT({
    nftContractAddress: contract?.address,
    nftId: item.id,
  });

  const loanAuction = useLoanAuction({
    nftContractAddress: contract?.address,
    nftId: item.id,
  });

  const { repayLoanByBorrower } = useRepayLoanByBorrower({
    nftContractAddress: contract?.address,
    nftId: item.id,
  });

  if (!contract || !item || !loanOffers) {
    return null;
  }

  if (!loanOffers) {
    return <div>Loading...</div>;
  }

  if (loanAuction && loanAuction[0] !== '0x0000000000000000000000000000000000000000') {
    return (
      <div>
        <strong>
          {item.name} #{item.id.toNumber()}
        </strong>
        <div>Amount: {formatEther(loanAuction?.amount)} ETH</div>
        <div>Amount Drawn: {formatEther(loanAuction?.amountDrawn)} ETH</div>
        <div>Lender Interest: {formatEther(loanAuction?.accumulatedLenderInterest)} ETH</div>
        <div>Protocol Interest: {formatEther(loanAuction?.accumulatedProtocolInterest)} ETH</div>
        <Button onClick={() => repayLoanByBorrower && repayLoanByBorrower()}>Repay</Button>
      </div>
    );
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

  // TODO: Show loan offer with best terms
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
        // TODO: double check
        aprPercentage: Number(
          Number(
            ((loanOffer.interestRatePerSecond * (365 * 24 * 60 * 60)) / loanOffer.amount) * 100,
          ).toFixed(2),
        ),
        days: Number(((loanOffer.expiration - Date.now() / 1000) / (24 * 60 * 60)).toFixed(2)),
      }}
      floorTerm={loanOffer.floorTerm}
      numberOfOffers={loanOffers.length}
      key={item.id.toNumber()}
      collectionName=""
      tokenName={`${item.name}`}
      img={item.image}
    />
  );
};
