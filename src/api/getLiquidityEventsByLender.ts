import { ethers } from 'ethers';
import { getApiUrl } from 'helpers';
import _ from 'lodash';

export const getLiquidityEventsByLender = async ({ lenderAddress }: { lenderAddress: string }) => {
  const result = await fetch(
    getApiUrl(`events?lender=${ethers.utils.getAddress(lenderAddress)}&liquidity=true`),
  );

  const json = await result.json();

  const sortedItems = _.sortBy(json, (i) => -i.Timestamp);

  return sortedItems;
};
