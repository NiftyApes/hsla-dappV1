/* eslint-disable */
import { ethers } from 'ethers';
import _ from 'lodash';

export function constructRepresentation({
  sortedEvents,
  signatureOffersFromDb,
}: any) {
  let offers: any = [];
  let loans: any = [];
  let signatureOffers = _.cloneDeep(signatureOffersFromDb);
  let collections: any = [];
  let liquidityEvents: any = [];

  if (sortedEvents && signatureOffersFromDb) {
    for (let i = 0; i < signatureOffersFromDb.length; i++) {
      const o = signatureOffersFromDb[i];

      if (!collections.includes(o.Offer.nftContractAddress.toLowerCase())) {
        collections.push(o.Offer.nftContractAddress.toLowerCase());
      }
    }

    for (let i = 0; i < sortedEvents.length; i++) {
      const e = sortedEvents[i];

      if (e.event === 'LoanExecuted') {
        const offer = offers.find((o: any) => {
          return (
            (o.nftId.eq(0) || o.nftId.eq(e.args.nftId)) &&
            o.nftContractAddress === e.args.nftContractAddress &&
            o.newOfferEvent.args.offer.amount.eq(e.args.loanAuction.amount) &&
            o.newOfferEvent.args.offer.interestRatePerSecond.eq(
              e.args.loanAuction.interestRatePerSecond,
            )
          );
        });

        const signatureOffer = signatureOffers.find((o: any) => {
          if (offer) return;

          return (
            (o.Offer.nftId === 0 || e.args.nftId.eq(o.Offer.nftId)) &&
            o.Offer.nftContractAddress.toLowerCase() ===
              e.args.nftContractAddress.toLowerCase() &&
            e.args.loanAuction.amount.eq(o.Offer.amount) &&
            e.args.loanAuction.interestRatePerSecond.eq(
              o.Offer.interestRatePerSecond,
            )
          );
        });

        const loan = {
          type: 'LOAN',
          loanExecutedEvent: e,
          loanAuction: e.args.loanAuction,
          nftId: e.args.nftId,
          nftContractAddress: e.args.nftContractAddress,
          amountDrawn: e.args.loanAuction.amountDrawn,
          partialRepayments: [],
          additionalDrawDowns: [],
          hasBeenRepaid: false,
          hasBeenSeized: false,
          hasBeenRefinanced: false,
          offer: offer || signatureOffer,
          isRefinanceOf: null,
        };

        loans.push(loan);

        if (offer) {
          offer.loans.push(loan);
        } else if (signatureOffer) {
          if (!signatureOffer.loans) {
            signatureOffer.loans = [];
          }
          signatureOffer.loans.push(loan);
        }

        liquidityEvents.push({
          type: 'LOAN_MADE',
          address: e.args.loanAuction.lender,
          amount: Number(
            ethers.utils.formatEther(e.args.loanAuction.amountDrawn),
          ),
          loan,
          event: e,
        });
      } else if (e.event === 'LoanRepaid') {
        const { nftContractAddress, nftId } = e.args;
        const loanToBeRepaid = loans.find(
          (loan: any) =>
            loan.nftId.eq(nftId) &&
            loan.nftContractAddress === nftContractAddress &&
            !loan.hasBeenRepaid &&
            !loan.hasBeenSeized &&
            !loan.hasBeenRefinanced,
        );

        loanToBeRepaid.hasBeenRepaid = true;
        loanToBeRepaid.repayLoanEvent = e;
      } else if (e.event === 'PartialRepayment') {
        const { nftContractAddress, nftId } = e.args;
        const loanToBePartiallyRepaid = loans.find(
          (loan: any) =>
            loan.nftId.eq(nftId) &&
            loan.nftContractAddress === nftContractAddress &&
            !loan.hasBeenRepaid &&
            !loan.hasBeenSeized &&
            !loan.hasBeenRefinanced,
        );

        loanToBePartiallyRepaid.amountDrawn =
          loanToBePartiallyRepaid.amountDrawn.sub(e.args.amount);

        loanToBePartiallyRepaid.partialRepayments.push(e);
      } else if (e.event === 'Refinance') {
        console.log('refinance', e);
        const { nftContractAddress, nftId, loanAuction } = e.args;
        const loanToRefinance = loans.find(
          (loan: any) =>
            loan.nftId.eq(nftId) &&
            loan.nftContractAddress === nftContractAddress &&
            !loan.hasBeenRepaid &&
            !loan.hasBeenSeized &&
            !loan.hasBeenRefinanced,
        );

        loanToRefinance.hasBeenRefinanced = true;
        loanToRefinance.refinanceEvent = e;

        // TODO: detect whether borrower refi by checking whether sortedEvents(i+1) is AmountDrawn

        /* create new refinance loan */
        const offer = offers.find((o: any) => {
          return (
            (o.nftId.eq(0) || o.nftId.eq(e.args.nftId)) &&
            o.nftContractAddress === e.args.nftContractAddress &&
            o.newOfferEvent.args.offer.amount.eq(e.args.loanAuction.amount) &&
            o.newOfferEvent.args.offer.interestRatePerSecond.eq(
              e.args.loanAuction.interestRatePerSecond,
            )
          );
        });

        const signatureOffer = signatureOffers.find((o: any) => {
          if (offer) return;

          return (
            (o.Offer.nftId === 0 || e.args.nftId.eq(o.Offer.nftId)) &&
            o.Offer.nftContractAddress.toLowerCase() ===
              e.args.nftContractAddress.toLowerCase() &&
            e.args.loanAuction.amount.eq(o.Offer.amount) &&
            e.args.loanAuction.interestRatePerSecond.eq(
              o.Offer.interestRatePerSecond,
            )
          );
        });

        const loan = {
          type: 'LOAN',
          loanExecutedEvent: e,
          loanAuction: e.args.loanAuction,
          nftId: e.args.nftId,
          nftContractAddress: e.args.nftContractAddress,
          amountDrawn: e.args.loanAuction.amountDrawn,
          partialRepayments: [],
          additionalDrawDowns: [],
          hasBeenRepaid: false,
          hasBeenSeized: false,
          hasBeenRefinanced: false,
          offer: offer || signatureOffer,
          isRefinanceOf: loanToRefinance,
        };

        loans.push(loan);

        loanToRefinance.hasBeenRefinancedInto = loan;

        if (offer) {
          offer.loans.push(loan);
        } else if (signatureOffer) {
          if (!signatureOffer.loans) {
            signatureOffer.loans = [];
          }
          signatureOffer.loans.push(loan);
        }

        liquidityEvents.push({
          type: 'LOAN_MADE',
          address: e.args.loanAuction.lender,
          amount: Number(
            ethers.utils.formatEther(e.args.loanAuction.amountDrawn),
          ),
          loan,
          event: e,
        });
      } else if (e.event === 'AmountDrawn') {
        const { nftContractAddress, nftId } = e.args;
        const loanToDrawDown = loans.find(
          (loan: any) =>
            loan.nftId.eq(nftId) &&
            loan.nftContractAddress === nftContractAddress &&
            !loan.hasBeenRepaid &&
            !loan.hasBeenSeized &&
            !loan.hasBeenRefinanced,
        );

        // TODO see if sortedEvents(i - 1) is Refinance and ignore if so

        loanToDrawDown.additionalDrawDowns.push(e);
      } else if (e.event === 'AssetSeized') {
        const { nftContractAddress, nftId } = e.args;
        const loanToBeRepaid = loans.find(
          (loan: any) =>
            loan.nftId.eq(nftId) &&
            loan.nftContractAddress === nftContractAddress &&
            !loan.hasBeenRepaid &&
            !loan.hasBeenSeized &&
            !loan.hasBeenRefinanced,
        );

        loanToBeRepaid.hasBeenSeized = true;
        loanToBeRepaid.assetSeizedEvent = e;
      } else if (e.event === 'NewOffer') {
        offers.push({
          type: 'OFFER',
          creator: e.args.creator,
          nftContractAddress: e.args.nftContractAddress,
          nftId: e.args.nftId,
          offer: e.args.offer,
          offerHash: e.args.offerHash,
          newOfferEvent: e,
          loans: [],
          hasBeenCanceled: false,
        });

        if (!collections.includes(e.args.nftContractAddress.toLowerCase())) {
          collections.push(e.args.nftContractAddress.toLowerCase());
        }
      } else if (e.event === 'OfferRemoved') {
        const offer = offers.find((o: any) => {
          return o.offerHash === e.args.offerHash;
        });
        offer.hasBeenCanceled = true;
        offer.offerRemovedEvent = e;
      } else if (e.event === 'OfferSignatureUsed') {
        const signatureOffer = signatureOffers.find((o: any) => {
          return o.Signature === e.args.signature;
        });
        signatureOffer.hasBeenUsed = true;
        signatureOffer.offerUsedEvent = e;
      } else if (e.event === 'EthSupplied') {
        liquidityEvents.push({
          type: 'ETH_SUPPLIED',
          address: e.args.liquidityProvider,
          amount: Number(ethers.utils.formatEther(e.args.amount)),
          event: e,
        });
      } else if (e.event === 'EthWithdrawn') {
        liquidityEvents.push({
          type: 'ETH_WITHDRAWN',
          address: e.args.liquidityProvider,
          amount: Number(ethers.utils.formatEther(e.args.amount)),
          event: e,
        });
      } else {
        console.log('unknown event', e);
      }
    }

    return { offers, signatureOffers, loans, collections, liquidityEvents };
  }

  return {};
}
