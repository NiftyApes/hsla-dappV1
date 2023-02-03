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
import { ALCHEMY_API_KEY, CHAIN } from './constants';
import { CETH, LENDING, LIQUIDITY, OFFERS } from './__contracts/addresses';
import { constructRepresentation } from './__core/constructRepresentation';
import { fetchAllEvents } from './__core/fetchAllEvents';
import { fetchSignatureOffers } from './__core/fetchSignatureOffers';
import { sortEventsByBlockNumberAndLogIndex } from './__core/sortEventsByBlockNumberAndLogIndex';

const provider = new ethers.providers.AlchemyProvider(
  CHAIN?.toLowerCase(),
  ALCHEMY_API_KEY,
);

const LendingContract = new ethers.Contract(
  LENDING.ADDRESS,
  LENDING.ABI,
  provider,
);

const OffersContract = new ethers.Contract(
  OFFERS.ADDRESS,
  OFFERS.ABI,
  provider,
);

export const LiquidityContract = new ethers.Contract(
  LIQUIDITY.ADDRESS,
  LIQUIDITY.ABI,
  provider,
);

export const CEthContract = new ethers.Contract(
  CETH.ADDRESS,
  CETH.ABI,
  provider,
);

export const NiftyApesContext = createContext<any>({
  onChainOffers: undefined,
  loans: undefined,
  signatureOffers: undefined,
  collections: undefined,
  liquidityEvents: undefined,
});

export function NiftyApesProvider({ children }: { children: ReactNode }) {
  const [loanExecutedEvents, setLoanExecutedEvents] = useState<any>();
  const [loanRepaidEvents, setLoanRepaidEvents] = useState<any>();
  const [loanPartiallyRepaidEvents, setLoanPartiallyRepaidEvents] =
    useState<any>();
  const [refinanceEvents, setRefinanceEvents] = useState<any>();
  const [amountDrawnEvents, setAmountDrawnEvents] = useState<any>();
  const [assetSeizedEvents, setAssetSeizedEvents] = useState<any>();
  const [newOfferEvents, setNewOfferEvents] = useState<any>();
  const [offerRemovedEvents, setOfferRemovedEvents] = useState<any>();
  const [offerSignatureUsedEvents, setOfferSignatureUsedEvents] =
    useState<any>();
  const [ethSuppliedEvents, setEthSuppliedEvents] = useState<any>();
  const [ethWithdrawnEvents, setEthWithdrawnEvents] = useState<any>();
  const [signatureOffersFromDb, setSignatureOffersFromDb] = useState<any>();

  // fetch all events and signature offers and load them into component state
  useEffect(() => {
    async function fn() {
      const {
        loanExecutedEvents,
        loanRepaidEvents,
        loanPartiallyRepaidEvents,
        refinanceEvents,
        amountDrawnEvents,
        assetSeizedEvents,
        newOfferEvents,
        offerRemovedEvents,
        offerSignatureUsedEvents,
        ethSuppliedEvents,
        ethWithdrawnEvents,
      } = await fetchAllEvents({
        provider,
        LendingContract,
        OffersContract,
        LiquidityContract,
      });

      setLoanExecutedEvents(loanExecutedEvents);
      setLoanRepaidEvents(loanRepaidEvents);
      setLoanPartiallyRepaidEvents(loanPartiallyRepaidEvents);
      setRefinanceEvents(refinanceEvents);
      setAmountDrawnEvents(amountDrawnEvents);
      setAssetSeizedEvents(assetSeizedEvents);
      setNewOfferEvents(newOfferEvents);
      setOfferRemovedEvents(offerRemovedEvents);
      setOfferSignatureUsedEvents(offerSignatureUsedEvents);
      setEthSuppliedEvents(ethSuppliedEvents);
      setEthWithdrawnEvents(ethWithdrawnEvents);

      const _signatureOffersFromDb = await fetchSignatureOffers();

      setSignatureOffersFromDb(
        _.sortBy(_signatureOffersFromDb, (item) => Number(item.TS)),
      );
    }
    fn();
  }, []);

  // sort all events in order of appearance on chain
  const allEvents =
    loanExecutedEvents &&
    loanRepaidEvents &&
    loanPartiallyRepaidEvents &&
    refinanceEvents &&
    amountDrawnEvents &&
    assetSeizedEvents &&
    newOfferEvents &&
    offerRemovedEvents &&
    offerSignatureUsedEvents &&
    ethSuppliedEvents &&
    ethWithdrawnEvents &&
    sortEventsByBlockNumberAndLogIndex(
      loanExecutedEvents,
      loanRepaidEvents,
      loanPartiallyRepaidEvents,
      refinanceEvents,
      amountDrawnEvents,
      assetSeizedEvents,
      newOfferEvents,
      offerRemovedEvents,
      offerSignatureUsedEvents,
      ethSuppliedEvents,
      ethWithdrawnEvents,
    );

  // use sorted events and signature offers to construct the representation
  let [onChainOffers, signatureOffers, loans, collections, liquidityEvents] =
    useMemo(() => {
      if (allEvents && signatureOffersFromDb) {
        const {
          offers: _offers,
          signatureOffers: _signatureOffers,
          loans: _loans,
          collections: _collections,
          liquidityEvents: _liquidityEvents,
        } = constructRepresentation({
          sortedEvents: allEvents,
          signatureOffersFromDb,
        });

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

export function useLiquidityEvents() {
  const { liquidityEvents } = useContext(NiftyApesContext);

  if (!liquidityEvents) {
    return { loading: true, liquidityEvents: undefined };
  }

  return { loading: false, liquidityEvents };
}
