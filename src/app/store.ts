// Zak: Copy-pasted from Redux Toolkit
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../counter/counterSlice';
import loansReducer from '../loan/state/loans.slice';
import nftsReducer from '../nft/state/nfts.slice';
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
    }),
});

export const setStoreNiftyApesContract = (newContract?: NiftyApesContract | null) =>
  (niftyApesContract = newContract || null);
export const getStoreNiftyApesContract = () => niftyApesContract;
export const setStoreWallet = (newWallet: Wallet | null) => (wallet = newWallet);
export const getStoreWallet = () => wallet;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
