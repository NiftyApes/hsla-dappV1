/* eslint-disable */
import { useCallback } from 'react';
import { useSignatureOffers } from '../NiftyApesProvider';

export function useFilterSignatureOffersByPunches() {
  const { signatureOffers, loading: isLoadingSignatureOffers } =
    useSignatureOffers();

  const filterSignatureOffersByPunches = useCallback(
    (signatureOffersToFilter: any) =>
      signatureOffers?.length > 0
        ? signatureOffersToFilter.filter((sotf: any) => {
            const signatureOffer = signatureOffers.find(
              (so: any) => so.Signature === sotf.Signature,
            );

            if (
              signatureOffer.loans
                ? signatureOffer.loans.length
                : 0 <= signatureOffer.Offer.floorTermLimit
            ) {
              return true;
            }

            return false;
          })
        : [],
    [signatureOffers],
  );

  if (isLoadingSignatureOffers) {
    return { loading: true, filterSignatureOffers: undefined };
  }

  return {
    loading: false,
    filterSignatureOffersByPunches,
  };
}
