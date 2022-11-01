/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, ThunkExtra } from 'app/store';
import { ethers } from 'ethers';
import { getApiUrl, getData } from 'helpers';
import { getLoanOfferFromHash } from 'helpers/getLoanOfferFromHash';
import { getFloorOfferCountFromHash } from 'helpers/getOfferCountLeftFromHash';
import { ContractAddress, getNFTHash, NFT } from 'nft/model';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { LoanAuction, loanAuction, LoanOffer, loanOffer } from '../model';

export type LoansState = {
  loanOffersByNFT: Record<ContractAddress, FetchLoanOffersResponse>;
  loanAuctionByNFT: Record<ContractAddress, FetchLoanAuctionResponse>;
};

export const NFTsInitialState: LoansState = {
  loanOffersByNFT: {},
  loanAuctionByNFT: {},
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

export const fetchLoanOffersByNFT = createAsyncThunk<
  FetchLoanOffersResponse,
  NFT & { chainId: string },
  LoansThunkApi
>(
  'loans/fetchLoanOffersByNFT',
  async (
    { id: nftId, contractAddress: nftContractAddress, chainId },
    thunkApi,
  ) => {
    const { offersContract, liquidityContract, cEthContract } =
      thunkApi.extra();

    if (!offersContract) {
      return thunkApi.rejectWithValue({
        type: 'global',
        message: 'NiftyApes contract is not available',
      });
    }

    const data = await getData<LoanOffer>(
      {
        url: getApiUrl(chainId, 'offers'),
        data: {
          collection: ethers.utils.getAddress(nftContractAddress),
        },
      },
      (json) => loanOffer(json),
    );

    const processedOffers = await Promise.all(
      data.map(async (offer, i) => {
        if (!liquidityContract || !cEthContract) {
          return false;
        }

        if (offer.OfferTerms.NftId === nftId || offer.OfferTerms.FloorTerm) {
          const floorOfferCount = await getFloorOfferCountFromHash({
            offersContract,
            offerHash: offer.OfferHash,
          });

          if (!floorOfferCount) {
            return false;
          }

          const offerFromChain = await getLoanOfferFromHash({
            offersContract,
            nftContractAddress,
            nftId,
            offerHash: offer.OfferHash,
            floorTerm: offer.OfferTerms.FloorTerm,
          });

          if (!offerFromChain) {
            return false;
          }

          // This happens when there isn't an offer with this hash
          if (
            offerFromChain.creator ===
            '0x0000000000000000000000000000000000000000'
          ) {
            return false;
          }

          // Ignore offers that are out of punches
          if (
            floorOfferCount.toNumber() >=
            offerFromChain.floorTermLimit.toNumber()
          ) {
            return false;
          }

          const lenderLiquidityInCEth =
            await liquidityContract.getCAssetBalance(
              offerFromChain.creator,
              cEthContract.address,
            );

          const exchangeRate = await cEthContract.exchangeRateStored();

          const lenderLiquidityInEth = lenderLiquidityInCEth
            .mul(exchangeRate)
            .div((1e18).toString()); // This doesn't work if you don't toString

          if (offerFromChain.amount.gt(lenderLiquidityInEth)) {
            return false;
          }

          data[i] = {
            ...data[i],
            floorOfferCount: floorOfferCount.toNumber(),
            floorTermLimit: offerFromChain.floorTermLimit.toNumber(),
          };

          return true;
        }
      }),
    ).then((results) => data.filter((offer, j) => results[j]));

    return {
      content: processedOffers,
      fetching: false,
      error: undefined,
    };
  },
);

export const fetchLoanAuctionByNFT = createAsyncThunk<
  FetchLoanAuctionResponse,
  { id: string; contractAddress: string },
  LoansThunkApi
>(
  'loans/fetchLoanAuctionByNFT',
  async ({ id: nftId, contractAddress: nftContractAddress }, thunkApi) => {
    const { lendingContract } = thunkApi.extra();

    if (!lendingContract) {
      return thunkApi.rejectWithValue({
        type: 'global',
        message: 'NiftyApes contract is not available',
      });
    }

    const result = await lendingContract.getLoanAuction(
      nftContractAddress,
      nftId,
    );

    if (result.nftOwner === '0x0000000000000000000000000000000000000000') {
      return thunkApi.rejectWithValue({
        type: 'global',
        message: 'NFT has no loan auction',
      });
    }

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
>('loans/repayLoanByBorrower', async () => {
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
          content: undefined,
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
          content: undefined,
          fetching: false,
          error: action.error.message,
        },
      };
    });
  },
});

export const useLoansSelector: TypedUseSelectorHook<RootLoansState> =
  useSelector;

export const selectors = {
  loanAuctionsByNFT: (s: RootLoansState) => s.loans?.loanAuctionByNFT,
  loanOffersByNFT: (s: RootLoansState) => s.loans?.loanOffersByNFT,
};

export const useLoanAuctionByNFT = (nft: NFT) => {
  return useLoansSelector(selectors.loanAuctionsByNFT)[getNFTHash(nft)] || {};
};

export const useLoanOffersByNFT = (nft: NFT) => {
  return useLoansSelector(selectors.loanOffersByNFT)[getNFTHash(nft)] || {};
};

export default slice.reducer;
