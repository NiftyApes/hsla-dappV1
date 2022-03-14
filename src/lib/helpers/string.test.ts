import { formatNumber } from './string';

describe('lib/helpers/string', () => {
  it('number in format', () => {
    const actual = formatNumber(1425);
    const expected = '1,425';
    expect(actual).toBe(expected);
  });
});
