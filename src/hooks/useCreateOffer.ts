/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-template */
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
import { useEffect, useMemo, useState } from 'react';
import { useChainId } from './useChainId';
import { useOffersContract, useSigLendingContract } from './useContracts';
import { useWalletAddress } from './useWalletAddress';
import { useWalletProvider } from './useWalletProvider';

const ETH_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

export const useCreateOffer = ({
  nftContractAddress,
}: {
  nftContractAddress: string;
}) => {
  const offersContract = useOffersContract();

  const address = useWalletAddress();

  const dispatch = useAppDispatch();

  const chainId = useChainId();

  // Use on-chain offers for Mainnet, and signature offers everywhere else
  // We'll eventually expand signature offers to Mainnet too
  const [shouldUseSignatureOffer, setShouldUseSignatureOffer] =
    useState<boolean>();

  // We avoid using signature-based offers on Mainnet if the Offers
  // contract has not been upgraded to support them.
  // We determine this by checking if the getOfferHash function of the contract
  // returns the value we expect of the old contract, in which case we know
  // it hasn't been upgraded yet.
  useEffect(() => {
    async function getOfferHashOfNullOffer() {
      // If not on Mainnet, use signature offers everywhere except for Gnosis
      if (chainId && chainId !== '0x1') {
        if (chainId === '0x64') {
          setShouldUseSignatureOffer(false);
        } else {
          setShouldUseSignatureOffer(true);
        }

        return;
      }

      // If on Mainnet, check to see whether the Offers contract has been upgraded
      if (chainId && chainId === '0x1' && offersContract) {
        const hash = await offersContract.getOfferHash({
          creator: '0x0000000000000000000000000000000000000000',
          duration: 0,
          expiration: 0,
          fixedTerms: false,
          floorTerm: false,
          lenderOffer: false,
          nftContractAddress: '0x0000000000000000000000000000000000000000',
          nftId: 0,
          asset: '0x0000000000000000000000000000000000000000',
          amount: 0,
          interestRatePerSecond: 0,
          floorTermLimit: 0,
        });

        const isUsingOldMainnetOffersContract =
          hash ===
          // We're just hardcoding the hash value provided by the old contract here
          '0xbb1f20af3c34f52982b9b19490e3cda5bc38264d457f501710f8d318983c8df5';

        setShouldUseSignatureOffer(!isUsingOldMainnetOffersContract);
      }
    }
    getOfferHashOfNullOffer();
  }, [chainId, offersContract]);

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
    createOffer: async ({
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
      tokenId = 0,
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
          throw new Error('No Offers contract is not defined');
        }

        if (!signer) {
          throw new Error('No signer');
        }

        if (!SigLendingContract) {
          throw Error('No SigLending contract defined');
        }

        if (!chainId) {
          throw Error('No chain id');
        }

        if (shouldUseSignatureOffer) {
          const offerAttempt = {
            creator: address,
            duration: Math.floor(durationInDays * 86400),
            expiration: Math.floor(
              Date.now() / 1000 + expirationInDays * 86400,
            ),
            fixedTerms: false,
            floorTerm: !tokenId,
            lenderOffer: true,
            nftContractAddress,
            nftId: tokenId,

            asset: ETH_ADDRESS,
            amount: ethers.utils.parseUnits(String(amount), 'ether'),

            // TODO make sure this is right
            interestRatePerSecond: Math.round(
              ((aprInPercent / 100) * (amount * 1e18)) / SECONDS_IN_YEAR,
            ),
            floorTermLimit: tokenId ? 0 : floorTermLimit,
          };

          const domain = {
            name: 'NiftyApes_Offers',
            version: '0.0.1',
            chainId,
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

          let result = await signer._signTypedData(domain, types, values);

          // Ledger was ending signatures with '00' or '01' for some reason
          // So below we're replacing those with '1b' and '1c' respectively
          // In order to avoid ECDSA error

          if (result.slice(-2) === '00') {
            result = result.slice(0, -2) + '1b';
          }

          if (result.slice(-2) === '01') {
            result = result.slice(0, -2) + '1c';
          }

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
              true,
            );
        } else {
          const tx = await offersContract.createOffer({
            creator: address,
            nftContractAddress,
            interestRatePerSecond: Math.round(
              ((aprInPercent / 100) * (amount * 1e18)) / SECONDS_IN_YEAR,
            ),
            nftId: tokenId,
            fixedTerms: false,
            floorTerm: !tokenId,
            lenderOffer: true,
            asset: ETH_ADDRESS,
            amount: ethers.utils.parseUnits(String(amount), 'ether'),
            duration: Math.floor(durationInDays * 86400),
            expiration: Math.floor(
              Date.now() / 1000 + expirationInDays * 86400,
            ),
            floorTermLimit: tokenId ? 0 : floorTermLimit,
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
