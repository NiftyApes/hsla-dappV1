/* eslint-disable */
export async function fetchAllEvents({
  provider,
  LendingContract,
  OffersContract,
  LiquidityContract,
}: any) {
  const curBlockNumber = await provider.getBlockNumber();

  const loanExecutedEvents = await LendingContract.queryFilter(
    LendingContract.filters.LoanExecuted(),
    0,
    curBlockNumber,
  );

  const loanRepaidEvents = await LendingContract.queryFilter(
    LendingContract.filters.LoanRepaid(),
    0,
    curBlockNumber,
  );

  const loanPartiallyRepaidEvents = await LendingContract.queryFilter(
    LendingContract.filters.PartialRepayment(),
    0,
    curBlockNumber,
  );

  const refinanceEvents = await LendingContract.queryFilter(
    LendingContract.filters.Refinance(),
    0,
    curBlockNumber,
  );

  const amountDrawnEvents = await LendingContract.queryFilter(
    LendingContract.filters.AmountDrawn(),
    0,
    curBlockNumber,
  );

  const assetSeizedEvents = await LendingContract.queryFilter(
    LendingContract.filters.AssetSeized(),
    0,
    curBlockNumber,
  );

  const newOfferEvents = await OffersContract.queryFilter(
    OffersContract.filters.NewOffer(),
    0,
    curBlockNumber,
  );

  const offerRemovedEvents = await OffersContract.queryFilter(
    OffersContract.filters.OfferRemoved(),
    0,
    curBlockNumber,
  );

  const offerSignatureUsedEvents = await OffersContract.queryFilter(
    OffersContract.filters.OfferSignatureUsed(),
    0,
    curBlockNumber,
  );

  const ethSuppliedEvents = await LiquidityContract.queryFilter(
    LiquidityContract.filters.EthSupplied(),
    0,
    curBlockNumber,
  );

  const ethWithdrawnEvents = await LiquidityContract.queryFilter(
    LiquidityContract.filters.EthWithdrawn(),
    0,
    curBlockNumber,
  );

  return {
    loanExecutedEvents,
    loanRepaidEvents,
    loanPartiallyRepaidEvents,
    refinanceEvents,
    amountDrawnEvents,
    assetSeizedEvents,
    newOfferEvents,
    offerRemovedEvents,
    offerSignatureUsedEvents,
    ethSuppliedEvents,
    ethWithdrawnEvents,
  };
}
