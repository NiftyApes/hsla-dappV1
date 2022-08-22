export function roundForDisplay(unroundedNumber: number) {
  if (unroundedNumber >= 0.1) {
    return Number(unroundedNumber.toFixed(2));
  } else {
    return Number(unroundedNumber.toPrecision(2));
  }
}
