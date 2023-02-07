import { lazy } from 'react';
import { Route } from 'react-router-dom';

import LendersLayout from 'components/layout/Lenders';
import {
  lenders,
  ROUTE_LENDERS_DASHBOARD,
  ROUTE_LENDERS_LIQUIDITY,
  ROUTE_LENDERS_OFFERS,
} from './router';

const Dashboard = lazy(() => import('../pages/lenders/Dashboard'));
const LendCollections = lazy(() => import('../pages/lenders/LendCollections'));
const Liquidity = lazy(() => import('../pages/lenders/Liquidity'));
const Offers = lazy(() => import('../pages/lenders/Offers'));
const CollectionDetailsModal = lazy(
  () => import('../pages/lenders/LendCollections/CollectionDetails'),
);
const RefinanceLoan = lazy(() => import('../pages/lenders/RefinanceLoan'));

const Lenders = (
  <Route path={lenders()} element={<LendersLayout />}>
    <Route path="" element={<LendCollections />} />
    <Route path={`${ROUTE_LENDERS_DASHBOARD}`} element={<Dashboard />} />
    <Route path={`${ROUTE_LENDERS_LIQUIDITY}`} element={<Liquidity />} />
    <Route path={`${ROUTE_LENDERS_OFFERS}`} element={<Offers />} />
    <Route
      path="create-collection-offer/:collectionAddress"
      element={<CollectionDetailsModal />}
    />
    <Route
      path="refinance-loan/:collectionAddress"
      element={<RefinanceLoan />}
    />
  </Route>
);

export default Lenders;
