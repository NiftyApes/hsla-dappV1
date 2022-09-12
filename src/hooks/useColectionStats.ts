import { useState, useEffect } from 'react';

const RARIBLE_API_PATH = 'https://api.rarible.org/v0.1';

export const useCollectionStats = ({ nftContractAddress }: { nftContractAddress?: string }) => {
  const [meta, setMeta] = useState<{
    floorPrice: number;
    highestSale: number;
    items: number;
    marketCap: number;
    owners: number;
    volume: number;
  }>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${RARIBLE_API_PATH}/data/collections/ETHEREUM:${nftContractAddress}/stats?currency=ETH`,
        {
          method: 'GET',
        },
      );

      response
        .json()
        .then((result) => {
          setMeta({ ...result });
        })
        .catch((err) => {
          console.log('Error', err);
        });
    };
    fetchData();
  }, [nftContractAddress]);

  return { ...meta };
};
