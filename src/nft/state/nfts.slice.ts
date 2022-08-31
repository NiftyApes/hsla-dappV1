import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, ThunkExtra } from 'app/store';
import { getNFTsOfAddress } from 'helpers/getNFTsOfAddress';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { Contract, LendingContract, NFT, WalletAddress } from '../model';

export type RootNFTsState = {
  nfts: NFTsState;
};

export type NFTsState = {
  nftsByWalletAddress: Record<WalletAddress, FetchNFTsResponse>;
  selectedWalletAddress?: string;
  niftyApesContract?: LendingContract;
};

export const NFTsInitialState: NFTsState = {
  nftsByWalletAddress: {},
  selectedWalletAddress: undefined,
  niftyApesContract: undefined,
};

type NFTsThunkApi = {
  state: RootNFTsState;
  dispatch: AppDispatch;
  extra: () => ThunkExtra;
};

export type FetchNFTsResponse = {
  content: Array<NFT> | undefined;
  count?: number;
  scannedCount?: number;
  error?: string;
  fetching: boolean;
};

export const fetchNFTsByWalletAddress = createAsyncThunk<
  FetchNFTsResponse | undefined,
  {
    walletAddress: WalletAddress;
    contract: Contract;
  },
  NFTsThunkApi
>('nfts/fetchNFTsByWalletAddress', async ({ walletAddress, contract }, thunkApi) => {
  const { lendingContract } = thunkApi.extra();

  if (lendingContract) {
    const nfts = await getNFTsOfAddress({
      walletAddress,
      contract,
      lendingContract,
    });

    if (nfts) {
      return {
        content: nfts,
        fetching: false,
        error: undefined,
      };
    } else {
      return thunkApi.rejectWithValue({
        type: 'global',
        message: 'Unable to fetch NFTs',
      });
    }
  } else {
    return thunkApi.rejectWithValue({
      type: 'global',
      message: 'NiftyApes contract is undefined',
    });
  }
});

const slice = createSlice({
  name: 'nfts',
  initialState: NFTsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNFTsByWalletAddress.pending, (state, action) => {
      state.nftsByWalletAddress = {
        ...state.nftsByWalletAddress,
        [action.meta.arg.walletAddress]: {
          ...state.nftsByWalletAddress[action.meta.arg.walletAddress],
          fetching: true,
          error: undefined,
        },
      };
    });
    builder.addCase(fetchNFTsByWalletAddress.fulfilled, (state, action) => {
      const walletNftArr = state.nftsByWalletAddress[action.meta.arg.walletAddress];

      if (action.payload && action.meta.arg.walletAddress) {
        if (!state.nftsByWalletAddress[action.meta.arg.walletAddress].content) {
          state.nftsByWalletAddress[action.meta.arg.walletAddress].content = [];
        }

        if (action.payload.content) {
          (state.nftsByWalletAddress[action.meta.arg.walletAddress].content as any).push(
            ...action.payload.content,
          );
        }

        state.nftsByWalletAddress[action.meta.arg.walletAddress].fetching = false;
        state.nftsByWalletAddress[action.meta.arg.walletAddress].error = undefined;
      }
    });
    builder.addCase(fetchNFTsByWalletAddress.rejected, (state, action) => {
      state.nftsByWalletAddress = {
        ...state.nftsByWalletAddress,
        [action.meta.arg.walletAddress]: {
          content: undefined,
          fetching: false,
          error: action.error.message ?? 'rejected',
        },
      };
    });
  },
});

export const useNFTsSelector: TypedUseSelectorHook<RootNFTsState> = useSelector;

export const selectors = {
  nftsByWalletAddress: (s: RootNFTsState) => s.nfts.nftsByWalletAddress,
};

export const useNFTsByWalletAddress = (walletAddress: WalletAddress) => {
  return useNFTsSelector(selectors.nftsByWalletAddress)[walletAddress];
};

export default slice.reducer;
