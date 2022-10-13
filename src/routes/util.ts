/* eslint-disable no-param-reassign */
import { stringify, IStringifyOptions } from 'qs';

export const buildBase = (base: string[]) => {
  base = base.filter((d) => d.length);
  if (!base.length) return null;
  return `/${base.join('/')}`;
};

export const buildParams = (params: any, options?: IStringifyOptions) => {
  return stringify(
    params,
    options || {
      addQueryPrefix: true,
      arrayFormat: 'comma',
      encode: false,
    },
  );
};

export const path = (baseArray: any[], params?: IStringifyOptions) => {
  const base = buildBase(baseArray);
  const paramsStringified = buildParams(params);
  return `${base}${paramsStringified}`;
};
