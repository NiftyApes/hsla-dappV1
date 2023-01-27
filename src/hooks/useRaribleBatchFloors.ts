import { useEffect, useState } from 'react';
import { IWalletCollection } from '../constants/types';

export const RARIBLE_API_PATH = 'https://api.rarible.org/v0.1';

export const useRaribleFloorBatch = ({
  list,
  enabled = false,
}: {
  enabled: boolean;
  list: IWalletCollection[];
}) => {
  const [hydrated, setHydrated] = useState<IWalletCollection[]>([]);

  useEffect(() => {
    list.forEach((item, idx) => {
      setTimeout(() => {
        fetch(
          `${RARIBLE_API_PATH}/data/collections/ETHEREUM:${item.contractAddress}/stats?currency=ETH`,
          {
            method: 'GET',
          },
        )
          .then((response) => response.json())
          .then(({ floorPrice }) => {
            setHydrated((prev) => {
              return [...prev, ...[{ ...item, floorPrice }]];
            });
          });
      }, 120 * idx);
    });
  }, [enabled]);

  return { hydrated };
};
