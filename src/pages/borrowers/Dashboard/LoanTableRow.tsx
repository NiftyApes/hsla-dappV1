import React from 'react';
import {LoanAuction} from '../../../loan';
import {Button, Td, Text, Tr} from '@chakra-ui/react';
import {formatEther} from 'ethers/lib/utils';
import {getAPR} from '../../../helpers/getAPR';
import moment from 'moment';
import {BigNumber} from 'ethers';
import {roundForDisplay} from '../../../helpers/roundForDisplay';
import NFTCardSmall from "../../../components/cards/NFTCardSmall";
import {getLoanDurationDays, getLoanTimeRemaining, isLoanDefaulted} from "../../../helpers/getDuration";
import _ from 'lodash';

interface callbackType {
    (loan: LoanAuction): void;
}

interface Props {
    loan: LoanAuction;
    onClick: callbackType;
}

const i18n = {
    repay: 'repay',
    loanDefaulted: 'Loan Defaulted',
    loanApr: (apr: number) => `${roundForDisplay(apr)}% APR`,
    loanTotalWithInterest: (amount: string, interest: BigNumber) =>
        `${amount}Ξ + ${Number(formatEther(interest)).toFixed(4)}Ξ Interest`,
};

const LoanTableRow: React.FC<Props> = ({loan, onClick}) => {
    const amount = Number(loan.amount.toString());
    const irps = loan.interestRatePerSecond.toNumber();
    const apr = getAPR({
        amount,
        interestRatePerSecond: irps,
    });

    const startMoment = moment(loan.loanBeginTimestamp * 1000);

    const totalInterest: BigNumber = loan.interestRatePerSecond.mul(
        loan.loanEndTimestamp - loan.loanBeginTimestamp,
    );
    const totalAmount: BigNumber = loan.amount.add(
        loan.interestRatePerSecond.mul(loan.loanEndTimestamp - loan.loanBeginTimestamp),
    );


    if (_.isUndefined(loan.nftContractAddress)) {
        return <>No Content</>
    }

    return (
        <Tr>
            <Td>
                <NFTCardSmall contractAddress={loan.nftContractAddress} tokenId={loan.nftId}/>
            </Td>
            <Td>
                <a href={`https://etherscan.io/tx/${loan.loanTxnHash}`} target="_blank">
                    {startMoment.format('MMMM Do YYYY, h:mm:ss')}
                </a>
            </Td>
            <Td>
                <Text fontSize="xl" fontWeight="bold">
                    {formatEther(loan.amount)}Ξ
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
                    {Number(formatEther(totalAmount)).toFixed(4)}Ξ
                </Text>
                <Text fontSize="sm" color="gray">
                    {i18n.loanTotalWithInterest(formatEther(loan.amount), totalInterest)}
                </Text>
            </Td>
            <Td>
                {isLoanDefaulted(loan) ? i18n.loanDefaulted : `${getLoanTimeRemaining(loan)} remaining...`}
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
