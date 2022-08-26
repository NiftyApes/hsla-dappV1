import { SECONDS_IN_YEAR } from 'constants/misc';

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
