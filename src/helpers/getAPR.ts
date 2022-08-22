const SECONDS_IN_YEAR = 3.154e7;

export function getAPR({
  amount,
  interestRatePerSecond,
}: {
  amount: number;
  interestRatePerSecond: number;
}) {
  return amount !== 0
    ? Math.max(
        Number((((interestRatePerSecond * SECONDS_IN_YEAR) / amount) * 100).toFixed(2)),
        Number((((interestRatePerSecond * SECONDS_IN_YEAR) / amount) * 100).toPrecision(2)),
      )
    : 0;
}
