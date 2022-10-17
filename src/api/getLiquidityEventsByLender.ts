import { ethers } from 'ethers';
import { getApiUrl } from 'helpers';
import _ from 'lodash';

export const getLiquidityEventsByLender = async ({
  chainId,
  lenderAddress,
}: {
  chainId: string;
  lenderAddress: string;
}) => {
  const result = await fetch(
    getApiUrl(
      chainId,
      `events?lender=${ethers.utils.getAddress(lenderAddress)}&liquidity=true`,
    ),
  );

  const json = await result.json();

  const sortedItems = _.sortBy(json, (i) => -i.Timestamp);

  return sortedItems;
};
