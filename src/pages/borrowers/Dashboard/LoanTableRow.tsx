import { Button, Link, Td, Text, Tr } from '@chakra-ui/react';
import { BigNumber } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import Icon from '../../../components/atoms/Icon';
import NFTCardSmall from '../../../components/cards/NFTCardSmall';
import { getAPR } from '../../../helpers/getAPR';
import {
  getLoanDurationDays,
  getLoanTimeRemaining,
  isLoanDefaulted,
} from '../../../helpers/getDuration';
import { roundForDisplay } from '../../../helpers/roundForDisplay';
import { LoanAuction } from '../../../loan';

interface CallbackType {
  (loan: LoanAuction): void;
}

interface Props {
  loan: LoanAuction;
  onClick: CallbackType;
}

const i18n = {
  repay: 'repay',
  loanDefaulted: 'Loan Defaulted',
  loanApr: (apr: number) => `${roundForDisplay(apr)}% APR`,
  loanTotalWithInterest: (amount: string, interest: BigNumber) =>
    `${amount}Ξ + ${Number(formatEther(interest)).toFixed(4)}Ξ Interest`,
};

const LoanTableRow: React.FC<Props> = ({ loan, onClick }) => {
  const amountDrawn = Number(loan.amountDrawn.toString());
  const irps = loan.interestRatePerSecond.toNumber();
  const apr = getAPR({
    amount: amountDrawn,
    interestRatePerSecond: irps,
  });

  const startMoment = moment(loan.loanBeginTimestamp * 1000);

  const totalInterest: BigNumber = loan.interestRatePerSecond.mul(
    loan.loanEndTimestamp - loan.loanBeginTimestamp,
  );
  const totalAmountOwed: BigNumber = loan.amountDrawn.add(
    loan.interestRatePerSecond.mul(
      loan.loanEndTimestamp - loan.loanBeginTimestamp,
    ),
  );

  if (_.isUndefined(loan.nftContractAddress)) {
    return <>No Content</>;
  }

  return (
    <Tr>
      <Td>
        <NFTCardSmall
          contractAddress={loan.nftContractAddress}
          tokenId={loan.nftId}
        />
      </Td>
      <Td>
        <Link
          textDecoration="underline"
          href={`https://etherscan.io/tx/${loan.loanTxnHash}`}
        >
          <Icon display="inline-block" name="etherscan" />{' '}
          {startMoment.format('MMMM Do YYYY, h:mm:ss')}
        </Link>
      </Td>
      <Td>
        <Text fontSize="xl" fontWeight="bold">
          {formatEther(loan.amountDrawn)}Ξ
        </Text>

        <Text fontSize="sm">
          <Text color="gray" as="span" mr="10px">
            {getLoanDurationDays(loan)}
          </Text>
          <Text as="span">{i18n.loanApr(apr)}</Text>
        </Text>
      </Td>
      <Td>
        <Text fontSize="xl" fontWeight="bold">
          {Number(formatEther(totalAmountOwed)).toFixed(4)}Ξ
        </Text>
        <Text fontSize="sm" color="gray">
          {i18n.loanTotalWithInterest(
            formatEther(loan.amountDrawn),
            totalInterest,
          )}
        </Text>
      </Td>
      <Td>
        {isLoanDefaulted(loan) ? (
          <Text color="red">{i18n.loanDefaulted}</Text>
        ) : (
          `${getLoanTimeRemaining(loan)} remaining...`
        )}
      </Td>
      <Td>
        <Button variant="neutral" onClick={() => onClick(loan)}>
          {i18n.repay}
        </Button>
      </Td>
    </Tr>
  );
};

export default LoanTableRow;
