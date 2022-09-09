import { useState, useEffect } from 'react';

const RARIBLE_API_PATH = 'https://api.rarible.org/v0.1';

export const useCollectionMetadata = ({ nftContractAddress }: { nftContractAddress?: string }) => {
  const [meta, setMeta] = useState<{ name: string; symbol: string; image: string }>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${RARIBLE_API_PATH}/collections/ETHEREUM:${nftContractAddress}`,
        {
          method: 'GET',
        },
      );

      response
        .json()
        .then((data) => {
          const { name, symbol, meta } = data;

          setMeta({
            name,
            symbol,
            image: meta.content[0] ? meta.content[0].url : '/assets/images/img-missing.png',
          });
        })
        .catch((error) => {
          // This might need a bit more error handling
          setMeta({
            name: 'NOT FOUND',
            symbol: 'NOTFOUND',
            image: '/assets/images/NA-BLACK.png',
          });
        });
    };
    fetchData();
  }, [nftContractAddress]);

  return { ...meta };
};
