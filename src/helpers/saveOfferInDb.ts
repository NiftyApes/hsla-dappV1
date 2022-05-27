export async function saveOfferInDb({
  offerObj,
  offerHash,
}: {
  offerObj: {
    nftId: string;
    creator: string;
    interestRatePerSecond: number;
    amount: number;
    duration: number;
    expiration: number;
    floorTerm: boolean;
    nftContractAddress: string;
  };
  offerHash: string;
}) {
  const {
    nftId,
    creator,
    interestRatePerSecond,
    amount,
    duration,
    expiration,
    floorTerm,
    nftContractAddress,
  } = offerObj;

  await fetch(`https://qqxeqsrt39.execute-api.us-west-2.amazonaws.com/DEV/api/offers`, {
    method: 'POST',
    body: JSON.stringify({
      nftId,
      creator,
      interestRatePerSecond,
      amount,
      duration,
      expiration,
      floorTerm,
      nftContractAddress,
      offerHash,
    }),
  });
}