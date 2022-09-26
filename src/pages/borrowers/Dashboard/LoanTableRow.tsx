import React from 'react';
import {LoanAuction} from '../../../loan';
import {NFT} from '../../../nft';
import {Button, Td, Text, Tr} from '@chakra-ui/react';
import {formatEther} from 'ethers/lib/utils';
import {getAPR} from '../../../helpers/getAPR';
import moment from 'moment';
import {BigNumber} from 'ethers';
import {roundForDisplay} from '../../../helpers/roundForDisplay';
import NFTCardSmall from "../../../components/cards/NFTCardSmall";

interface callbackType {
    (loan: LoanAuction, nft: NFT): void;
}

interface Props {
    loan: LoanAuction;
    onClick: callbackType;
}

const i18n = {
    repay: 'repay',
    loanTimeRemaining: (distance: string, defaulted: boolean) =>
        defaulted ? 'Loan Defaulted' : `${distance} remaining...`,
    loanDuration: (duration: number) => `${duration} days`,
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

    const endMoment = moment(loan.loanEndTimestamp * 1000);
    const startMoment = moment(loan.loanBeginTimestamp * 1000);
    const timeRemaining = endMoment.toNow(true);
    const duration = endMoment.diff(startMoment, 'days');
    const isDefaulted = moment().isAfter(endMoment);

    const totalInterest: BigNumber = loan.interestRatePerSecond.mul(
        loan.loanEndTimestamp - loan.loanBeginTimestamp,
    );
    const totalAmount: BigNumber = loan.amount.add(
        loan.interestRatePerSecond.mul(loan.loanEndTimestamp - loan.loanBeginTimestamp),
    );


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
                        {i18n.loanDuration(duration)}
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
            <Td>{i18n.loanTimeRemaining(timeRemaining, isDefaulted)}</Td>
            <Td>
                <Button variant="neutral" onClick={() => {
                    console.log("click");
                }
                    // onClick(loan, nft)
                }>
                    {i18n.repay}
                </Button>
            </Td>
        </Tr>
    );
};

export default LoanTableRow;
