import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import DefaultLayout from '../components/layout/Default';

type Props = {};

const Home = lazy(() => import('../pages/Home'));

const Marketing: React.FC<Props> = () => {
  return (
    <DefaultLayout>
      <Suspense fallback={<>Loading...</>}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
    </DefaultLayout>
  );
};

export default Marketing;
