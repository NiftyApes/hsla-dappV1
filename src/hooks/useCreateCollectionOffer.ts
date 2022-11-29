/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAppDispatch } from 'app/hooks';
import { SECONDS_IN_YEAR } from 'constants/misc';
import { increment } from 'counter/counterSlice';
import { ErrorWithReason } from 'errors';
import { ethers } from 'ethers';
import { getEventFromReceipt } from 'helpers/getEventFromReceipt';
import { logError } from 'logging/logError';
import NiftyApesOffersDeploymentJSON from '../generated/deployments/localhost/NiftyApesOffers.json';
import { saveOfferInDb } from '../helpers/saveOfferInDb';
import { useChainId } from './useChainId';
import { useOffersContract } from './useContracts';
import { useWalletAddress } from './useWalletAddress';

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
      tokenId,
    }: {
      amount: number;
      aprInPercent: number;
      durationInDays: number;
      expirationInDays: number;
      floorTermLimit: number;
      tokenId?: number;
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

        const tx = await offersContract.createOffer({
          tokenId,
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
          expiration: Math.floor(Date.now() / 1000 + expirationInDays * 86400),
          // TODO: Allow user to edit this in UI
          floorTermLimit,
        });

        onTxSubmitted && onTxSubmitted(tx);

        const receipt: any = await tx.wait();

        if (receipt.status !== 1) {
          throw new ErrorWithReason('reason: revert');
        }

        console.log('receipt', receipt);

        onTxMined && onTxMined(receipt);

        const newOfferEvent = getEventFromReceipt({
          eventName: 'NewOffer',
          receipt,
          abi: NiftyApesOffersDeploymentJSON.abi,
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
