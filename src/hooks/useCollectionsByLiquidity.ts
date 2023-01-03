import { useEffect, useState } from 'react';
import { useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';

export const useTopNiftyApesCollections = () => {
  const [data, setData] = useState<any>();

  const cacheCounter = useAppSelector((state: RootState) => state.counter);
  useEffect(() => {
    setData([
      {
        address: '0x39ee2c7b3cb80254225884ca001F57118C8f21B6',
        highestPrincipal: '123',
        lowestApr: '0.023%',
        duration: '30 days',
        numberOfOffers: '23',
        totalLiquidity: '123',
      },
      {
        address: '0x3db5463a9e2d04334192c6f2dd4b72def4751a61',
        highestPrincipal: '123',
        lowestApr: '0.023%',
        duration: '30 days',
        numberOfOffers: '23',
        totalLiquidity: '123',
      },
      {
        address: '0xb4d06d46a8285f4ec79fd294f78a881799d8ced9',
        highestPrincipal: '123',
        lowestApr: '0.023%',
        duration: '30 days',
        numberOfOffers: '23',
        totalLiquidity: '123',
      },
      {
        address: '0xe43d741e21d8bf30545a88c46e4ff5681518ebad',
        highestPrincipal: '123',
        lowestApr: '0.023%',
        duration: '30 days',
        numberOfOffers: '23',
        totalLiquidity: '123',
      },
      {
        address: '0x6b00de202e3cd03c523ca05d8b47231dbdd9142b',
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
