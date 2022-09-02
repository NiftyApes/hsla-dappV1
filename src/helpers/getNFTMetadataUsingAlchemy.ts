export const getNFTMetadataUsingAlchemy = async ({
  nftContractAddress,
  nftTokenId,
}: {
  nftContractAddress: string;
  nftTokenId: number;
}) => {
  const response = await fetch(
    `https://eth-mainnet.g.alchemy.com/v2/Of3Km_--Ow1fNnMhaETmwnmWBFFHF3ZY/getNFTMetadata?contractAddress=${nftContractAddress}&tokenId=${nftTokenId}`,
  );

  const json = await response.json();

  return json;
};
