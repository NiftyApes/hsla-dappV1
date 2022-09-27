import { lazy } from 'react';
import { Route } from 'react-router-dom';

import LendersLayout from 'components/layout/Lenders';
import {
  lenders,
  ROUTE_LENDERS_DASHBOARD,
  ROUTE_LENDERS_LEND,
  ROUTE_LENDERS_LIQUIDITY,
  ROUTE_LENDERS_OFFERS,
} from './router';

const LendersHome = lazy(() => import('../pages/lenders/Home'));
const Dashboard = lazy(() => import('../pages/lenders/Dashboard'));
// const Lend = lazy(() => import('../pages/lenders/Lend'));
const LendCollections = lazy(() => import('../pages/lenders/LendCollections'));
const Liquidity = lazy(() => import('../pages/lenders/Liquidity'));
const Offers = lazy(() => import('../pages/lenders/Offers'));
const CollectionDetailsModal = lazy(
  () => import('../pages/lenders/LendCollections/CollectionDetails'),
);

const Lenders = (
  <Route path={lenders()} element={<LendersLayout />}>
    <Route path="" element={<LendersHome />} />
    <Route path={`${ROUTE_LENDERS_DASHBOARD}`} element={<Dashboard />} />
    <Route path={`${ROUTE_LENDERS_LEND}`} element={<LendCollections />} />
    <Route path={`${ROUTE_LENDERS_LIQUIDITY}`} element={<Liquidity />} />
    <Route path={`${ROUTE_LENDERS_OFFERS}`} element={<Offers />} />
    <Route
      path={`create-collection-offer/:collectionAddress`}
      element={<CollectionDetailsModal />}
    />
  </Route>
);

export default Lenders;
