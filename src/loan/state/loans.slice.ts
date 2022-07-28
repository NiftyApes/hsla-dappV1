import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { AppDispatch, ThunkExtra } from 'app/store';
import { LoanOffer, LoanAuction, loanOffer, loanAuction } from '../model';
import { ContractAddress, getNFTHash, NFT, WalletAddress } from 'nft/model';
import { getData, getApiUrl } from 'helpers';
import { getLoanOfferFromHash } from 'helpers/getLoanOfferFromHash';

export type LoansState = {
  loanOffersByNFT: Record<ContractAddress, FetchLoanOffersResponse>;
  loanAuctionByNFT: Record<ContractAddress, FetchLoanAuctionResponse>;
  loanOffersByWalletAddress: Record<ContractAddress, FetchLoanOffersResponse>;
};

export const NFTsInitialState: LoansState = {
  loanOffersByNFT: {},
  loanAuctionByNFT: {},
  loanOffersByWalletAddress: {},
};

export type RootLoansState = {
  loans: LoansState;
};

type LoansThunkApi = {
  state: RootLoansState;
  dispatch: AppDispatch;
  extra: () => ThunkExtra;
};

export type FetchLoanOffersResponse = {
  content: Array<LoanOffer> | undefined;
  error?: string;
  fetching: boolean;
};

export type FetchLoanAuctionResponse = {
  content: LoanAuction | undefined;
  error?: string;
  fetching: boolean;
};

export const fetchLoanOffersByNFT = createAsyncThunk<FetchLoanOffersResponse, NFT, LoansThunkApi>(
  'loans/fetchLoanOffersByNFT',
  async ({ id: nftId, contractAddress: nftContractAddress }, thunkApi) => {
    const { niftyApesContract } = thunkApi.extra();

    if (!niftyApesContract) {
      return thunkApi.rejectWithValue({
        type: 'global',
        message: 'NiftyApes contract is not available',
      });
    }

    const data = await getData<LoanOffer>(
      {
        url: getApiUrl('offers'),
        data: {
          nftContractAddress,
        },
      },
      (json) => loanOffer(json),
    );

    const processedOffers = await Promise.all(
      data.Items.map(async (offer) => {
        if (offer.OfferTerms.NftId === nftId || offer.OfferTerms.FloorTerm) {
          const offerFromChain = await getLoanOfferFromHash({
            niftyApesContract,
            nftContractAddress,
            nftId,
            offerHash: offer.OfferHash,
            floorTerm: offer.OfferTerms.FloorTerm,
          });

          if (offerFromChain?.creator !== '0x0000000000000000000000000000000000000000') {
            return true;
          }
        }
      }),
    ).then((results) => data.Items.filter((offer, i) => results[i]));

    return {
      content: processedOffers,
      fetching: false,
      error: undefined,
    };
  },
);

export const fetchLoanAuctionByNFT = createAsyncThunk<FetchLoanAuctionResponse, NFT, LoansThunkApi>(
  'loans/fetchLoanAuctionByNFT',
  async ({ id: nftId, contractAddress: nftContractAddress }, thunkApi) => {
    const { niftyApesContract } = thunkApi.extra();

    if (!niftyApesContract) {
      return thunkApi.rejectWithValue({
        type: 'global',
        message: 'NiftyApes contract is not available',
      });
    }

    const result = await niftyApesContract.getLoanAuction(nftContractAddress, nftId);

    return {
      content: loanAuction(result),
      fetching: false,
      error: undefined,
    };
  },
);

export type RepayLoanByBorrowerResponse = {
  error?: string;
  fetching: boolean;
  success: boolean;
};

export const repayLoanByBorrower = createAsyncThunk<
  RepayLoanByBorrowerResponse | undefined,
  {
    walletAddress: string;
  }
>('loans/repayLoanByBorrower', async (args) => {
  // const temp = args.walletAddress;
  return {
    content: undefined,
    fetching: false,
    success: true,
  };
});

const slice = createSlice({
  name: 'nfts',
  initialState: NFTsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLoanOffersByNFT.fulfilled, (state, action) => {
      state.loanOffersByNFT = {
        ...state.loanOffersByNFT,
        [getNFTHash(action.meta.arg)]: action.payload,
      };
    });
    builder.addCase(fetchLoanOffersByNFT.pending, (state, action) => {
      const nftHash = getNFTHash(action.meta.arg);
      state.loanOffersByNFT = {
        ...state.loanOffersByNFT,
        [nftHash]: {
          ...state.loanOffersByNFT[nftHash],
          fetching: true,
          error: undefined,
        },
      };
    });
    builder.addCase(fetchLoanOffersByNFT.rejected, (state, action) => {
      const nftHash = getNFTHash(action.meta.arg);
      state.loanOffersByNFT = {
        ...state.loanOffersByNFT,
        [nftHash]: {
          ...state.loanOffersByNFT[nftHash],
          fetching: false,
          error: action.error.message,
        },
      };
    });
    builder.addCase(fetchLoanAuctionByNFT.fulfilled, (state, action) => {
      state.loanAuctionByNFT = {
        ...state.loanAuctionByNFT,
        [getNFTHash(action.meta.arg)]: action.payload,
      };
    });
    builder.addCase(fetchLoanAuctionByNFT.pending, (state, action) => {
      const nftHash = getNFTHash(action.meta.arg);
      state.loanAuctionByNFT = {
        ...state.loanAuctionByNFT,
        [nftHash]: {
          ...state.loanAuctionByNFT[nftHash],
          fetching: true,
          error: undefined,
        },
      };
    });
    builder.addCase(fetchLoanAuctionByNFT.rejected, (state, action) => {
      const nftHash = getNFTHash(action.meta.arg);
      state.loanAuctionByNFT = {
        ...state.loanAuctionByNFT,
        [nftHash]: {
          ...state.loanAuctionByNFT[nftHash],
          fetching: false,
          error: action.error.message,
        },
      };
    });
  },
});

export const useLoansSelector: TypedUseSelectorHook<RootLoansState> = useSelector;

export const selectors = {
  loanAuctionsByNFT: (s: RootLoansState) => s.loans?.loanAuctionByNFT,
  loanOffersByNFT: (s: RootLoansState) => s.loans?.loanOffersByNFT,
  loanOffersByWalletAddress: (s: RootLoansState) => s.loans?.loanOffersByWalletAddress,
};

export const useLoanAuctionByNFT = (nft: NFT) => {
  return useLoansSelector(selectors.loanAuctionsByNFT)[getNFTHash(nft)] || {};
};

export const useLoanOffersByNFT = (nft: NFT) => {
  return useLoansSelector(selectors.loanOffersByNFT)[getNFTHash(nft)] || {};
};

export const useLoanOffersByWalletAddress = (walletAddress: WalletAddress) => {
  return useLoansSelector(selectors.loanOffersByWalletAddress)[walletAddress] || {};
};

export default slice.reducer;
