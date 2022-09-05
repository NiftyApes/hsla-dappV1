import {
  BAYC_CONTRACT_ADDRESS,
  DOODLES_CONTRACT_ADDRESS,
  MAYC_CONTRACT_ADDRESS,
} from 'constants/contractAddresses';

// This function just limits what we iterate over
// to a small range containing the specific NFTs we use locally

export const getTokenIdRangeForLocalForksOfNftContracts = ({
  nftContractAddress,
  totalSupply,
}: {
  nftContractAddress: string;
  totalSupply: number;
}) => {
  const startI =
    nftContractAddress.toUpperCase() === BAYC_CONTRACT_ADDRESS.toUpperCase()
      ? 860
      : nftContractAddress.toUpperCase() === MAYC_CONTRACT_ADDRESS.toUpperCase()
      ? 11863
      : nftContractAddress.toUpperCase() === DOODLES_CONTRACT_ADDRESS.toUpperCase()
      ? 5698
      : 0;

  const endI =
    nftContractAddress.toUpperCase() === BAYC_CONTRACT_ADDRESS.toUpperCase()
      ? 865
      : nftContractAddress.toUpperCase() === MAYC_CONTRACT_ADDRESS.toUpperCase()
      ? 11870
      : nftContractAddress.toUpperCase() === DOODLES_CONTRACT_ADDRESS.toUpperCase()
      ? 5703
      : totalSupply;

  return [startI, endI];
};
