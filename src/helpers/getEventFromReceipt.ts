import { ethers } from 'ethers';
import { getEventSignatureFromAbi } from './getEventSignatureFromAbi';

export function getEventFromReceipt({ receipt, eventName, abi }: any) {
  // for why we're using ethers.utils.toUtf8Bytes,
  // see https://docs.ethers.io/v5/api/utils/hashing/#utils-keccak256
  // keccak256 can't take a string argument (unless it's a data hex string "0x...")
  // and docs recommended to use toUtf8Bytes to convert strings to Uint8Array
  const topic0 = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(getEventSignatureFromAbi({ eventName, abi })),
  );

  const eventFromReceipt = receipt.events.find(
    (event: any) => event.topics[0] === topic0,
  );

  return eventFromReceipt;
}
