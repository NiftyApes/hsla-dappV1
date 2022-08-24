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

  const unroundedNumber = ((interestRatePerSecond * SECONDS_IN_YEAR) / amount) * 100;

  if (unroundedNumber >= 0.1) {
    return Number(unroundedNumber.toFixed(2));
  } else {
    return Number(unroundedNumber.toPrecision(2));
  }
}
