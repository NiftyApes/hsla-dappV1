import { lazy } from 'react';
import { Route } from 'react-router-dom';

import BorrowersLayout from 'components/layout/Borrowers';
import { borrowers, ROUTE_BORROWERS_DASHBOARD } from './router';

const BorrowersHome = lazy(() => import('../pages/borrowers/Home'));
const Dashboard = lazy(() => import('../pages/borrowers/Dashboard'));

const Borrowers = (
  <Route path={borrowers()} element={<BorrowersLayout />}>
    <Route path="" element={<BorrowersHome />} />
    <Route path={`${ROUTE_BORROWERS_DASHBOARD}`} element={<Dashboard />} />
  </Route>
);

export default Borrowers;
