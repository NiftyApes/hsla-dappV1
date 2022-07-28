import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, ThunkExtra } from 'app/store';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import {
  Contract,
  NiftyApesContract,
  WalletAddress,
  NFT,
  ContractAddress,
  AlchemyGetNFTsResponse,
  nftFromAlchemy,
} from '../model';
import { getNFTsOfAddress } from 'helpers/getNFTsOfAddress';
import { getJson } from 'helpers/fetchUtils';
import { getAlchemyUpiUrl } from 'helpers/getAlchemyApiUrl';

export type RootNFTsState = {
  nfts: NFTsState;
};

export type NFTsState = {
  nftsByWalletAddress: Record<WalletAddress, FetchNFTsResponse>;
  nftsByWalletAddressLocal: Record<WalletAddress, FetchNFTsLocalResponse>;
  nftCollections: Record<ContractAddress, FetchNFTCollectionResponse>;
  selectedWalletAddress?: string;
  niftyApesContract?: NiftyApesContract;
};

export const NFTsInitialState: NFTsState = {
  nftsByWalletAddress: {},
  nftsByWalletAddressLocal: {},
  nftCollections: {},
  selectedWalletAddress: undefined,
  niftyApesContract: undefined,
};

type NFTsThunkApi = {
  state: RootNFTsState;
  dispatch: AppDispatch;
  extra: () => ThunkExtra;
};

export type FetchNFTsResponse = {
  content: NFT[] | undefined;
  // count?: number;
  // scannedCount?: number;
  error?: string;
  fetching: boolean;
};

export type FetchNFTsLocalResponse = {
  content: NFT[] | undefined;
  count?: number;
  scannedCount?: number;
  error?: string;
  fetching: boolean;
};

export type FetchNFTCollectionResponse = {
  content: string;
  count?: number;
  error?: string;
  fetching: boolean;
};

export const fetchNFTsByAddress = createAsyncThunk<
  FetchNFTsResponse | undefined,
  {
    walletAddress: WalletAddress;
    contract?: Contract;
    network?: string;
  },
  NFTsThunkApi
>('nfts/fetchNFTsByAddress', async ({ walletAddress }, thunkApi) => {
  const response = (await getJson({
    url: getAlchemyUpiUrl('getNFTs', 'testnet'),
    data: {
      owner: walletAddress,
      withMetadata: 'true',
    },
  })) as AlchemyGetNFTsResponse;

  if (response) {
    return {
      content: response.ownedNfts.map((nft) => nftFromAlchemy(nft, walletAddress)),
      fetching: false,
      error: undefined,
    };
  } else {
    return thunkApi.rejectWithValue({
      type: 'global',
      message: 'Unable to fetch NFTs',
    });
  }
});

export const fetchNFTsByAddressLocal = createAsyncThunk<
  FetchNFTsLocalResponse | undefined,
  {
    walletAddress: WalletAddress;
    contract?: Contract;
  },
  NFTsThunkApi
>('nfts/fetchNFTsByAddressLocal', async ({ walletAddress, contract }, thunkApi) => {
  const { niftyApesContract } = thunkApi.extra();

  if (niftyApesContract && contract) {
    const nfts = await getNFTsOfAddress({
      walletAddress,
      contract,
      niftyApesContract,
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

const fetchNFTCollection = createAsyncThunk<
  FetchNFTCollectionResponse | undefined,
  {
    contractAddress: ContractAddress;
    network?: string;
  },
  NFTsThunkApi
>('nfts/fetchNFTCollection', async ({ contractAddress }, thunkApi) => {
  const response = (await getJson({
    url: getAlchemyUpiUrl('getNFTMetadata', 'testnet'),
    data: {
      contractAddress,
    },
  })) as AlchemyGetNFTsResponse;

  if (response) {
    return {
      content: 'test',
      fetching: false,
      error: undefined,
    };
  } else {
    return thunkApi.rejectWithValue({
      type: 'global',
      message: 'Unable to fetch NFTs',
    });
  }
});

export const resetNFTs = createAction<void>('nfts/resetNFTs');
export const walletConnected = createAction<void, string>('nfts/walletConnected');
export const walletDisconnected = createAction<void>('nfts/walletDisconnected');

const slice = createSlice({
  name: 'nfts',
  initialState: NFTsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNFTsByAddressLocal.pending, (state, action) => {
      state.nftsByWalletAddressLocal = {
        ...state.nftsByWalletAddressLocal,
        [action.meta.arg.walletAddress]: {
          ...state.nftsByWalletAddressLocal[action.meta.arg.walletAddress],
          fetching: true,
          error: undefined,
        },
      };
    });
    builder.addCase(fetchNFTsByAddressLocal.fulfilled, (state, action) => {
      if (action.payload && action.meta.arg.walletAddress) {
        state.nftsByWalletAddressLocal = {
          ...state.nftsByWalletAddressLocal,
          [action.meta.arg.walletAddress]: {
            content: action.payload.content,
            fetching: false,
            error: undefined,
          },
        };
      }
    });
    builder.addCase(fetchNFTsByAddressLocal.rejected, (state, action) => {
      state.nftsByWalletAddressLocal = {
        ...state.nftsByWalletAddressLocal,
        [action.meta.arg.walletAddress]: {
          fetching: false,
          content: undefined,
          error: action.error.message ?? 'rejected',
        },
      };
    });

    builder.addCase(fetchNFTsByAddress.pending, (state, action) => {
      state.nftsByWalletAddress = {
        ...state.nftsByWalletAddress,
        [action.meta.arg.walletAddress]: {
          ...state.nftsByWalletAddress[action.meta.arg.walletAddress],
          fetching: true,
          error: undefined,
        },
      };
    });
    builder.addCase(fetchNFTsByAddress.fulfilled, (state, action) => {
      if (action.payload && action.meta.arg.walletAddress) {
        state.nftsByWalletAddress = {
          ...state.nftsByWalletAddress,
          [action.meta.arg.walletAddress]: {
            content: action.payload.content,
            fetching: false,
            error: undefined,
          },
        };
      }
    });
    builder.addCase(fetchNFTsByAddress.rejected, (state, action) => {
      state.nftsByWalletAddress = {
        ...state.nftsByWalletAddress,
        [action.meta.arg.walletAddress]: {
          fetching: false,
          content: undefined,
          error: action.error.message ?? 'rejected',
        },
      };
    });

    builder.addCase(fetchNFTCollection.pending, (state, action) => {
      state.nftCollections = {
        ...state.nftCollections,
        [action.meta.arg.contractAddress]: {
          ...state.nftCollections[action.meta.arg.contractAddress],
          fetching: true,
          error: undefined,
        },
      };
    });
    builder.addCase(fetchNFTCollection.fulfilled, (state, action) => {
      if (action.payload && action.meta.arg.contractAddress) {
        state.nftCollections = {
          ...state.nftCollections,
          [action.meta.arg.contractAddress]: {
            content: action.payload.content,
            fetching: false,
            error: undefined,
          },
        };
      }
    });
    builder.addCase(fetchNFTCollection.rejected, (state, action) => {
      state.nftCollections = {
        ...state.nftCollections,
        [action.meta.arg.contractAddress]: {
          fetching: false,
          content: 'rejected',
          error: action.error.message ?? 'rejected',
        },
      };
    });

    builder.addCase(resetNFTs, (state) => {
      state.nftsByWalletAddress = {};
      state.nftsByWalletAddressLocal = {};
    });
  },
});

export const useNFTsSelector: TypedUseSelectorHook<RootNFTsState> = useSelector;

export const selectors = {
  nftsByWalletAddress: (s: RootNFTsState) => s.nfts.nftsByWalletAddress,
  nftCollections: (s: RootNFTsState) => s.nfts.nftCollections,
};

export const useNFTsByWalletAddress = (walletAddress: WalletAddress) => {
  return useNFTsSelector(selectors.nftsByWalletAddress)[walletAddress];
};

export default slice.reducer;
