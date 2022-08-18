import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { useWalletProvider } from './useWalletProvider';

export const useGetTransactionTimestamp = () => {
  const walletProvider = useWalletProvider();

  return {
    async getTransactionTimestamp(receipt: TransactionReceipt) {
      // a transaction receipt includes the block number
      // but not the block's timestamp
      // so we use eth_getBlockByNumber from the Eth JSON-RPC API
      const block: any = await walletProvider?.request({
        method: 'eth_getBlockByNumber',
        params: [`0x${receipt.blockNumber.toString(16)}`, false],
      });

      const timestamp = Number(block.timestamp);

      return timestamp;
    },
  };
};
