import { LendingContract } from 'nft';

export async function getLoanForNft({
  nftContractAddress,
  nftId,
  lendingContract,
}: {
  nftContractAddress: string;
  nftId: string;
  lendingContract: LendingContract;
}) {
  if (!nftContractAddress || !nftId) {
    return;
  }

  const result = await lendingContract.getLoanAuction(nftContractAddress, nftId);

  console.log(
    `{
    nftContractAddress,
    nftId,
    lendingContract,
  }`,
    {
      nftContractAddress,
      nftId,
      lendingContract,
    },
    result,
  );

  return result;
}
