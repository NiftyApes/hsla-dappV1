import { path } from './util';

export const ROUTE_BORROWERS = 'borrowers';
export const ROUTE_BORROWERS_DASHBOARD = 'dashboard';
export const ROUTE_LENDERS = 'lenders';

export const home = () => {
  return path([]);
};

export const borrowers = () => {
  return path([ROUTE_BORROWERS]);
};

export const lenders = () => {
  return path([ROUTE_LENDERS]);
};
