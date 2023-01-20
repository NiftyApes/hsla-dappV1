// https://api.rarible.org/v0.1/items/byOwner?owner=ETHEREUM:0x1d671d1B191323A38490972D58354971E5c1cd2A

import { useEffect, useState } from 'react';
import { logError } from '../logging/logError';

const RARIBLE_API_PATH = 'https://api.rarible.org/v0.1';

const localCache: any = {};

export type IRaribleCollection = {
  contractAddress: string;
  tokens: [];
  itemsCount: number;
};

export const useRaribleWalletNFTs = ({
  contractAddress,
  enabled = true,
}: {
  contractAddress?: string;
  enabled?: boolean;
}) => {
  if (!contractAddress) {
    throw new Error('Contract address is required');
  }

  const [items, setItems] = useState<IRaribleCollection[]>([]);
  const [loading, setLoading] = useState(false);

  const hasCache = () => {
    return Object.prototype.hasOwnProperty.call(localCache, contractAddress);
  };

  const setCache = (val: any) => {
    localCache[contractAddress] = val;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!contractAddress) {
        return;
      }

      const response = await fetch(
        `${RARIBLE_API_PATH}/items/byOwner?owner=ETHEREUM:${contractAddress}&blockchains=ETHEREUM`,
        {
          method: 'GET',
        },
      );

      response
        .json()
        .then((data) => {
          const unsorted = <any>[];
          const hash: any = {};

          data.items.forEach((item: any) => {
            const collectionAddress: string = item.collection.replace(
              'ETHEREUM:',
              '',
            );

            if (hash[collectionAddress]) {
              hash[collectionAddress].tokens.push(item.id);
              hash[collectionAddress].itemsCount += 1;
            } else {
              hash[collectionAddress] = {
                contractAddress: collectionAddress,
                tokens: [item.id],
                itemsCount: 1,
              };
              unsorted.push(hash[collectionAddress]);
            }
          });

          const sorted = unsorted.sort(
            (a: any, b: any) => b.itemsCount - a.itemsCount,
          );
          setCache(sorted);
          setItems(sorted);
        })
        .catch((e) => {
          logError(e);
        });
      setLoading(false);
    };

    if (hasCache() && enabled) {
      setItems({ ...localCache[contractAddress] });
    } else {
      fetchData();
    }
  }, [contractAddress]);

  return { items, loading };
};
