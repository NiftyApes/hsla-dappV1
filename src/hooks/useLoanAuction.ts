import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { useEffect, useState } from 'react';
import { useNiftyApesContract } from './useNiftyApesContract';

export const useLoanAuction = ({
  nftContractAddress,
  nftId,
}: {
  nftContractAddress?: string;
  nftId: string;
}) => {
  const niftyApesContract = useNiftyApesContract();

  const cacheCounter = useAppSelector((state: RootState) => state.counter);

  const [loanAuction, setLoanAuction] = useState<any>();

  useEffect(() => {
    if (niftyApesContract && nftContractAddress) {
      getLoanOffer();
    }

    async function getLoanOffer() {
      if (!niftyApesContract || !nftContractAddress) {
        return;
      }

      const result = await niftyApesContract.getLoanAuction(nftContractAddress, nftId);
      setLoanAuction(result);
    }
  }, [niftyApesContract, nftContractAddress, nftId, cacheCounter]);

  return loanAuction;
};
