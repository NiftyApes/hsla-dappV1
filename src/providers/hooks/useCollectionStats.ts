import {
  useOnChainOffers,
  useSignatureOffers,
} from 'providers/NiftyApesProvider';
import { getStatsForCollection } from '../__helpers/getStatsForCollection';

export function useCollectionStats({
  nftContractAddress,
}: {
  nftContractAddress: string;
}):
  | { loading: true; collectionStats: undefined }
  | {
      loading: false;
      collectionStats: {
        address?: string;
        highestPrincipal?: number;
        lowestApr?: number;
        longestDuration?: number;
        numberOfOffers?: number;
        totalLiquidity?: number;
      };
    } {
  const { onChainOffers } = useOnChainOffers();
  const { signatureOffers } = useSignatureOffers();

  if (!onChainOffers || !signatureOffers) {
    return { loading: true, collectionStats: undefined };
  }

  const collectionStats = getStatsForCollection({
    onChainOffers,
    signatureOffers,
    collectionAddress: nftContractAddress,
  });

  return {
    loading: false,
    collectionStats,
  };
}
