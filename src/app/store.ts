/* eslint-disable import/no-cycle */
/* eslint-disable no-return-assign */
// Zak: Copy-pasted from Redux Toolkit
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import {
  CEthContract,
  LendingContract,
  LiquidityContract,
  OffersContract,
  Wallet,
} from 'nft/model';
import counterReducer from '../counter/counterSlice';
import loansReducer from '../loan/state/loans.slice';
import nftsReducer from '../nft/state/nfts.slice';

let wallet: Wallet | null = null;
let lendingContract: LendingContract | null = null;
let offersContract: OffersContract | null = null;
let liquidityContract: LiquidityContract | null = null;
let cEthContract: any | null = null;

export type ThunkExtra = {
  wallet?: Wallet | null;
  lendingContract?: LendingContract | null;
  offersContract?: OffersContract | null;
  liquidityContract?: LiquidityContract | null;
  cEthContract?: CEthContract | null;
};

const getExtraArgs = () => ({
  wallet,
  lendingContract,
  offersContract,
  liquidityContract,
  cEthContract,
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
      serializableCheck: false,
    }),
});

export const setStoreLendingContract = (newContract?: LendingContract | null) =>
  (lendingContract = newContract || null);
export const getStoreLendingContract = () => lendingContract;

export const setStoreOffersContract = (newContract?: OffersContract | null) =>
  (offersContract = newContract || null);
export const getStoreOffersContract = () => offersContract;

export const setStoreLiquidityContract = (
  newContract?: LiquidityContract | null,
) => (liquidityContract = newContract || null);
export const getStoreLiquidityContract = () => liquidityContract;

export const setStoreCEthContract = (newContract?: CEthContract | null) =>
  (cEthContract = newContract || null);
export const getStoreCEthContract = () => cEthContract;

export const setStoreWallet = (newWallet: Wallet | null) =>
  (wallet = newWallet);
export const getStoreWallet = () => wallet;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
