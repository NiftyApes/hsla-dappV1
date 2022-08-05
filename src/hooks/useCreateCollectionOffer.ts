import { useAppDispatch } from 'app/hooks';
import { increment } from 'counter/counterSlice';
import { ethers } from 'ethers';
import { useWalletAddress } from './useWalletAddress';
import { saveOfferInDb } from '../helpers/saveOfferInDb';
import { useWalletProvider } from './useWalletProvider';
import { getOffersContract } from '../helpers/getContracts';

const ETH_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

export const useCreateCollectionOffer = ({
  nftContractAddress,
}: {
  nftContractAddress: string;
}) => {
  const provider = useWalletProvider();
  const niftyApesContract = provider ? getOffersContract({ provider }) : null;

  const address = useWalletAddress();

  const dispatch = useAppDispatch();

  return {
    createCollectionOffer: async ({
      amount,
      aprInPercent,
      durationInDays,
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

        if (!niftyApesContract) {
          throw new Error('Contract is not defined');
        }

        const tx = await niftyApesContract.createOffer({
          creator: address,
          nftContractAddress,
          // TODO make sure this is right
          interestRatePerSecond: Math.round(
            ((aprInPercent / 100) * (amount * 1e18)) / (365 * 24 * 60 * 60),
          ),
          nftId: 0,
          fixedTerms: true,
          floorTerm: true,
          lenderOffer: true,
          asset: ETH_ADDRESS,
          amount: ethers.utils.parseUnits(String(amount), 'ether'),
          duration: Math.floor(durationInDays * 60 * 60 * 24), // 1 day
          expiration: Math.floor(Date.now() / 1000 + 60 * 60 * 24 * 30), // 5 days from now
        });

        onTxSubmitted && onTxSubmitted(tx);

        const receipt: any = await tx.wait();

        onTxMined && onTxMined(receipt);

        const offer = receipt.events[1].args[3];

        const offerObj = {
          creator: offer.creator,
          nftContractAddress: offer.nftContractAddress,
          interestRatePerSecond: offer.interestRatePerSecond.toNumber(),
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
          offerObj,
          offerHash: receipt.events[1].args.offerHash,
        });

        onSuccess && onSuccess();
      } catch (e: any) {
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
