<<<<<<< HEAD
/* eslint-disable @typescript-eslint/no-shadow */
import { useState, useEffect } from 'react';
import { useTopCollections } from './useTopCollections';

const RARIBLE_API_PATH = 'https://api.rarible.org/v0.1';

export const useRaribleCollectionMetadata = ({
  contractAddress,
}: {
  contractAddress?: string;
}) => {
  const [meta, setMeta] = useState<{
    name: string;
    symbol: string;
    image: string;
  }>();
  const { collections } = useTopCollections();

  let image = '/assets/images/img-missing.png';

  const collectionMixin = (obj: any) => {
    const existing = collections.find(
      (item) => item.address === contractAddress,
    );
    return existing ? { ...obj, ...existing } : obj;
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${RARIBLE_API_PATH}/collections/ETHEREUM:${contractAddress}`,
        {
          method: 'GET',
        },
      );

      response
        .json()
        .then((data) => {
          const { name, symbol, meta } = data;

          if (meta.content && meta.content.length > 0) {
            image = meta.content.find(
              (item: any) => item['@type'] === 'IMAGE',
            ).url;
          }
          setMeta(collectionMixin({ name, symbol, image }));
        })
        .catch(() => {
          setMeta({
            name: 'NOT FOUND',
            symbol: 'NOTFOUND',
            image: '/assets/images/NA-BLACK.png',
          });
        });
=======
import {useState, useEffect} from 'react';
import {useTopCollections} from './useTopCollections';

const RARIBLE_API_PATH = 'https://api.rarible.org/v0.1';

export const useRaribleCollectionMetadata = ({contractAddress}: { contractAddress?: string }) => {
    const [meta, setMeta] = useState<{ name: string; symbol: string; image: string }>();
    const {collections} = useTopCollections();

    let image = '/assets/images/img-missing.png';

    const collectionMixin = (obj: any) => {
        const existing = collections.find((item) => item.address === contractAddress);
        return existing ? {...obj, ...existing} : obj;
>>>>>>> master
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                `${RARIBLE_API_PATH}/collections/ETHEREUM:${contractAddress}`,
                {
                    method: 'GET',
                },
            );

            response
                .json()
                .then((data) => {
                    const {name, symbol, meta} = data;

                    if (meta.content && meta.content.length > 0) {
                        image = meta.content.find((item: any) => item['@type'] === 'IMAGE').url;
                    }
                    setMeta(collectionMixin({name, symbol, image}));
                })
                .catch((error) => {

                    setMeta(collectionMixin({
                        name: 'NOT FOUND',
                        symbol: 'NOTFOUND',
                        image: '/assets/images/NA-BLACK.png',
                    }));
                });
        };
        fetchData();
    }, [contractAddress]);

    return {...meta};
};
