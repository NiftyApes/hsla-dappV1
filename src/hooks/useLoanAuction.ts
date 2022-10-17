import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { useEffect, useState } from 'react';
import { useLendingContract } from './useContracts';

export const useLoanAuction = ({
  nftContractAddress,
  nftId,
}: {
  nftContractAddress?: string;
  nftId: string;
}) => {
  const niftyApesContract = useLendingContract();

  const cacheCounter = useAppSelector((state: RootState) => state.counter);

  const [loanAuction, setLoanAuction] = useState<any>();

  useEffect(() => {
    async function getLoanOffer() {
      if (!niftyApesContract || !nftContractAddress) {
        return;
      }

      const result: any = await niftyApesContract.getLoanAuction(
        nftContractAddress,
        nftId,
      );
      setLoanAuction({
        nftContractAddress,
        nftId,
        ...result,
      });
    }

    if (niftyApesContract && nftContractAddress) {
      getLoanOffer();
    }
  }, [niftyApesContract, nftContractAddress, nftId, cacheCounter]);

  return loanAuction;
};
