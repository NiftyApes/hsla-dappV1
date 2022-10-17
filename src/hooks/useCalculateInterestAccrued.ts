import { useState, useEffect } from 'react';
import { useLendingContract } from './useContracts';

export const useCalculateInterestAccrued = ({
  nftContractAddress,
  nftId,
}: {
  nftContractAddress?: string;
  nftId?: string;
}) => {
  const niftyApesContract = useLendingContract();

  const [accruedInterest, setAccruedInterest] = useState<any>();

  useEffect(() => {
    async function getAccruedInterest() {
      if (!niftyApesContract || !nftContractAddress || !nftId) {
        return;
      }

      const result = await niftyApesContract.calculateInterestAccrued(
        nftContractAddress,
        nftId,
      );
      setAccruedInterest(result);
    }

    getAccruedInterest();
  }, [nftContractAddress, nftId]);

  return accruedInterest;
};
