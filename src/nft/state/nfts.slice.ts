/* eslint-disable no-param-reassign, no-await-in-loop */
/* tslint:disable no-use-before-define */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, ThunkExtra } from 'app/store';
import { getLocalNFTsOfAddress } from 'helpers/getLocalNFTsOfAddress';
import { RARIBLE_API_PATH } from 'hooks/useRaribleColectionStats';
import { fetchLoanAuctionByNFT, fetchLoanOffersByNFT } from 'loan';
import _ from 'lodash';
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

const cachedCollectionStats: any = {};

export const fetchLocalNFTsByWalletAddress = createAsyncThunk<
  FetchNFTsResponse | undefined,
  {
    walletAddress: WalletAddress;
    contract: Contract;
  },
  NFTsThunkApi
>(
  'nfts/fetchLocalNFTsByWalletAddress',
  async ({ walletAddress, contract }, thunkApi) => {
    const { lendingContract } = thunkApi.extra();

    if (lendingContract) {
      const nfts = await getLocalNFTsOfAddress({
        walletAddress,
        contract,
        lendingContract,
      });

      const nftsWithChainId: Array<NFT & { chainId: string }> | undefined =
        nfts?.map((nft: NFT) => ({
          ...nft,
          chainId: '0x7a69',
        }));

      if (nftsWithChainId) {
        nftsWithChainId.forEach((nft) =>
          thunkApi.dispatch(fetchLoanOffersByNFT(nft)),
        );
        nftsWithChainId.forEach((nft) =>
          thunkApi.dispatch(fetchLoanAuctionByNFT(nft)),
        );

        return {
          content: nfts,
          fetching: false,
          error: undefined,
        };
      }
      return thunkApi.rejectWithValue({
        type: 'global',
        message: 'Unable to fetch NFTs',
      });
    }
    return thunkApi.rejectWithValue({
      type: 'global',
      message: 'NiftyApes contract is undefined',
    });
  },
);

export const loadMainnetNFTs = createAsyncThunk<
  FetchNFTsResponse | undefined,
  {
    walletAddress: WalletAddress;
    nfts: any;
  },
  NFTsThunkApi
>('nfts/loadNFTs', async ({ walletAddress, nfts }, thunkApi) => {
  const { lendingContract } = thunkApi.extra();

  for (let i = 0; i < nfts.length; i++) {
    const nft = nfts[i];
    if (cachedCollectionStats[nft.contract.address] === undefined) {
      const response = await fetch(
        `${RARIBLE_API_PATH}/data/collections/ETHEREUM:${nft.contract.address}/stats?currency=ETH`,
        {
          method: 'GET',
        },
      );

      await new Promise((resolve) => {
        setTimeout(resolve, 25);
      });

      cachedCollectionStats[nft.contract.address] = await response.json();
    }

    if (cachedCollectionStats[nft.contract.address].volume < 1) {
      nfts[i] = undefined;
    } else {
      nfts[i] = {
        ...nft,
        id:
          nft.contractMetadata?.name === 'OpenSea Shared Storefront'
            ? ''
            : String(Number(nft.id?.tokenId)),
        contractAddress: nft.contract?.address,
        image:
          (nft.media?.length && nft.media[0]?.gateway) ||
          nft.metadata?.image_url ||
          nft.metadata?.image_data,
        name: '',
        collectionName:
          nft.contractMetadata?.name === 'OpenSea Shared Storefront'
            ? nft.metadata?.name
            : nft.contractMetadata?.name,
        chainId: '0x1',
      };
      // eslint-disable-next-line
      thunkApi.dispatch(addNft({ nft: nfts[i], walletAddress }));
      thunkApi.dispatch(fetchLoanOffersByNFT(nfts[i]));
      thunkApi.dispatch(fetchLoanAuctionByNFT(nfts[i]));
    }
  }

  nfts = _.compact(nfts);

  if (lendingContract) {
    if (nfts) {
      return {
        content: undefined,
        fetching: false,
        error: undefined,
      };
    }
    return thunkApi.rejectWithValue({
      type: 'global',
      message: 'Unable to fetch NFTs',
    });
  }
  return thunkApi.rejectWithValue({
    type: 'global',
    message: 'NiftyApes contract is undefined',
  });
});

export const loadGoerliNFTs = createAsyncThunk<
  FetchNFTsResponse | undefined,
  {
    walletAddress: WalletAddress;
    nfts: any;
  },
  NFTsThunkApi
>('nfts/loadNFTs', async ({ nfts }, thunkApi) => {
  const { lendingContract } = thunkApi.extra();

  nfts = nfts.map((nft: any) => ({
    ...nft,
    id: String(Number(nft.id?.tokenId)),
    contractAddress: nft.contract?.address,
    image: nft.media?.length && nft.media[0]?.gateway,
    name: '',
    collectionName: nft.contractMetadata?.name,
    chainId: '0x5',
  }));

  if (lendingContract) {
    if (nfts) {
      nfts.forEach((nft: any) => thunkApi.dispatch(fetchLoanOffersByNFT(nft)));
      nfts.forEach((nft: any) => thunkApi.dispatch(fetchLoanAuctionByNFT(nft)));

      return {
        content: nfts,
        fetching: false,
        error: undefined,
      };
    }
    return thunkApi.rejectWithValue({
      type: 'global',
      message: 'Unable to fetch NFTs',
    });
  }
  return thunkApi.rejectWithValue({
    type: 'global',
    message: 'NiftyApes contract is undefined',
  });
});

const slice = createSlice({
  name: 'nfts',
  initialState: NFTsInitialState,
  reducers: {
    resetNFTsByWalletAddress(state) {
      state.nftsByWalletAddress = {};
    },
    addNft(state, action) {
      if (!state.nftsByWalletAddress[action.payload.walletAddress].content) {
        state.nftsByWalletAddress[action.payload.walletAddress].content = [];
      }

      state.nftsByWalletAddress[action.payload.walletAddress].content?.push(
        action.payload.nft,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLocalNFTsByWalletAddress.pending, (state, action) => {
      state.nftsByWalletAddress = {
        ...state.nftsByWalletAddress,
        [action.meta.arg.walletAddress]: {
          ...state.nftsByWalletAddress[action.meta.arg.walletAddress],
          fetching: true,
          error: undefined,
        },
      };
    });
    builder.addCase(
      fetchLocalNFTsByWalletAddress.fulfilled,
      (state, action) => {
        if (action.payload && action.meta.arg.walletAddress) {
          if (
            !state.nftsByWalletAddress[action.meta.arg.walletAddress].content
          ) {
            state.nftsByWalletAddress[action.meta.arg.walletAddress].content =
              [];
          }

          if (action.payload.content) {
            state.nftsByWalletAddress[
              action.meta.arg.walletAddress
            ].content?.push(...action.payload.content);
          }

          state.nftsByWalletAddress[action.meta.arg.walletAddress].fetching =
            false;
          state.nftsByWalletAddress[action.meta.arg.walletAddress].error =
            undefined;
        }
      },
    );
    builder.addCase(fetchLocalNFTsByWalletAddress.rejected, (state, action) => {
      state.nftsByWalletAddress = {
        ...state.nftsByWalletAddress,
        [action.meta.arg.walletAddress]: {
          content: undefined,
          fetching: false,
          error: action.error.message ?? 'rejected',
        },
      };
    });
    builder.addCase(loadMainnetNFTs.pending, (state, action) => {
      state.nftsByWalletAddress = {
        ...state.nftsByWalletAddress,
        [action.meta.arg.walletAddress]: {
          ...state.nftsByWalletAddress[action.meta.arg.walletAddress],
          fetching: true,
          error: undefined,
        },
      };
    });
    builder.addCase(loadMainnetNFTs.fulfilled, (state, action) => {
      if (action.payload && action.meta.arg.walletAddress) {
        if (!state.nftsByWalletAddress[action.meta.arg.walletAddress].content) {
          state.nftsByWalletAddress[action.meta.arg.walletAddress].content = [];
        }

        if (action.payload.content) {
          state.nftsByWalletAddress[action.meta.arg.walletAddress].content =
            action.payload.content;
        }

        state.nftsByWalletAddress[action.meta.arg.walletAddress].fetching =
          false;
        state.nftsByWalletAddress[action.meta.arg.walletAddress].error =
          undefined;
      }
    });
    builder.addCase(loadMainnetNFTs.rejected, (state, action) => {
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

export const { resetNFTsByWalletAddress, addNft } = slice.actions;

export default slice.reducer;
