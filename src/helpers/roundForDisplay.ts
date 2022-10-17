export function roundForDisplay(unroundedNumber: number) {
  if (unroundedNumber >= 0.1) {
    return Number(unroundedNumber.toFixed(2));
  }
  return Number(unroundedNumber.toPrecision(2));
}

export const concatForDisplay = (val: string = '') => {
  return val.length > 10 ? `${val.substring(0, 10)}...` : val;
};
