import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';

export const useLoanOffersForNFT = ({
  nftContractAddress,
  nftId,
}: {
  nftContractAddress?: string;
  nftId: number;
}) => {
  const [offers, setOffers] = useState<any>();
  useEffect(() => {
    async function fetchLoanOffersForNFT() {
      const result = await fetch(
        `https://qqxeqsrt39.execute-api.us-west-2.amazonaws.com/api/offer?status=ACTIVE&nftId=${nftId}&nftContractAddress=${nftContractAddress}`,
      );

      const json = await result.json();

      setOffers(json);
    }

    fetchLoanOffersForNFT();
  }, [nftId, nftContractAddress]);

  if (!offers) {
    return undefined;
  }

  console.log('offers.Items', offers.Items);

  return offers.Items.map((item: any) => {
    return {
      offer: {
        amount: BigNumber.from(String(item.D.terms.amount)),
        expiration: Number(item.D.terms.expiration),
        interestRatePerSecond: item.D.terms.interestRatePerSecond,
      },
      offerHash: item.G4,
    };
  });
};
