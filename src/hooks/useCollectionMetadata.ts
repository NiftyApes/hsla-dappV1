import { useState, useEffect } from 'react';
import { useTopCollections } from './useTopCollections';

const RARIBLE_API_PATH = 'https://api.rarible.org/v0.1';

export const useCollectionMetadata = ({ nftContractAddress }: { nftContractAddress?: string }) => {
  const [meta, setMeta] = useState<{ name: string; symbol: string; image: string }>();
  const { collections } = useTopCollections();

  let image = '/assets/images/img-missing.png';

  const collectionMixin = (obj: any) => {
    const existing = collections.find((item) => item.address === nftContractAddress);
    return existing ? { ...obj, ...existing } : obj;
  };

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

          if (meta.content && meta.content.length > 0) {
            image = meta.content.find((item: any) => item['@type'] === 'IMAGE').url;
          }
          setMeta(collectionMixin({ name, symbol, image }));
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
