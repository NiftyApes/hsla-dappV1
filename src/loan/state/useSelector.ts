import { useSelector as useRRSelector, TypedUseSelectorHook } from 'react-redux';
import { RootLoansState } from './loans.slice';

export const useSelector: TypedUseSelectorHook<RootLoansState> = useRRSelector;
