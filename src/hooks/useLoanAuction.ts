import { useEffect } from 'react';
import { useNiftyApesContract } from './useNiftyApesContract';

export const useLoanAuction = ({
  nftContractAddress,
  nftId,
}: {
  nftContractAddress?: string;
  nftId: number;
}) => {
  const niftyApesContract = useNiftyApesContract();

  useEffect(() => {
    if (niftyApesContract && nftContractAddress) {
      getLoanOffer();
    }

    async function getLoanOffer() {
      if (!niftyApesContract) {
        return;
      }

      const result = await niftyApesContract.getLoanAuction(nftContractAddress, nftId);
      console.log('Loan auction: ', nftContractAddress, nftId, result);
    }
  }, [niftyApesContract, nftContractAddress]);

  return {};
};
