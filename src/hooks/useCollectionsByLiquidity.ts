
import { useTopCollectionStats } from 'providers/hooks/useTopCollectionStats';
import { useEffect, useState } from 'react';


export const useTopNiftyApesCollections = () => {
  const [data, setData] = useState<any>();


  const { topCollectionStats, loading: isLoadingTopCollectionStats } =
    useTopCollectionStats();
  useEffect(() => {
    if (!isLoadingTopCollectionStats && !data) {
      setData(topCollectionStats);
    }
  }, [topCollectionStats, isLoadingTopCollectionStats]);

  return data;
};
