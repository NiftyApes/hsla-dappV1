import React, { useState } from 'react';
import { Box, Button, Flex, Grid, Text, useToast } from '@chakra-ui/react';
import Icon from 'components/atoms/Icon';
import CryptoIcon from 'components/atoms/CryptoIcon';
import { useNiftyApesContractAddress } from '../../../hooks/useNiftyApesContractAddress';
import { useERC721ApprovalForAll } from '../../../hooks/useERC721ApprovalForAll';
import { BigNumber, Contract, ethers } from 'ethers';
import { useExecuteLoanByBorrower } from '../../../hooks/useExecuteLoanByBorrower';
import LoadingIndicator from '../../atoms/LoadingIndicator';
import { humanizeContractError } from '../../../helpers/errorsMap';
import { LoanOffer } from '../../../loan';
import { NFT } from '../../../nft';

interface Props {
  contract?: Contract;
  nft: NFT;
  offer: LoanOffer;
}

const i18n = {
  allowButton: 'allow niftyapes to transfer nft',
  approveButton: 'borrow money',
  approveMessage: (nft: NFT, offer: LoanOffer) =>
    `Approve and transfer ${nft.name} #${
      nft.id
    } to the NiftyApes smart contract to borrow ${ethers.utils.formatEther(
      BigNumber.from(String(offer.OfferTerms.Amount)),
    )} ${offer.symbol} for ${offer.durationDays} days`,
  dealTermsLabel: 'deal terms',
  liquidityAwaits: 'Liquidity Awaits',
  offerTerms: (offer: LoanOffer) => `${offer.durationDays} days at ${offer.aprPercentage}% APR`,
  toastApproveTransferError: 'Unable to approve NFT transfer',
  toastApproveTransferSuccess: 'NFT Transfer approved',
  toastLoanSuccess: 'Loan executed successfully',
  totalInterest: 'total interest',
  totalInterestDescription: 'The most you could owe at the end of your loan.',
  transferDetails: (amount: string, symbol: string) =>
    `${amount} ${symbol} will be sent to your wallet address once your loan is executed.`,
};

const BorrowOfferDetailsCard: React.FC<Props> = ({ contract, offer, nft }) => {
  const toast = useToast();
  const operator = useNiftyApesContractAddress();

  const fmtOfferAmount: string = ethers.utils.formatEther(
    BigNumber.from(String(offer.OfferTerms.Amount)),
  );
  const fmtTotalInterest: string = Number(
    (offer.totalInterest / 100) * Number(fmtOfferAmount),
  ).toFixed(2);

  const { hasApprovalForAll, hasCheckedApproval, grantApprovalForAll } = useERC721ApprovalForAll({
    contract,
    operator,
  });

  const { executeLoanByBorrower } = useExecuteLoanByBorrower({
    nftContractAddress: contract?.address,
    nftId: nft.id,
    offerHash: offer.OfferHash,
    floorTerm: offer.OfferTerms.FloorTerm,
  });
  const [isExecuting, setExecuting] = useState<boolean>(false);

  const onExecuteLoan = async () => {
    if (executeLoanByBorrower) {
      setExecuting(true);
      await executeLoanByBorrower()
        .then(() => {
          toast({
            title: i18n.toastLoanSuccess,
            status: 'success',
            position: 'top-right',
            isClosable: true,
          });

          setExecuting(false);
        })
        .catch((error) => {
          toast({
            title: `Error: ${humanizeContractError(error.reason)}`,
            status: 'error',
            position: 'top-right',
            isClosable: true,
          });

          setExecuting(false);
        });
    }
  };

  const [transferApprovalStatus, setTransferApprovalStatus] = useState<string>('READY');
  const onApproveTransfer = async () => {
    await grantApprovalForAll({
      onPending: () => setTransferApprovalStatus('PENDING'),
      onSuccess: () => {
        setTransferApprovalStatus('SUCCESS');

        toast({
          title: i18n.toastApproveTransferSuccess,
          status: 'success',
          position: 'top-right',
          isClosable: true,
        });
        setTimeout(() => setTransferApprovalStatus('READY'), 1000);
      },
      onError: () => {
        toast({
          title: i18n.toastApproveTransferError,
          status: 'error',
          position: 'top-right',
          isClosable: true,
        });
        setTransferApprovalStatus('ERROR');
        setTimeout(() => setTransferApprovalStatus('READY'), 1000);
      },
    });
  };

  const renderTransferButton = () => {
    if (!hasApprovalForAll && hasCheckedApproval) {
      return (
        <Button
          onClick={onApproveTransfer}
          colorScheme="purple"
          mt="30px"
          py="6px"
          size="lg"
          textTransform="uppercase"
          variant="outline"
          width="100%"
        >
          {transferApprovalStatus === 'PENDING' ? <LoadingIndicator size="xs" /> : i18n.allowButton}
        </Button>
      );
    }
  };

  const renderLoanButton = () => {
    return (
      <Button
        isDisabled={!hasApprovalForAll && hasCheckedApproval}
        onClick={onExecuteLoan}
        colorScheme="purple"
        mt="20px"
        py="6px"
        size="lg"
        textTransform="uppercase"
        variant="outline"
        width="100%"
      >
        {isExecuting ? <LoadingIndicator size="xs" /> : i18n.approveButton}
      </Button>
    );
  };

  return (
    <Box p="5px" mb="5px">
      <Grid
        gridTemplateColumns="repeat(2, minmax(0, 1fr))"
        gridColumnGap="20px"
        w="100%"
        borderColor="solid.lightPurple"
        textAlign="center"
        bgColor="solid.white"
      >
        <Flex flexDir="column" alignItems="center">
          <Flex alignItems="center" mt="50px">
            <Text fontSize="sm" color="solid.gray0" mr="3px" textTransform="uppercase">
              {i18n.dealTermsLabel}
            </Text>
          </Flex>
          <Flex alignItems="center">
            <CryptoIcon symbol={offer.symbol} size={32} />
            <Text ml="6px" fontSize="3.5xl">
              {fmtOfferAmount} {offer.symbol}
            </Text>
          </Flex>
          <Text fontSize="lg" color="solid.black" mt="5px">
            {i18n.offerTerms(offer)}
          </Text>
          <Text mt="12px">{i18n.transferDetails(fmtOfferAmount, offer.symbol)}</Text>
        </Flex>

        <Flex flexDir="column" alignItems="center">
          <Flex alignItems="center" mt="50px">
            <Text fontSize="sm" color="solid.gray0" mr="3px" textTransform="uppercase">
              {i18n.totalInterest}
            </Text>
            <Icon name="help-circle" color="solid.gray0" />
          </Flex>

          <Flex alignItems="center">
            <CryptoIcon symbol={offer.symbol} size={32} />
            <Text ml="6px" fontSize="3.5xl">
              {fmtTotalInterest} {offer.symbol}
            </Text>
          </Flex>
          <Text fontSize="sm" color="solid.black" mb="20px">
            {i18n.totalInterestDescription}
          </Text>
        </Flex>
      </Grid>

      <Flex flexDir="column" alignItems="center">
        <Flex mt="30px">
          <Text textTransform="uppercase" fontWeight="bold">
            {i18n.liquidityAwaits}
          </Text>
        </Flex>
        <Flex mt="10px">
          <Text textAlign="center">{i18n.approveMessage(nft, offer)}</Text>
        </Flex>

        {renderTransferButton()}
        {renderLoanButton()}
      </Flex>
    </Box>
  );
};
export default BorrowOfferDetailsCard;
