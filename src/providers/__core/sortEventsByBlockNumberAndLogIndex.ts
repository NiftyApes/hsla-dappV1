/* eslint-disable */
import _ from 'lodash';

export function sortEventsByBlockNumberAndLogIndex(...setsOfEvents: any[]) {
  return _.sortBy(_.flatten(setsOfEvents), [
    (e: any) => e.blockNumber,
    (e: any) => e.logIndex,
  ]);
}
