import ReactGA from 'react-ga';

export const useAnalyticsEventTracker = (category: string) => {
  const eventTracker = (action: string, label: string) => {
    console.log('EVENT TRACKED: ', { category, action, label });
    ReactGA.event({ category, action, label });
  };
  return eventTracker;
};
