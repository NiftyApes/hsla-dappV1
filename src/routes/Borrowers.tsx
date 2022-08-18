import { lazy } from 'react';
import { Route } from 'react-router-dom';

import BorrowersLayout from 'components/layout/Borrowers';
import { borrowers, ROUTE_BORROWERS_DASHBOARD, ROUTE_BORROWERS_OFFERS } from './router';

import Offers from '../pages/borrowers/Offers';

const BorrowersHome = lazy(() => import('../pages/borrowers/Home'));
const DisconnectedView = lazy(() => import('../pages/borrowers/DisconnectedView'));
const Dashboard = lazy(() => import('../pages/borrowers/Dashboard'));

const Borrowers = (
  <Route path={borrowers()} element={<BorrowersLayout />}>
    <Route index element={<DisconnectedView />} />
    <Route path=":id" element={<BorrowersHome />} />
    <Route path={`:id/${ROUTE_BORROWERS_OFFERS}`} element={<Offers />} />
    <Route path={`:id/${ROUTE_BORROWERS_DASHBOARD}`} element={<Dashboard />} />
  </Route>
);

export default Borrowers;
