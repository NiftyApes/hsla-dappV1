// https://api.rarible.org/v0.1/items/byOwner?owner=ETHEREUM:0x1d671d1B191323A38490972D58354971E5c1cd2A

import { useEffect, useState } from 'react';
import { logError } from '../logging/logError';

const RARIBLE_API_PATH = 'https://api.rarible.org/v0.1';

export const useRaribleWalletNFTs = ({
  contractAddress,
  enabled = true,
}: {
  contractAddress?: string;
  enabled?: boolean;
}) => {
  const [items, setItems] = useState<any>();

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
          const hash: any = {};

          data.items.forEach((item: any) => {
            if (hash[item.collection]) {
              hash[item.collection].nfts.push(item.id);
              hash[item.collection].count += 1;
            } else {
              hash[item.collection] = {
                contractAddress: item.collection,
                nfts: [item.id],
                count: 1,
              };
            }
          });

          const unsorted = [];

          for (const [key, val] in Object.entries(hash)) {
            unsorted.push(hash[key]);
          }
          const sorted = unsorted.sort((a: any, b: any) => {
            return a.count - b.count;
          });
          setItems(sorted);
        })
        .catch((e) => {
          logError(e);
        });
    };
    if (enabled) {
      fetchData();
    }
  }, [contractAddress]);

  return items;
};
