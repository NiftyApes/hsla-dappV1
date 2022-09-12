import {
  BAYC_CONTRACT_ADDRESS,
  DOODLES_CONTRACT_ADDRESS,
  MAYC_CONTRACT_ADDRESS,
  NOUNS_CONTRACT_ADDRESS,
} from 'constants/contractAddresses';
// This function just limits what we iterate over
// to a small range containing the specific NFTs we use locally

export const getTokenIdRangeForLocalForksOfNftContracts = ({
  nftContractAddress,
}: {
  nftContractAddress: string;
}) => {
  return nftContractAddress.toUpperCase() === BAYC_CONTRACT_ADDRESS.toUpperCase()
    ? [861, 862, 863]
    : nftContractAddress.toUpperCase() === MAYC_CONTRACT_ADDRESS.toUpperCase()
    ? [11863, 11864, 11866]
    : nftContractAddress.toUpperCase() === DOODLES_CONTRACT_ADDRESS.toUpperCase()
    ? [5698, 5699, 5701]
    : nftContractAddress.toUpperCase() === NOUNS_CONTRACT_ADDRESS.toUpperCase()
    ? [190, 213, 260]
    : [1, 2, 3, 4, 5, 6];
};
