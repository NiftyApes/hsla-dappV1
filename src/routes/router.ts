import { path } from './util';

export const home = () => {
  return path([]);
};

// borrowers

export const ROUTE_BORROWERS = 'borrowers';
export const ROUTE_BORROWERS_DASHBOARD = 'dashboard';

export const borrowers = () => {
  return path([ROUTE_BORROWERS]);
};

export const borrowersId = () => {
  return path([ROUTE_BORROWERS]);
};

export const borrowersIdDashboard = () => {
  return path([ROUTE_BORROWERS, ROUTE_BORROWERS_DASHBOARD]);
};

// lenders

export const ROUTE_LENDERS = 'lenders';
export const ROUTE_LENDERS_DASHBOARD = 'dashboard';
export const ROUTE_LENDERS_LIQUIDITY = 'liquidity';
export const ROUTE_LENDERS_OFFERS = 'offers';
export const ROUTE_LENDERS_LEND = 'lend';

export const lenders = () => {
  return path([ROUTE_LENDERS]);
};

export const lendersId = () => {
  return path([ROUTE_LENDERS]);
};

export const lendersIdDashboard = () => {
  return path([ROUTE_LENDERS, ROUTE_BORROWERS_DASHBOARD]);
};

export const lendersIdLiquidity = () => {
  return path([ROUTE_LENDERS, ROUTE_LENDERS_LIQUIDITY]);
};

export const lendersIdOffers = () => {
  return path([ROUTE_LENDERS, ROUTE_LENDERS_OFFERS]);
};

export const lendersIdLend = () => {
  return path([ROUTE_LENDERS, ROUTE_LENDERS_LEND]);
};
