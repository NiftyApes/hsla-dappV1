import { useEffect } from 'react';
import { useAppDispatch } from 'app/hooks';
import { fetchNFTsByAddress, WalletAddress, useNFTsByWalletAddress, TokenType } from 'nft';
import { useLoanOffersByWalletAddress } from 'loan';
import { useChainId } from './useChainId';

export type Collection = {
  name: string;
  chainId: string;
  contractAddress: string;
  tokenType: TokenType;
};

export type FilterableCollection = {
  count: number;
  collection: Collection;
};

export const useBorrowerSearch = (walletAddress?: WalletAddress) => {
  const dispatch = useAppDispatch();
  const chainId = useChainId();

  const nfts = useNFTsByWalletAddress(walletAddress || '');
  const loanOffers = useLoanOffersByWalletAddress(walletAddress || '');

  useEffect(() => {
    if (walletAddress && chainId && !nfts?.fetching) {
      dispatch(fetchNFTsByAddress({ walletAddress, network: chainId }));
    }
  }, [dispatch, walletAddress, chainId]);

  return {
    getCurrentNFTs: (args: { hasOffer: boolean } = { hasOffer: false }) => {
      return {
        ...nfts,
        content: nfts?.content?.filter((nft) => {
          const hasOffer = Boolean(
            loanOffers.content?.find((offers) => offers.OfferHash === nft.uniqueKey),
          );
          return args.hasOffer === hasOffer;
        }),
      };
    },
    getFilterableCollections: () => {
      const record: Record<string, number> = {};
      // const collections: Record<string, Collection> = {};

      nfts?.content?.forEach((item) => {
        if (!record[item.contractAddress]) {
          record[item.contractAddress] = 1;
          // collections[item.contractAddress] = ;
        } else {
          ++record[item.contractAddress];
        }
      });

      const arr: FilterableCollection[] = [];

      Object.entries(record).forEach(([contractAddress, count]) => {
        const nft = nfts.content?.find((item) => item.contractAddress === contractAddress);
        if (nft) {
          arr.push({
            collection: {
              chainId: chainId || '0',
              contractAddress: nft.contractAddress,
              name: nft.name,
              tokenType: nft.tokenType,
            },
            count,
          });
        }
      });

      return arr;
    },
  };
};
