import { updateOfferStatus } from 'api/updateOfferStatus';
import { updateSignatureOfferStatus } from 'api/updateSignatureOfferStatus';
import { useAppDispatch } from 'app/hooks';
import { increment } from 'counter/counterSlice';
import { ErrorWithReason } from 'errors';
import { ethers } from 'ethers';
import { logError } from 'logging/logError';
import { useState } from 'react';
import { useChainId } from './useChainId';
import { useOffersContract } from './useContracts';
import { useGetTransactionTimestamp } from './useGetTransactionTimestamp';

export const useCancelOffer = ({
  nftContractAddress,
  nftId,
  offerHash,
  offer,
}: {
  nftContractAddress?: string;
  nftId: string;
  offerHash: string;
  offer: any;
}) => {
  const offersContract = useOffersContract();

  const dispatch = useAppDispatch();

  const { getTransactionTimestamp } = useGetTransactionTimestamp();

  const [cancelStatus, setCancelStatus] = useState<
    'PENDING' | 'SUCCESS' | 'ERROR' | 'READY'
  >('READY');

  const [txObject, setTxObject] = useState<ethers.ContractTransaction | null>(
    null,
  );

  const [txReceipt, setTxReceipt] = useState<ethers.ContractReceipt | null>(
    null,
  );

  const chainId = useChainId();

  if (!offersContract || !chainId) {
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

      if (offer?.signature) {
        try {
          const tx = await offersContract.withdrawOfferSignature(
            offer.offer,
            offer.signature,
          );

          setTxObject(tx);

          const receipt: any = await tx.wait();

          if (receipt.status !== 1) {
            throw new ErrorWithReason('reason: revert');
          }

          const transactionTimestamp = await getTransactionTimestamp(receipt);

          setTxReceipt(receipt);

          setCancelStatus('SUCCESS');

          await updateSignatureOfferStatus({
            chainId,
            nftContractAddress,
            nftId,
            offerExpiration: offer.expiration,
            offerHash: offer.offerHash,
            status: 'USED',
            signature: offer.signature,
            transactionTimestamp,
            transactionHash: receipt.transactionHash,
          });

          setTimeout(() => {
            setCancelStatus('READY');
            setTxObject(null);
            setTxReceipt(null);
          }, 3000);
        } catch (e) {
          logError(e);
          setCancelStatus('ERROR');

          setTimeout(() => {
            setCancelStatus('READY');
            setTxObject(null);
            setTxReceipt(null);
          }, 3000);
        }
      } else {
        try {
          const onChainOffer = await offersContract.getOffer(
            nftContractAddress,
            nftId,
            offerHash,
            true,
          );

          const offerExpiration = onChainOffer.expiration;

          const tx = await offersContract.removeOffer(
            nftContractAddress,
            nftId,
            offerHash,
            true,
          );

          setTxObject(tx);

          const receipt: any = await tx.wait();

          if (receipt.status !== 1) {
            throw new ErrorWithReason('reason: revert');
          }

          const transactionTimestamp = await getTransactionTimestamp(receipt);

          setTxReceipt(receipt);

          setCancelStatus('SUCCESS');

          await updateOfferStatus({
            chainId,
            nftContractAddress,
            nftId,
            offerExpiration,
            offerHash,
            status: 'CANCELED',
            transactionTimestamp,
            transactionHash: receipt.transactionHash,
          });

          setTimeout(() => {
            setCancelStatus('READY');
            setTxObject(null);
            setTxReceipt(null);
          }, 3000);
        } catch (e) {
          logError(e);
          setCancelStatus('ERROR');

          setTimeout(() => {
            setCancelStatus('READY');
            setTxObject(null);
            setTxReceipt(null);
          }, 3000);
        }
      }

      dispatch(increment());
    },
    cancelStatus,
    txObject,
    txReceipt,
  };
};
