/* eslint-disable consistent-return */
/* eslint-disable no-prototype-builtins */
import { logError } from 'logging/logError';
import { useEffect, useState } from 'react';

export const RARIBLE_API_PATH = 'https://api.rarible.org/v0.1';

const localCache: any = {};

export const useRaribleCollectionStats = ({
  enabled = true,
  contractAddress,
  throttle = 0,
}: {
  enabled?: boolean;
  contractAddress?: string;
  throttle?: number;
}) => {
  const [meta, setMeta] = useState<{
    floorPrice: number;
    highestSale: number;
    items: number;
    marketCap: number;
    owners: number;
    volume: number;
  }>();

  if (!contractAddress) {
    throw new Error('Contract address is required');
  }
  const hasCache = () => {
    return localCache.hasOwnProperty(contractAddress);
  };

  const setCache = (val: any) => {
    localCache[contractAddress] = val;
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${RARIBLE_API_PATH}/data/collections/ETHEREUM:${contractAddress}/stats?currency=ETH`,
        {
          method: 'GET',
        },
      );

      response
        .json()
        .then((result) => {
          setMeta({ ...result });
          setCache(result);
        })
        .catch((err) => {
          logError(err);
          throw err;
        });
    };

    if (enabled) {
      if (hasCache()) {
        return setMeta({ ...localCache[contractAddress] });
      }

      // Throttle Rarible API requests to avoid 429
      setTimeout(() => fetchData(), throttle);
    }
  }, [contractAddress]);

  return { ...meta };
};
