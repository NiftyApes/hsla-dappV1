import { getStatsForCollection } from '../__helpers/getStatsForCollection';

export function useCollectionStats({
  nftContractAddress,
}: {
  nftContractAddress: string;
}) {
  return {
    ...getStatsForCollection({
      collectionAddress: nftContractAddress,
    }),
  };
}
