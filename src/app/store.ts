// Zak: Copy-pasted from Redux Toolkit
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../counter/counterSlice';
import loansReducer from '../loan/state/loans.slice';
import nftsReducer from '../nft/state/nfts.slice';
import nftsMiddleware from 'nft/state/nfts-middleware';
import loanMiddleware from 'loan/state/loans-middleware';
import { NiftyApesContract, Wallet } from 'nft/model';

let wallet: Wallet | null = null;
let niftyApesContract: NiftyApesContract | null = null;

export type ThunkExtra = {
  wallet?: Wallet | null;
  niftyApesContract?: NiftyApesContract | null;
};

const getExtraArgs = () => ({
  wallet,
  niftyApesContract,
});

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    loans: loansReducer,
    nfts: nftsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: getExtraArgs,
      },
      serializableCheck: {
        ignoredActionPaths: ['payload.error', 'meta.arg.contract'],
      },
    }).prepend(nftsMiddleware, loanMiddleware),
});

export const setStoreNiftyApesContract = (newContract?: NiftyApesContract | null) =>
  (niftyApesContract = newContract || null);
export const getStoreNiftyApesContract = () => niftyApesContract;
export const setStoreWallet = (newWallet: Wallet | null) => {
  console.log('setStoreWallet', newWallet);
  wallet = newWallet;
  if (newWallet?.accounts[0]?.address) {
    store.dispatch({
      type: 'app/walletConnect',
      payload: newWallet?.accounts[0]?.address,
    });
  }
};
export const getStoreWallet = () => wallet;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
