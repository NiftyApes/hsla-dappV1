export type IWalletCollection = {
  contractAddress: string;
  floorPrice?: number;
  highestPrincipal?: number;
  longestDuration?: number;
  lowestApr?: number;
  numberOfOffers?: number;
  tokens: [];
  totalLiquidity?: number;
};
