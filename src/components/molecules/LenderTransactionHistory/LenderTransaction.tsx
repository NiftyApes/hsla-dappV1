import { Flex, Td, Text, Tr } from '@chakra-ui/react';

import CryptoIcon from 'components/atoms/CryptoIcon';
import Icon from 'components/atoms/Icon';
import { transactionTypes } from 'constants/transactionTypes';
import { ethers } from 'ethers';
import moment from 'moment';

export const LenderTransaction = ({ tx }: { tx: any }) => {
  return (
    <Tr
      color="solid.gray0"
      sx={{
        td: {
          border: 'none',
          fontSize: 'md',
          color: 'solid.gray0',
        },
        'td:first-of-type': {
          borderRadius: '30px 0px 0px 30px',
        },
        'td:last-of-type': {
          borderRadius: '0px 30px 30px 0px',
        },
      }}
    >
      <Td width="1rem" textAlign="center">
        <Flex justifyContent="center">
          {tx.Data.Asset === 'ETH' && <CryptoIcon symbol="eth" size={25} />}
        </Flex>
      </Td>
      <Td textAlign="center">
        <Text fontSize="small">{moment(tx.Timestamp).format('h:mma, MMM D YYYY')}</Text>
      </Td>
      <Td textAlign="center">
        {tx.TransactionType === transactionTypes.DEPOSIT_LIQUIDITY
          ? 'Deposit Liquidity'
          : tx.TransactionType === transactionTypes.WITHDRAW_LIQUIDITY
          ? 'Withdraw Liquidity'
          : tx.TransactionType === transactionTypes.LOAN_EXECUTED_BY_BORROWER
          ? 'Loan Executed By Borrower'
          : 'Other'}
      </Td>
      <Td>
        <Flex alignItems="center" justifyContent="center">
          <Text
            fontSize="2md"
            ml="4px"
            color={
              tx.TransactionType === transactionTypes.DEPOSIT_LIQUIDITY
                ? 'green.500'
                : tx.TransactionType === transactionTypes.WITHDRAW_LIQUIDITY
                ? 'red.500'
                : tx.TransactionType === transactionTypes.LOAN_EXECUTED_BY_BORROWER
                ? 'blue.500'
                : ''
            }
          >
            {tx.TransactionType === transactionTypes.DEPOSIT_LIQUIDITY
              ? '+'
              : tx.TransactionType === transactionTypes.WITHDRAW_LIQUIDITY ||
                tx.TransactionType === transactionTypes.LOAN_EXECUTED_BY_BORROWER
              ? '-'
              : ''}
            {ethers.utils.formatEther(tx.Data.Amount)}Ξ
          </Text>
        </Flex>
      </Td>
      <Td>
        <Flex alignItems="center" justifyContent="center">
          {tx.TransactionType === transactionTypes.LOAN_EXECUTED_BY_BORROWER ? (
            <span>
              {ethers.utils.formatEther(tx.Data.Amount)}Ξ @ on all {tx.Data.NftContractAddress}
            </span>
          ) : (
            '-'
          )}
        </Flex>
      </Td>
      <Td>
        <Flex alignItems="center" justifyContent="center">
          <a href={`https://etherscan.io/tx/${tx.TransactionHash}`}>
            <Icon name="etherscan" />
          </a>
        </Flex>
      </Td>
    </Tr>
  );
};
