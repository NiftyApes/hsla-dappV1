import {
  useSelector as useRRSelector,
  TypedUseSelectorHook,
} from 'react-redux';
import { RootNFTsState } from './nfts.slice';

export const useSelector: TypedUseSelectorHook<RootNFTsState> = useRRSelector;
