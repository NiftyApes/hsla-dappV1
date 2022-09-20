import { Flex, Td, Text, Tr, Link } from '@chakra-ui/react';

import CryptoIcon from 'components/atoms/CryptoIcon';
import Icon from 'components/atoms/Icon';
import { transactionTypes } from 'constants/transactionTypes';
import { ethers } from 'ethers';
import { getAPR } from 'helpers/getAPR';
import { roundForDisplay } from 'helpers/roundForDisplay';
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
          {tx.EventData.Asset === 'ETH' && <CryptoIcon symbol="eth" size={25} />}
        </Flex>
      </Td>
      <Td textAlign="center">
            <Link textDecoration={"underline"} href={`https://etherscan.io/tx/${tx.TransactionHash}`}> 
              <Icon display="inline-block" name="etherscan" /> {moment(tx.Timestamp * 1000).format('h:mma, MMM D YYYY')}
            </Link>
      </Td>
      <Td textAlign="center">
        {tx.EventType === transactionTypes.LIQUIDITY_DEPOSITED
          ? 'Deposit Liquidity'
          : tx.EventType === transactionTypes.LIQUIDITY_WITHDRAWN
          ? 'Withdraw Liquidity'
          : tx.EventType === transactionTypes.LOAN_CREATED
          ? 'Loan Executed By Borrower'
          : tx.EventType === transactionTypes.LOAN_FULLY_REPAID_BY_BORROWER
          ? 'Loan Fully Repaid By Borrower'
          : tx.EventType === transactionTypes.ASSET_SEIZED
          ? 'Asset Seized & Principal Lost'
          : 'Other'}
      </Td>
      <Td>
        <Flex alignItems="center" justifyContent="center">
          <Text
            fontSize="2md"
            ml="4px"
            color={
              tx.EventType === transactionTypes.LIQUIDITY_DEPOSITED
                ? 'green.500'
                : tx.EventType === transactionTypes.LIQUIDITY_WITHDRAWN
                ? 'red.500'
                : tx.EventType === transactionTypes.LOAN_CREATED
                ? 'blue.500'
                : tx.EventType === transactionTypes.LOAN_FULLY_REPAID_BY_BORROWER
                ? 'green.500'
                : tx.EventType === transactionTypes.ASSET_SEIZED
                ? 'red.500'
                : ''
            }
          >
            {tx.EventType === transactionTypes.LIQUIDITY_DEPOSITED ||
            tx.EventType === transactionTypes.LOAN_FULLY_REPAID_BY_BORROWER
              ? '+'
              : tx.EventType === transactionTypes.LIQUIDITY_WITHDRAWN ||
                tx.EventType === transactionTypes.ASSET_SEIZED
              ? '-' :
              tx.EventType === transactionTypes.LOAN_CREATED ? '🔒 '
              : ''}
            {ethers.utils.formatEther(tx.EventData.Amount)}Ξ
          </Text>
        </Flex>
      </Td>
      <Td>
        <Flex alignItems="center" justifyContent="center">
          {tx.EventType === transactionTypes.LOAN_CREATED ? (
            <span>
              {ethers.utils.formatEther(tx.EventData.Amount)}Ξ @{' '}
              {roundForDisplay(
                getAPR({
                  amount: tx.EventData.Amount,
                  interestRatePerSecond: tx.EventData.InterestRatePerSecond,
                }),
              )}
              % APR on all <Link textDecoration={"underline"} href={`https://etherscan.io/address/${tx.EventData.NftContractAddress}`} maxWidth="20ch" noOfLines={1}> {tx.EventData.NftContractAddress}</Link>
            </span>
          ) : (
            '-'
          )}
        </Flex>
      </Td>
    </Tr>
  );
};
