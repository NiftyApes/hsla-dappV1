import { lazy } from 'react';
import { Route } from 'react-router-dom';

import MarketingLayout from 'components/layout/Marketing';

const MarketingHome = lazy(() => import('../pages/marketing/Home'));

const Marketing = (
  <Route path="/" element={<MarketingLayout />}>
    <Route index element={<MarketingHome />} />
  </Route>
);

export default Marketing;
