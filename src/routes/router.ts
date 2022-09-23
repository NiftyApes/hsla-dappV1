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

export const borrowersId = (id: string) => {
  return path([ROUTE_BORROWERS, id]);
};

export const borrowersIdDashboard = (id: string) => {
  return path([ROUTE_BORROWERS, id, ROUTE_BORROWERS_DASHBOARD]);
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

export const lendersId = (id: string) => {
  return path([ROUTE_LENDERS, id]);
};

export const lendersIdDashboard = (id: string) => {
  return path([ROUTE_LENDERS, id, ROUTE_BORROWERS_DASHBOARD]);
};

export const lendersIdLiquidity = (id: string) => {
  return path([ROUTE_LENDERS, id, ROUTE_LENDERS_LIQUIDITY]);
};

export const lendersIdOffers = (id: string) => {
  return path([ROUTE_LENDERS, id, ROUTE_LENDERS_OFFERS]);
};

export const lendersIdLend = (id: string) => {
  return path([ROUTE_LENDERS, ROUTE_LENDERS_LEND]);
};
