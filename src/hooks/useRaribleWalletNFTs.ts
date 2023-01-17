// https://api.rarible.org/v0.1/items/byOwner?owner=ETHEREUM:0x1d671d1B191323A38490972D58354971E5c1cd2A

import { useEffect, useState } from 'react';
import { logError } from '../logging/logError';

const RARIBLE_API_PATH = 'https://api.rarible.org/v0.1';

const localCache: any = {};

export type IRaribleCollection = {
  contractAddress: string;
  items: [];
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
            if (hash[item.collection]) {
              hash[item.collection].tokens.push(item.id);
              hash[item.collection].itemsCount += 1;
            } else {
              hash[item.collection] = {
                contractAddress: item.collection,
                tokens: [item.id],
                itemsCount: 1,
              };
              unsorted.push(hash[item.collection]);
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
    };

    if (hasCache() && enabled) {
      setItems({ ...localCache[contractAddress] });
    } else {
      fetchData();
    }
  }, [contractAddress]);

  return items;
};
