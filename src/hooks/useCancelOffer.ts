import { useToast } from '@chakra-ui/toast';
import { useAppDispatch } from 'app/hooks';
import { increment } from 'counter/counterSlice';
import { ethers } from 'ethers';
import { useState } from 'react';
import { useOffersContract } from './useContracts';

export const useCancelOffer = ({
  nftContractAddress,
  nftId,
  offerHash,
}: {
  nftContractAddress?: string;
  nftId: string;
  offerHash: string;
}) => {
  const niftyApesContract = useOffersContract();

  const dispatch = useAppDispatch();

  const [cancelStatus, setCancelStatus] = useState<'PENDING' | 'SUCCESS' | 'ERROR' | 'READY'>(
    'READY',
  );

  const [txObject, setTxObject] = useState<ethers.ContractTransaction | null>(null);

  const [txReceipt, setTxReceipt] = useState<ethers.ContractReceipt | null>(null);

  const toast = useToast();

  if (!niftyApesContract) {
    return {
      seizeAsset: undefined,
    };
  }

  return {
    cancelOffer: async () => {
      if (!nftContractAddress) {
        throw new Error('NFT Contract Address not specified');
      }

      setCancelStatus('PENDING');

      try {
        const tx = await niftyApesContract.removeOffer(nftContractAddress, nftId, offerHash, true);

        setTxObject(tx);

        const receipt: any = await tx.wait();

        setTxReceipt(receipt);

        setCancelStatus('SUCCESS');

        toast({
          title: 'Offer canceled successfully',
          status: 'success',
          position: 'top-right',
          isClosable: true,
        });

        setTimeout(() => {
          setCancelStatus('READY');
          setTxObject(null);
          setTxReceipt(null);
        }, 3000);
      } catch (e) {
        setCancelStatus('ERROR');

        setTimeout(() => {
          setCancelStatus('READY');
          setTxObject(null);
          setTxReceipt(null);
        }, 3000);

        console.error(e);
      }

      dispatch(increment());
    },
    cancelStatus,
    txObject,
    txReceipt,
  };
};
