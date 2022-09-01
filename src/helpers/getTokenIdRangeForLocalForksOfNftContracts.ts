import { BAYC_CONTRACT_ADDRESS, MAYC_CONTRACT_ADDRESS } from 'constants/contractAddresses';

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
      : 0;

  const endI =
    nftContractAddress.toUpperCase() === BAYC_CONTRACT_ADDRESS.toUpperCase()
      ? 870
      : nftContractAddress.toUpperCase() === MAYC_CONTRACT_ADDRESS.toUpperCase()
      ? 11871
      : totalSupply;

  return [startI, endI];
};
