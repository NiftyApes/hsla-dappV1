import { useEffect, useState } from 'react';
import { useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';

export const useTopNiftyApesCollections = () => {
  const [data, setData] = useState<any>();

  const cacheCounter = useAppSelector((state: RootState) => state.counter);
  useEffect(() => {
    setData([
      {
        name: 'Collection',
        highestPrincipal: '123',
        lowestApr: '0.023%',
        duration: '30 days',
        numberOfOffers: '23',
        totalLiquidity: '123',
      },
      {
        name: 'Collection',
        highestPrincipal: '123',
        lowestApr: '0.023%',
        duration: '30 days',
        numberOfOffers: '23',
        totalLiquidity: '123',
      },
      {
        name: 'Collection',
        highestPrincipal: '123',
        lowestApr: '0.023%',
        duration: '30 days',
        numberOfOffers: '23',
        totalLiquidity: '123',
      },
      {
        name: 'Collection',
        highestPrincipal: '123',
        lowestApr: '0.023%',
        duration: '30 days',
        numberOfOffers: '23',
        totalLiquidity: '123',
      },
      {
        name: 'Collection',
        highestPrincipal: '123',
        lowestApr: '0.023%',
        duration: '30 days',
        numberOfOffers: '23',
        totalLiquidity: '123',
      },
    ]);
  }, [cacheCounter]);

  return data;
};
