const SECONDS_IN_YEAR = 3.154e7;

export function getAPR({
  amount,
  interestRatePerSecond,
}: {
  amount: number;
  interestRatePerSecond: number;
}) {
  if (amount === 0) {
    return 0;
  }

  return ((interestRatePerSecond * SECONDS_IN_YEAR) / amount) * 100;
}
