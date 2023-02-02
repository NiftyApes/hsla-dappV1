/* eslint-disable */

import { ethers } from 'ethers';
import {
  CEthContract,
  LiquidityContract,
  useLiquidityEvents,
} from 'providers/NiftyApesProvider';
import { getAvailableLiquidityForAddressMinusCompoundInterest } from 'providers/__helpers/getAvailableLiquidityForAddressMinusCompoundInterest';
import { useCallback } from 'react';

export function useFilterSignatureOffersByLiquidityBacking() {
  const { liquidityEvents } = useLiquidityEvents();

  const filterSignatureOffersByLiquidityBacking = useCallback(
    async (signatureOffersToFilter: any) => {
      const result: any[] = [];

      for (let i = 0; i < signatureOffersToFilter.length; i++) {
        const signatureOffer = signatureOffersToFilter[i];

        const potentialLender = signatureOffer.Offer.creator;

        const liquidityMinusCompound =
          getAvailableLiquidityForAddressMinusCompoundInterest(
            potentialLender,
            liquidityEvents,
          );

        // Assume Compound interest is no more than 10% per year
        try {
          if (
            ethers.utils
              .parseEther(String(liquidityMinusCompound))
              .mul(110)
              .div(100)
              .lt(signatureOffer.Offer.amount)
          ) {
            continue;
          }

          if (
            ethers.utils
              .parseEther(String(liquidityMinusCompound))
              .gte(signatureOffer.Offer.amount)
          ) {
            result.push(signatureOffer);
            continue;
          }
        } catch (e) {
          // with really low liquidityMinusCompound values, we get into
          // a very bad situation with BigNumber edge cases

          continue;
        }

        const lenderLiquidityInCEth = await LiquidityContract.getCAssetBalance(
          signatureOffer.Offer.creator,
          CEthContract.address,
        );

        const exchangeRate = await CEthContract.exchangeRateStored();

        const lenderLiquidityInEth = lenderLiquidityInCEth
          .mul(exchangeRate)
          .div((1e18).toString()); // This doesn't work if you don't toString

        if (signatureOffer.Offer.amount > lenderLiquidityInEth) {
          continue;
        }

        result.push(signatureOffer);
      }

      return result;
    },
    [liquidityEvents],
  );

  if (!liquidityEvents) {
    return {
      loading: true,
      filterSignatureOffersByLiquidityBacking: undefined,
    };
  }

  return {
    loading: false,
    filterSignatureOffersByLiquidityBacking,
  };
}
