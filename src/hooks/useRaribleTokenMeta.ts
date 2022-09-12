import { useState, useEffect } from 'react';

const RARIBLE_API_PATH = 'https://api.rarible.org/v0.1';

export const useRaribleTokenMeta = ({
  nftContractAddress,
  tokenId,
}: {
  nftContractAddress?: string;
  tokenId?: string;
}) => {
  const [meta, setMeta] = useState<{ name: string; description: string; image: string }>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${RARIBLE_API_PATH}/items/ETHEREUM:${nftContractAddress}:${tokenId}`,
        {
          method: 'GET',
        },
      );

      response
        .json()
        .then((data) => {
          const { name, description, content } = data.meta;
          let image = '/assets/images/img-missing.png';

          if (content && content.length > 0) {
            image = content.find((item: any) => item['@type'] === 'IMAGE').url;
          }

          setMeta({ name, description, image });
        })
        .catch((error) => {
          setMeta({
            name: 'NOT FOUND',
            description: 'NOTFOUND',
            image: '/assets/images/NA-BLACK.png',
          });
        });
    };
    fetchData();
  }, [nftContractAddress, tokenId]);

  return { ...meta };
};
