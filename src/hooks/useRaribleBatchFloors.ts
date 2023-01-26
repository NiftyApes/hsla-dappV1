import { useEffect, useState } from 'react';
import { IWalletCollection } from '../pages/marketing/Wallet/components/WalletCollections';

export const RARIBLE_API_PATH = 'https://api.rarible.org/v0.1';

export const useRaribleFloorBatch = ({
  list,
  enabled = false,
}: {
  enabled: boolean;
  list: IWalletCollection[];
}) => {
  const [loaded, setLoaded] = useState<IWalletCollection[]>([]);

  useEffect(() => {
    console.log('Called', list.length);
    list.forEach((item, idx) => {
      console.log(idx);
      setTimeout(() => {
        setLoaded((prevState) => {
          return [...prevState, item];
        });
        console.log('Loaded');
      }, 100 * idx);
    });
  }, [enabled]);

  return { loaded };
};
