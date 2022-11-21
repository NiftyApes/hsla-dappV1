/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Web3Provider } from '@ethersproject/providers';
import { useAppDispatch } from 'app/hooks';
import { LOCAL } from 'constants/contractAddresses';
import { SECONDS_IN_YEAR } from 'constants/misc';
import { increment } from 'counter/counterSlice';
import { ErrorWithReason } from 'errors';
import { ethers } from 'ethers';
import { getEventFromReceipt } from 'helpers/getEventFromReceipt';
import { saveOfferInDb } from 'helpers/saveOfferInDb';
import { saveSignatureOfferInDb } from 'helpers/saveSignatureOfferInDb';
import { logError } from 'logging/logError';
import { useMemo } from 'react';
import { useChainId } from './useChainId';
import { useOffersContract, useSigLendingContract } from './useContracts';
import { useWalletAddress } from './useWalletAddress';
import { useWalletProvider } from './useWalletProvider';

const SIG = true;

const ETH_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

export const useCreateCollectionOffer = ({
  nftContractAddress,
}: {
  nftContractAddress: string;
}) => {
  const offersContract = useOffersContract();

  const address = useWalletAddress();

  const dispatch = useAppDispatch();

  const chainId = useChainId();

  const provider = useWalletProvider();

  const SigLendingContract = useSigLendingContract();

  const web3Provider = useMemo(
    () => (provider ? new Web3Provider(provider) : undefined),
    [provider],
  );

  const signer = useMemo(() => {
    return web3Provider ? web3Provider?.getSigner(address) : undefined;
  }, [web3Provider]);

  return {
    createCollectionOffer: async ({
      amount,
      aprInPercent,
      durationInDays,
      expirationInDays,
      floorTermLimit,
      asset = 'ETH',
      onPending,
      onSuccess,
      onError,
      onTxSubmitted,
      onTxMined,
    }: {
      amount: number;
      aprInPercent: number;
      durationInDays: number;
      expirationInDays: number;
      floorTermLimit: number;
      asset?: string;
      onPending?: any;
      onSuccess?: any;
      onError?: any;
      onTxSubmitted?: any;
      onTxMined?: any;
    }) => {
      onPending && onPending();

      try {
        if (!address) {
          throw new Error('Address is not defined');
        }

        if (!offersContract) {
          throw new Error('Contract is not defined');
        }

        if (!signer) {
          throw new Error('No signer');
        }

        if (!SigLendingContract) {
          throw Error();
        }

        if (SIG) {
          const offerAttempt = {
            creator: address,
            duration: Math.floor(durationInDays * 86400),
            expiration: Math.floor(
              Date.now() / 1000 + expirationInDays * 86400,
            ),
            fixedTerms: false,
            floorTerm: true,
            lenderOffer: true,
            nftContractAddress,
            nftId: 0,

            asset: ETH_ADDRESS,
            amount: ethers.utils.parseUnits(String(amount), 'ether'),

            // TODO make sure this is right
            interestRatePerSecond: Math.round(
              ((aprInPercent / 100) * (amount * 1e18)) / SECONDS_IN_YEAR,
            ),

            // TODO: Allow user to edit this in UI
            floorTermLimit,
          };

          const domain = {
            name: 'NiftyApes_Offers',
            version: '0.0.1',
            chainId: 31337,
            verifyingContract: offersContract.address,
          };

          const types = {
            Offer: [
              { name: 'creator', type: 'address' },
              { name: 'duration', type: 'uint32' },
              { name: 'expiration', type: 'uint32' },
              { name: 'fixedTerms', type: 'bool' },
              { name: 'floorTerm', type: 'bool' },
              { name: 'lenderOffer', type: 'bool' },
              { name: 'nftContractAddress', type: 'address' },
              { name: 'nftId', type: 'uint256' },
              { name: 'asset', type: 'address' },
              { name: 'amount', type: 'uint128' },
              { name: 'interestRatePerSecond', type: 'uint96' },
              { name: 'floorTermLimit', type: 'uint64' },
            ],
          };

          const values = offerAttempt;

          const result = await signer._signTypedData(domain, types, values);

          await saveSignatureOfferInDb({
            chainId,
            nftContractAddress: offerAttempt.nftContractAddress,
            nftId: offerAttempt.nftId,
            creator: offerAttempt.creator,
            offer: {
              ...offerAttempt,
              amount: offerAttempt.amount.toString(),
            },
            offerHash: ethers.utils._TypedDataEncoder.hashStruct(
              'Offer',
              types,
              values,
            ),
            signature: result,
          });

          onSuccess &&
            onSuccess(
              ethers.utils._TypedDataEncoder.hashStruct('Offer', types, values),
            );
        } else {
          const tx = await offersContract.createOffer({
            creator: address,
            nftContractAddress,
            // TODO make sure this is right
            interestRatePerSecond: Math.round(
              ((aprInPercent / 100) * (amount * 1e18)) / SECONDS_IN_YEAR,
            ),
            nftId: 0,
            fixedTerms: false,
            floorTerm: true,
            lenderOffer: true,
            asset: ETH_ADDRESS,
            amount: ethers.utils.parseUnits(String(amount), 'ether'),
            duration: Math.floor(durationInDays * 86400),
            expiration: Math.floor(
              Date.now() / 1000 + expirationInDays * 86400,
            ),
            // TODO: Allow user to edit this in UI
            floorTermLimit,
          });

          onTxSubmitted && onTxSubmitted(tx);

          const receipt: any = await tx.wait();

          if (receipt.status !== 1) {
            throw new ErrorWithReason('reason: revert');
          }

          onTxMined && onTxMined(receipt);

          const newOfferEvent = getEventFromReceipt({
            eventName: 'NewOffer',
            receipt,
            abi: LOCAL.OFFERS.ABI,
          });

          const { offer } = newOfferEvent.args;

          const offerObj = {
            creator: offer.creator,
            nftContractAddress: offer.nftContractAddress,
            interestRatePerSecond: offer.interestRatePerSecond.toString(),
            fixedTerms: offer.fixedTerms,
            floorTerm: offer.floorTerm,
            lenderOffer: offer.lenderOffer,
            nftId: offer.nftId.toNumber(),
            asset: offer.asset,
            amount: offer.amount.toString(),
            duration: offer.duration,
            expiration: offer.expiration,
          };

          await saveOfferInDb({
            chainId,
            offerObj,
            offerHash: newOfferEvent.args.offerHash,
          });

          onSuccess && onSuccess(newOfferEvent.args.offerHash);
        }
      } catch (e: any) {
        logError(e);
        if (onError) {
          onError(e);
        } else {
          alert(e.message);
        }
      }

      dispatch(increment());
    },
  };
};
