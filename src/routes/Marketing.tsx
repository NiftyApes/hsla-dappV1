import { lazy } from 'react';
import { Route } from 'react-router-dom';

import MarketingLayout from 'components/layout/Marketing';

const MarketingHome = lazy(() => import('../pages/marketing/Home'));
const MarketingWallet = lazy(() => import('../pages/marketing/Wallet'));

const Marketing = (
  <Route path="/" element={<MarketingLayout />}>
    <Route index element={<MarketingHome />} />
    <Route path="/wallet" element={<MarketingWallet />} />
  </Route>
);

export default Marketing;
