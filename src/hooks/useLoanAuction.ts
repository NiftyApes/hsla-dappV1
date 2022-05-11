import { useEffect, useState } from 'react';
import { useNiftyApesContract } from './useNiftyApesContract';

export const useLoanAuction = ({
  nftContractAddress,
  nftId,
}: {
  nftContractAddress?: string;
  nftId: number;
}) => {
  const niftyApesContract = useNiftyApesContract();

  const [loanAuction, setLoanAuction] = useState<any>();

  useEffect(() => {
    if (niftyApesContract && nftContractAddress) {
      getLoanOffer();
    }

    async function getLoanOffer() {
      if (!niftyApesContract || loanAuction) {
        return;
      }

      const result = await niftyApesContract.getLoanAuction(nftContractAddress, nftId);
      setLoanAuction(result);
    }
  }, [niftyApesContract, nftContractAddress]);

  return loanAuction;
};
