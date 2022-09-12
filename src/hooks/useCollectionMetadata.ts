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

          let image = '/assets/images/img-missing.png';

          if (meta.content && meta.content.length > 0) {
            image = meta.content.find((item: any) => item['@type'] === 'IMAGE').url;
          }
          setMeta({ name, symbol, image });
        })
        .catch((error) => {
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
