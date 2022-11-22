import ReactGA from 'react-ga4';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useRouteChangeTracker = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.set({ page: location.pathname });
    ReactGA.send({ hitType: 'pageview', path: location.pathname });
  }, [location.pathname]);
};
