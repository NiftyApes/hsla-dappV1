import { Middleware } from 'redux';
import { AppDispatch, RootState } from 'app/store';
import { fetchNFTsByAddress, FetchNFTsResponse, NFT, WalletAddress } from 'nft';
import { fetchLoanOffersByNFT, fetchLoanAuctionByNFT } from './loans.slice';

const loanMiddleware: Middleware = (store) => (next) => (action) => {
  const { dispatch, getState } = store;
  next(action);
  const nextState = getState();

  switch (action.type) {
    case fetchNFTsByAddress.fulfilled:
      processNFTs(dispatch, action.meta.arg.walletAddress, action.payload, nextState);
      break;
  }
};

// When new NFTs are loaded, fetch loan data for each item
function processNFTs(
  dispatch: AppDispatch,
  walletAddress: WalletAddress,
  payload: FetchNFTsResponse,
  nextState: RootState,
) {
  console.log('processNFTs', payload);

  payload?.content?.forEach((nft: NFT) => {
    dispatch(fetchLoanOffersByNFT(nft));
    dispatch(fetchLoanAuctionByNFT(nft));
  });
}

export default loanMiddleware;
