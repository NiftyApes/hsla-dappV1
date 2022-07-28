import { Middleware } from 'redux';
import { type AppDispatch, type RootState } from 'app/store';
import { fetchNFTsByAddress, resetNFTs, walletConnected, walletDisconnected } from './nfts.slice';
import { WalletAddress } from 'nft/model';

const nftsMiddleware: Middleware = (store) => (next) => (action) => {
  const { dispatch, getState } = store;
  next(action);
  const nextState = getState();

  switch (action.type) {
    case walletConnected:
      handleWalletConnected(dispatch, action.walletAddress, nextState);
      break;

    case walletDisconnected:
      handleWalletDisconnected(dispatch);
      break;
  }
};

function handleWalletConnected(
  dispatch: AppDispatch,
  walletAddress: WalletAddress,
  nextState: RootState,
) {
  if (walletAddress) {
    dispatch(fetchNFTsByAddress({ walletAddress }));
  }
}

function handleWalletDisconnected(dispatch: AppDispatch) {
  dispatch(resetNFTs());
}

export default nftsMiddleware;
