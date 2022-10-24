/* eslint-disable @typescript-eslint/no-shadow */
import { useState, useEffect } from 'react';
import { useTopCollections } from './useTopCollections';

const RARIBLE_API_PATH = 'https://api.rarible.org/v0.1';

const localCache: any = {};

export const useRaribleCollectionMetadata = ({
  contractAddress,
  throttle = 0,
}: {
  contractAddress?: string;
  throttle?: number;
}) => {
  const [meta, setMeta] = useState<{
    name: string;
    symbol: string;
    image: string;
  }>();

  if (!contractAddress) {
    throw new Error('Contract address is required');
  }
  const { collections } = useTopCollections();

  let image = '/assets/images/img-missing.png';

  const hasCache = () => {
    return Object.prototype.hasOwnProperty.call(localCache, contractAddress);
  };

  const setCache = (val: any) => {
    localCache[contractAddress] = val;
  };

  const collectionMixin = (obj: any) => {
    const existing = collections.find((item) => {
      return item.address.toLowerCase() === contractAddress.toLowerCase();
    });
    return existing || obj;
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${RARIBLE_API_PATH}/collections/ETHEREUM:${contractAddress}`,
        {
          method: 'GET',
        },
      );

      response
        .json()
        .then((data) => {
          const { name, symbol, meta } = data;

          if (meta.content && meta.content.length > 0) {
            image = meta.content.find(
              (item: any) => item['@type'] === 'IMAGE',
            ).url;
          }

          const result: any = collectionMixin({ name, symbol, image });
          setCache(result);
          setMeta({ ...result });
        })
        .catch(() => {
          setMeta(
            collectionMixin({
              name: 'NOT FOUND',
              symbol: 'NOTFOUND',
              image: '/assets/images/NA-BLACK.png',
            }),
          );
        });
    };

    if (hasCache()) {
      setMeta({ ...localCache[contractAddress] });
    } else {
      // Throttle Rarible API requests to avoid 429
      setTimeout(fetchData, throttle);
    }
  }, [contractAddress]);

  return { ...meta };
};
