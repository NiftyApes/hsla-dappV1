import { lazy } from 'react';
import { Route } from 'react-router-dom';

import LendersLayout from 'components/layout/Lenders';
import { lenders, ROUTE_LENDERS_DASHBOARD, ROUTE_LENDERS_LEND } from './router';

const LendersHome = lazy(() => import('../pages/lenders/Home'));
const Dashboard = lazy(() => import('../pages/lenders/Dashboard'));
const Lend = lazy(() => import('../pages/lenders/Lend'));

const Lenders = (
  <Route path={lenders()} element={<LendersLayout />}>
    <Route path=":id" element={<LendersHome />} />
    <Route path={`:id/${ROUTE_LENDERS_DASHBOARD}`} element={<Dashboard />} />
    <Route path={`:id/${ROUTE_LENDERS_LEND}`} element={<Lend />} />
  </Route>
);

export default Lenders;
