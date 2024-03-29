/* eslint-disable consistent-return */
import { QuestionOutlineIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Grid,
  Text,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import { ToastSuccessCard } from 'components/cards/ToastSuccessCard';
import { ACTIONS, CATEGORIES, LABELS } from 'constants/googleAnalytics';
import { BigNumber, ethers } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import { useAnalyticsEventTracker } from 'hooks/useAnalyticsEventTracker';
import { useLendingContract } from 'hooks/useContracts';
import JSConfetti from 'js-confetti';
import { logError } from 'logging/logError';
import React, { useState } from 'react';
import { humanizeContractError } from '../../../helpers/errorsMap';
import { concatForDisplay } from '../../../helpers/roundForDisplay';
import { useERC721Approval } from '../../../hooks/useERC721Approval';
import { useExecuteLoanByBorrower } from '../../../hooks/useExecuteLoanByBorrower';
import { LoanOffer } from '../../../loan';
import { NFT } from '../../../nft';
import LoadingIndicator from '../../atoms/LoadingIndicator';

interface Props {
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
    )}Ξ for ${offer.durationDays} days`,
  dealTermsLabel: 'deal terms',
  liquidityAwaits: 'Liquidity Awaits',
  toastApproveTransferError: 'Unable to approve NFT transfer',
  toastApproveTransferSuccess: 'NFT Transfer approved',
  toastLoanSuccess: 'Loan executed successfully',
  totalInterest: 'total interest',
  totalBorrowed: 'is the most you could owe at the end of your loan',
};

const BorrowOfferDetailsCard: React.FC<Props> = ({ offer, nft }) => {
  const gaEventTracker = useAnalyticsEventTracker(CATEGORIES.BORROWERS);
  const toast = useToast();

  const jsConfetti = new JSConfetti();

  const lendingContract = useLendingContract();

  const totalAmount: BigNumber = BigNumber.from(String(offer.amount));
  const totalInterest: BigNumber = BigNumber.from(
    String(offer.OfferTerms.InterestRatePerSecond),
  ).mul(BigNumber.from(String(offer.OfferTerms.Duration)));

  const totalBorrowed: BigNumber = BigNumber.from(
    String(offer.OfferTerms.Amount),
  ).add(totalInterest);

  const fmtOfferAmount: string = formatEther(totalAmount);
  const { hasApproval, hasCheckedApproval, grantApproval } = useERC721Approval({
    contractAddress: nft.contractAddress,
    operator: lendingContract?.address,
    tokenId: nft.id,
  });

  const { executeLoanByBorrower } = useExecuteLoanByBorrower({
    nftContractAddress: nft.contractAddress,
    nftId: nft.id,
    offerHash: offer.OfferHash,
    floorTerm: offer.OfferTerms.FloorTerm,
    signature: offer.signature,
    offerAttempt: offer.OfferAttempt,
  });
  const [isExecuting, setExecuting] = useState<boolean>(false);

  const onExecuteLoan = async () => {
    if (executeLoanByBorrower) {
      setExecuting(true);
      await executeLoanByBorrower()
        .then(({ receipt }) => {
          jsConfetti.addConfetti({
            emojis: ['🍌'],
            emojiSize: 80,
            confettiNumber: 50,
          });

          gaEventTracker(ACTIONS.LOAN, LABELS.INIT);

          toast({
            render: (props) => (
              <ToastSuccessCard
                title={i18n.toastLoanSuccess}
                txn={receipt}
                {...props}
              />
            ),
            position: 'top-right',
            duration: 9000,
            isClosable: true,
          });
        })
        .catch((error) => {
          logError(error);
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

  const [transferApprovalStatus, setTransferApprovalStatus] =
    useState<string>('READY');
  const onApproveTransfer = async () => {
    await grantApproval({
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
    if (!hasApproval && hasCheckedApproval) {
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
          {transferApprovalStatus === 'PENDING' ? (
            <LoadingIndicator size="xs" />
          ) : (
            i18n.allowButton
          )}
        </Button>
      );
    }
  };

  const renderDealTerms = () => {
    return (
      <Flex
        width="100%"
        flexDir="column"
        border="1px solid rgba(101, 101, 101, 0.2)"
        borderRadius="15px"
      >
        <Box
          borderBottom="1px solid"
          borderColor="rgba(101, 101, 101, 0.2)"
          bg="white"
          borderRadius="15px 15px 0 0"
          textAlign="center"
          w="100%"
        >
          <Text color="solid.gray0" textTransform="uppercase">
            {i18n.dealTermsLabel}
          </Text>
        </Box>
        <Box p="10px">
          <Grid
            gridTemplateColumns="repeat(2, minmax(0, 1fr))"
            gridColumnGap="20px"
            w="100%"
            borderColor="solid.lightPurple"
            textAlign="center"
            bgColor="solid.white"
          >
            <Flex flexDir="column" alignItems="center">
              <Text
                fontSize="sm"
                color="solid.gray0"
                mr="3px"
                mt="30px"
                textTransform="uppercase"
              >
                {i18n.dealTermsLabel}
              </Text>
              <Flex alignItems="center">
                <Text ml="6px" fontSize="3.5xl">
                  {fmtOfferAmount}Ξ
                </Text>
              </Flex>
              <Text fontSize="sm" color="solid.black" mt="5px">
                for{' '}
                <Text as="span" fontWeight="bold">
                  {offer.durationDays}
                </Text>{' '}
                days at{' '}
                <Text as="span" fontWeight="bold">
                  {offer.aprPercentage}% APR
                </Text>
              </Text>
            </Flex>

            <Flex flexDir="column" alignItems="center">
              <Flex alignItems="center" mt="30px">
                <Text
                  fontSize="sm"
                  color="solid.gray0"
                  mr="3px"
                  textTransform="uppercase"
                >
                  {i18n.totalInterest}
                </Text>
                <Tooltip
                  hasArrow
                  textAlign="center"
                  label="All loans are subject to a minimum of 00.25% interest."
                >
                  <QuestionOutlineIcon color="gray.500" />
                </Tooltip>
              </Flex>

              <Flex alignItems="center">
                <Text ml="6px" fontSize="3.5xl">
                  {formatEther(totalInterest).substring(0, 4)}Ξ
                </Text>
              </Flex>
              <Text fontSize="sm" color="solid.black" mb="20px">
                <Text as="span" fontWeight="bold">
                  {concatForDisplay(formatEther(totalBorrowed))}Ξ{' '}
                </Text>
                {i18n.totalBorrowed}
              </Text>
            </Flex>
          </Grid>
        </Box>
      </Flex>
    );
  };

  const renderLoanButton = () => {
    return (
      <Button
        isDisabled={!hasApproval && hasCheckedApproval}
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
      {renderDealTerms()}

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
