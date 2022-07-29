// Zak: Copy-pasted from Redux Toolkit
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../counter/counterSlice';
import loansReducer from '../loan/state/loans.slice';
import nftsReducer from '../nft/state/nfts.slice';
import { LendingContract, OffersContract, LiquidityContract, Wallet } from 'nft/model';

let wallet: Wallet | null = null;
let lendingContract: LendingContract | null = null;
let offersContract: OffersContract | null = null;
let liquidityContract: LiquidityContract | null = null;

export type ThunkExtra = {
  wallet?: Wallet | null;
  lendingContract?: LendingContract | null;
  offersContract?: OffersContract | null;
};

const getExtraArgs = () => ({
  wallet,
  lendingContract,
  offersContract,
  liquidityContract,
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

export const setStoreLendingContract = (newContract?: LendingContract | null) =>
  (lendingContract = newContract || null);
export const getStoreLendingContract = () => lendingContract;

export const setStoreOffersContract = (newContract?: OffersContract | null) =>
  (offersContract = newContract || null);
export const getStoreOffersContract = () => offersContract;

export const setStoreLiquidityContract = (newContract?: LiquidityContract | null) =>
  (liquidityContract = newContract || null);
export const getStoreLiquidityContract = () => liquidityContract;

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
