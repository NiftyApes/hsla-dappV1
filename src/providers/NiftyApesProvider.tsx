/* eslint-disable */
import { ethers } from 'ethers';
import _ from 'lodash';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { MAINNET } from './__contracts/addresses';

const provider = new ethers.providers.AlchemyProvider(
  'mainnet',
  'F83MH9ibaXCMZ5B9PlWuykR3L4MvZwqp',
);

const LendingContract = new ethers.Contract(
  MAINNET.LENDING.ADDRESS,
  MAINNET.LENDING.ABI,
  provider,
);

const OffersContract = new ethers.Contract(
  MAINNET.OFFERS.ADDRESS,
  MAINNET.OFFERS.ABI,
  provider,
);

const LiquidityContract = new ethers.Contract(
  MAINNET.LIQUIDITY.ADDRESS,
  MAINNET.LIQUIDITY.ABI,
  provider,
);

export const NiftyApesContext = createContext<any>(undefined);

export function NiftyApesProvider({ children }: { children: ReactNode }) {
  const [loanExecutedEvents, setLoanExecutedEvents] = useState<any>();
  const [loanRepaidEvents, setLoanRepaidEvents] = useState<any>();
  const [assetSeizedEvents, setAssetSeizedEvents] = useState<any>();
  const [newOfferEvents, setNewOfferEvents] = useState<any>();
  const [offerRemovedEvents, setOfferRemovedEvents] = useState<any>();
  const [offerSignatureUsedEvents, setOfferSignatureUsedEvents] =
    useState<any>();
  const [ethSuppliedEvents, setEthSuppliedEvents] = useState<any>();
  const [ethWithdrawnEvents, setEthWithdrawnEvents] = useState<any>();

  const [signatureOffersFromDb, setSignatureOffersFromDb] = useState<any>();

  useEffect(() => {
    async function fn() {
      const curBlockNumber = await provider.getBlockNumber();

      const loanExecutedEvents = await LendingContract.queryFilter(
        LendingContract.filters.LoanExecuted(),
        0,
        curBlockNumber,
      );

      setLoanExecutedEvents(loanExecutedEvents);

      const loanRepaidEvents = await LendingContract.queryFilter(
        LendingContract.filters.LoanRepaid(),
        0,
        curBlockNumber,
      );

      setLoanRepaidEvents(loanRepaidEvents);

      const assetSeizedEvents = await LendingContract.queryFilter(
        LendingContract.filters.AssetSeized(),
        0,
        curBlockNumber,
      );

      setAssetSeizedEvents(assetSeizedEvents);

      const newOfferEvents = await OffersContract.queryFilter(
        OffersContract.filters.NewOffer(),
        0,
        curBlockNumber,
      );

      setNewOfferEvents(newOfferEvents);

      const offerRemovedEvents = await OffersContract.queryFilter(
        OffersContract.filters.OfferRemoved(),
        0,
        curBlockNumber,
      );

      setOfferRemovedEvents(offerRemovedEvents);

      const offerSignatureUsedEvents = await OffersContract.queryFilter(
        OffersContract.filters.OfferSignatureUsed(),
        0,
        curBlockNumber,
      );

      setOfferSignatureUsedEvents(offerSignatureUsedEvents);

      const ethSuppliedEvents = await LiquidityContract.queryFilter(
        LiquidityContract.filters.EthSupplied(),
        0,
        curBlockNumber,
      );

      setEthSuppliedEvents(ethSuppliedEvents);

      const ethWithdrawnEvents = await LiquidityContract.queryFilter(
        LiquidityContract.filters.EthWithdrawn(),
        0,
        curBlockNumber,
      );

      setEthWithdrawnEvents(ethWithdrawnEvents);

      const response = await fetch(
        'https://qqxeqsrt39.execute-api.us-west-2.amazonaws.com/MAINNET/v2/signature-offers?all=true',
      );
      const items = await response.json();

      setSignatureOffersFromDb(_.sortBy(items, (item) => Number(item.TS)));
    }
    fn();
  }, []);

  const allEvents =
    loanExecutedEvents &&
    loanRepaidEvents &&
    assetSeizedEvents &&
    newOfferEvents &&
    offerRemovedEvents &&
    offerSignatureUsedEvents &&
    ethSuppliedEvents &&
    ethWithdrawnEvents &&
    _.sortBy(
      [
        ...loanExecutedEvents,
        ...loanRepaidEvents,
        ...assetSeizedEvents,
        ...newOfferEvents,
        ...offerRemovedEvents,
        ...offerSignatureUsedEvents,
        ...ethSuppliedEvents,
        ...ethWithdrawnEvents,
      ],
      [(e: any) => e.blockNumber, (e: any) => e.logIndex],
    );

  let [onChainOffers, signatureOffers, loans, collections, liquidityEvents] =
    useMemo(() => {
      let _offers: any = [];
      let _loans: any = [];
      let _signatureOffers = _.cloneDeep(signatureOffersFromDb);
      let _collections: any = [];
      let _liquidityEvents: any = [];

      if (allEvents && signatureOffersFromDb) {
        for (let i = 0; i < signatureOffersFromDb.length; i++) {
          const o = signatureOffersFromDb[i];

          if (
            !_collections.includes(o.Offer.nftContractAddress.toLowerCase())
          ) {
            _collections.push(o.Offer.nftContractAddress.toLowerCase());
          }
        }

        for (let i = 0; i < allEvents.length; i++) {
          const e = allEvents[i];

          if (e.event === 'LoanExecuted') {
            const offer = _offers.find((o: any) => {
              return (
                (o.nftId.eq(0) || o.nftId.eq(e.args.nftId)) &&
                o.nftContractAddress === e.args.nftContractAddress &&
                o.newOfferEvent.args.offer.amount.eq(
                  e.args.loanAuction.amount,
                ) &&
                o.newOfferEvent.args.offer.interestRatePerSecond.eq(
                  e.args.loanAuction.interestRatePerSecond,
                )
              );
            });

            const signatureOffer = _signatureOffers.find((o: any) => {
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
              hasBeenRepaid: false,
              offer,
            };

            _loans.push(loan);

            if (offer) {
              offer.loans.push(loan);
            } else if (signatureOffer) {
              if (!signatureOffer.loans) {
                signatureOffer.loans = [];
              }
              signatureOffer.loans.push(loan);
            }

            _liquidityEvents.push({
              type: 'LOAN_MADE',
              address: e.args.loanAuction.lender,
              amount: Number(
                ethers.utils.formatEther(e.args.loanAuction.amount),
              ),
              loan,
              event: e,
            });
          } else if (e.event === 'LoanRepaid') {
            const { nftContractAddress, nftId } = e.args;
            const loanToBeRepaid = _loans.find(
              (loan: any) =>
                loan.nftId.eq(nftId) &&
                loan.nftContractAddress === nftContractAddress &&
                !loan.hasBeenRepaid &&
                !loan.hasBeenSeized,
            );

            loanToBeRepaid.hasBeenRepaid = true;
            loanToBeRepaid.repayLoanEvent = e;
          } else if (e.event === 'AssetSeized') {
            const { nftContractAddress, nftId } = e.args;
            const loanToBeRepaid = _loans.find(
              (loan: any) =>
                loan.nftId.eq(nftId) &&
                loan.nftContractAddress === nftContractAddress &&
                !loan.hasBeenRepaid &&
                !loan.hasBeenSeized,
            );

            loanToBeRepaid.hasBeenSeized = true;
            loanToBeRepaid.assetSeizedEvent = e;
          } else if (e.event === 'NewOffer') {
            _offers.push({
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

            if (
              !_collections.includes(e.args.nftContractAddress.toLowerCase())
            ) {
              _collections.push(e.args.nftContractAddress.toLowerCase());
            }
          } else if (e.event === 'OfferRemoved') {
            const offer = _offers.find((o: any) => {
              return o.offerHash === e.args.offerHash;
            });
            offer.hasBeenCanceled = true;
            offer.offerRemovedEvent = e;
          } else if (e.event === 'OfferSignatureUsed') {
            const signatureOffer = _signatureOffers.find((o: any) => {
              return o.Signature === e.args.signature;
            });
            signatureOffer.hasBeenUsed = true;
            signatureOffer.offerUsedEvent = e;
          } else if (e.event === 'EthSupplied') {
            _liquidityEvents.push({
              type: 'ETH_SUPPLIED',
              address: e.args.liquidityProvider,
              amount: Number(ethers.utils.formatEther(e.args.amount)),
              event: e,
            });
          } else if (e.event === 'EthWithdrawn') {
            _liquidityEvents.push({
              type: 'ETH_WITHDRAWN',
              address: e.args.liquidityProvider,
              amount: Number(ethers.utils.formatEther(e.args.amount)),
              event: e,
            });
          }
        }

        return [
          _offers,
          _signatureOffers,
          _loans,
          _collections,
          _liquidityEvents,
        ];
      }
      return [];
    }, [allEvents?.length, signatureOffersFromDb?.length]);

  return (
    <NiftyApesContext.Provider
      value={{
        onChainOffers,
        loans,
        signatureOffers,
        collections,
        liquidityEvents,
      }}
    >
      {children}
    </NiftyApesContext.Provider>
  );
}

export function useOnChainOffers() {
  const { onChainOffers } = useContext(NiftyApesContext);

  if (!onChainOffers) {
    return { loading: true, onChainOffers: undefined };
  }

  return { loading: false, onChainOffers };
}

export function useSignatureOffers() {
  const { signatureOffers } = useContext(NiftyApesContext);

  if (!signatureOffers) {
    return { loading: true, signatureOffers: undefined };
  }

  return { loading: false, signatureOffers };
}

export function useLoans() {
  const { loans } = useContext(NiftyApesContext);

  if (!loans) {
    return { loading: true, loans: undefined };
  }

  return { loading: false, loans };
}

export function useCollections() {
  const { collections } = useContext(NiftyApesContext);

  if (!collections) {
    return { loading: true, collections: undefined };
  }

  return { loading: false, collections };
}
