import { useState, useEffect } from 'react';
import { NFT } from '../nft';

const RARIBLE_API_PATH = 'https://api.rarible.org/v0.1';

export const useRaribleTokenMeta = ({
  contractAddress,
  tokenId,
  enabled = true,
}: {
  contractAddress?: string;
  tokenId?: string;
  enabled?: boolean;
}) => {
  const [meta, setMeta] = useState<NFT>();

  useEffect(() => {
    const fetchData = async () => {
      if (!contractAddress || !tokenId) {
        return;
      }

      const container = {
        attributes: [],
        contractAddress,
        external_url: `https://etherscan.io/token/${contractAddress}?a=${tokenId}`,
        id: tokenId,
        image: '/assets/images/img-missing.png',
        owner: '',
        collectionName: '',
      };

      const response = await fetch(
        `${RARIBLE_API_PATH}/items/ETHEREUM:${contractAddress}:${tokenId}`,
        {
          method: 'GET',
        },
      );

      response
        .json()
        .then((data) => {
          const { name, description, content } = data.meta;

          setMeta({
            ...container,
            name,
            description,
            image:
              content.length > 0
                ? content.find((item: any) => item['@type'] === 'IMAGE').url
                : '',
          });
        })
        .catch(() => {
          setMeta({
            ...container,
            image: '/assets/images/NA-BLACK.png',
            name: `TOKEN ${tokenId}`,
            description: 'NOTFOUND',
          });
        });
    };
    if (enabled) {
      fetchData();
    }
  }, [contractAddress, tokenId]);

  return { ...meta };
};
