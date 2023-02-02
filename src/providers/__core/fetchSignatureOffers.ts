/* eslint-disable */
import _ from 'lodash';
import { CHAIN } from '../constants';

export async function fetchSignatureOffers() {
  const response = await fetch(
    `https://qqxeqsrt39.execute-api.us-west-2.amazonaws.com/${CHAIN}/v2/signature-offers?all=true`,
  );
  const items = await response.json();

  return _.sortBy(items, (item) => Number(item.TS));
}
