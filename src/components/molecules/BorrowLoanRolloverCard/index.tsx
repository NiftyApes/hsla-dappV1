import {
  Box,
  Button,
  Divider,
  Flex,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import CryptoIcon from 'components/atoms/CryptoIcon';
import NFTCardHeader from 'components/cards/NFTCardHeader';
import { ToastSuccessCard } from 'components/cards/ToastSuccessCard';
import { ACTIONS, CATEGORIES, LABELS } from 'constants/googleAnalytics';
import { BigNumber, ethers } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import { getAPR } from 'helpers/getAPR';
import { useAnalyticsEventTracker } from 'hooks/useAnalyticsEventTracker';
import { usePartiallyRepayLoanByBorrower } from 'hooks/usePartiallyRepayLoan';
import { useRefinanceByBorrower } from 'hooks/useRefinanceLoanByBorrower';
import JSConfetti from 'js-confetti';
import { logError } from 'logging/logError';
import Offers from 'pages/borrowers/Offers';
import React, { useCallback, useMemo, useState } from 'react';
import { humanizeContractError } from '../../../helpers/errorsMap';
import {
  getLoanTimeRemaining,
  getOfferTimeRemaining,
} from '../../../helpers/getDuration';
import { roundForDisplay } from '../../../helpers/roundForDisplay';
import { useCalculateInterestAccrued } from '../../../hooks/useCalculateInterestAccrued';
import {
  getMostSimilarOfferForRollover,
  LoanAuction,
  LoanOffer,
} from '../../../loan';
import { NFT } from '../../../nft';
import LoadingIndicator from '../../atoms/LoadingIndicator';
import RolloverLoanVisual from '../RolloverLoanVisual';

interface CallbackType {
  (): void;
}

interface Props {
  loan: LoanAuction;
  onRollover: CallbackType;
  offers: Array<LoanOffer>;
  nft: NFT;
}

const i18n = {
  actionButton: 'rollover loan',
  footerText: 'Next payment due 📅 ',
  loanBorrowed: 'Total borrowed',
  loanInformation: 'rollover info',
  loanInterest: 'Interest owed ',
  loanOwed: 'Total Owed',
  loanDefaulted: 'Loan Defaulted',
  loanActive: 'Time Remaining',
  paymentType: 'max payment',
  toastSuccess: 'Loan repaid successfully',
  partialRepayToastSuccess: 'Partial repayment successful',
  refinanceByBorrowerToastSuccess: 'Loan rollover successful',
  loanApr: (apr: number) => `${apr}%`,
  allOffers: 'all offers for',
};

const BorrowLoanRolloverCard: React.FC<Props> = ({
  loan,
  onRollover,
  offers,
  nft,
}) => {
  const gaEventTracker = useAnalyticsEventTracker(CATEGORIES.BORROWERS);
  const toast = useToast();

  // We're only frontend-supporting rollovers for signature offers for now
  const bestOffer: LoanOffer = getMostSimilarOfferForRollover({
    loanOfferAmount: loan.amount,
    offers: offers.filter((o) => o.signature),
  });

  const [rolloverOffer, setRolloverOffer] = useState<LoanOffer>(bestOffer);

  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const {
    isOpen: isAllOffersOpen,
    onOpen: onAllOffersOpen,
    onClose: onAllOffersClose,
  } = useDisclosure();

  const onSelectOffer = useCallback(
    (offer: LoanOffer) => {
      setRolloverOffer(offer);
      onAllOffersClose();
    },
    [onAllOffersClose],
  );

  const rolloverOfferAmount = useMemo(() => {
    return ethers.utils.formatEther(
      BigNumber.from(String(rolloverOffer.OfferTerms.Amount)),
    );
  }, [rolloverOffer.OfferTerms.Amount]);

  const jsConfetti = new JSConfetti();
  const [isExecuting, setExecuting] = useState<boolean>(false);
  const [isExecutingPartialRepayment, setExecutingPartialRepayment] =
    useState<boolean>(false);

  const accruedInterest: Array<BigNumber> = useCalculateInterestAccrued({
    nftContractAddress: loan.nftContractAddress,
    nftId: loan.nftId,
  });

  const { amount, amountDrawn, interestRatePerSecond: irps } = loan;

  // Note: When running this on a local chain, the interest will be 0 until a new block is created.
  // Simply create a new transaction and the correct amount of interest will show up
  let totalAccruedInterest: BigNumber = accruedInterest
    ? accruedInterest[0].add(accruedInterest[1])
    : BigNumber.from(0);

  // 25 basis points of the amount drawn
  const basisPoints: BigNumber = amountDrawn.mul(25).div(10000);

  // Add basis points if total interest is less than
  const earlyReplay = totalAccruedInterest.lt(basisPoints);

  if (earlyReplay) {
    totalAccruedInterest = basisPoints;
  }

  // Minimum interest owed 0.0025

  // Additional 20 minutes worth of interest
  const padding: BigNumber = irps.mul(3600);
  const totalAccruedInterestInWei: BigNumber = totalAccruedInterest;
  const apr = roundForDisplay(
    getAPR({
      amount: Number(amount.toString()),
      interestRatePerSecond: irps.toNumber(),
    }),
  );

  const currentPrincipal = parseFloat(formatEther(loan.amountDrawn));

  const totalAccruedInterestInEth = parseFloat(
    formatEther(totalAccruedInterestInWei),
  );

  const deltaCalculation = useMemo(() => {
    const rolloverPrincipal = parseFloat(rolloverOfferAmount);

    const paddingInEth = parseFloat(formatEther(padding)) + 0.01;

    if (rolloverPrincipal >= currentPrincipal + totalAccruedInterestInEth) {
      return 0;
    }

    return (
      currentPrincipal +
      totalAccruedInterestInEth +
      paddingInEth -
      rolloverPrincipal
    );
  }, [
    currentPrincipal,
    totalAccruedInterestInEth,
    rolloverOfferAmount,
    padding,
  ]);

  const { partiallyRepayLoanByBorrower } = usePartiallyRepayLoanByBorrower({
    nftContractAddress: loan.nftContractAddress,
    nftId: loan.nftId,
    amount: deltaCalculation,
  });

  const { refinanceLoanByBorrower } = useRefinanceByBorrower({
    nftContractAddress: loan.nftContractAddress,
    nftId: loan.nftId,
    offer: rolloverOffer,
    signature: rolloverOffer.signature as string,
    expectedLastUpdatedTimestamp: loan.lastUpdatedTimestamp,
  });

  const onPartiallyRepayLoan = async () => {
    if (partiallyRepayLoanByBorrower) {
      setExecutingPartialRepayment(true);

      await partiallyRepayLoanByBorrower()
        .then(({ receipt }: any) => {
          gaEventTracker(ACTIONS.LOAN, LABELS.PARTIALLY_REPLAY);

          toast({
            render: (props) => (
              <ToastSuccessCard
                title={i18n.partialRepayToastSuccess}
                txn={receipt}
                {...props}
              />
            ),
            position: 'top-right',
            duration: 9000,
            isClosable: true,
          });
          setExecutingPartialRepayment(false);
          setPaymentSuccess(true);
        })
        .catch((error) => {
          logError(error);
          toast({
            title: `Error: ${humanizeContractError(error.reason)}`,
            status: 'error',
            position: 'top-right',
            isClosable: true,
          });
          setExecutingPartialRepayment(false);
        });
    }
  };

  const onRefinanceLoanByBorrower = async () => {
    if (refinanceLoanByBorrower) {
      setExecuting(true);

      await refinanceLoanByBorrower()
        .then(({ receipt }: any) => {
          gaEventTracker(ACTIONS.LOAN, LABELS.REFINANCE_BY_BORROWER);

          jsConfetti.addConfetti({
            emojis: ['🍌'],
            emojiSize: 80,
            confettiNumber: 50,
          });

          toast({
            render: (props) => (
              <ToastSuccessCard
                title={i18n.refinanceByBorrowerToastSuccess}
                txn={receipt}
                {...props}
              />
            ),
            position: 'top-right',
            duration: 9000,
            isClosable: true,
          });
          setExecutingPartialRepayment(false);
          onRollover();
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

  return (
    <>
      <Box>
        <Flex flexDir="column" width="100%" p="5px">
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
                {i18n.loanInformation}
              </Text>
            </Box>
            <Box p="10px">
              <TableContainer>
                <Table variant="simple">
                  <Tbody>
                    <Tr>
                      <Td
                        fontSize="14"
                        textTransform="uppercase"
                        color="gray.600"
                      >
                        current
                      </Td>
                      <Td>
                        <Flex alignItems="center" gap="2">
                          <CryptoIcon symbol="eth" size={24} />
                          <Text>
                            {roundForDisplay(
                              Number(formatEther(loan.amountDrawn)),
                            )}
                            Ξ
                          </Text>
                        </Flex>
                      </Td>
                      <Td>{getLoanTimeRemaining(loan)}</Td>
                      <Td>{i18n.loanApr(apr)}</Td>
                      <Td />
                    </Tr>
                    <Tr>
                      <Td
                        fontSize="14"
                        textTransform="uppercase"
                        color="gray.600"
                      >
                        rollover
                      </Td>
                      <Td>
                        <Flex alignItems="center" gap="2">
                          <CryptoIcon symbol="eth" size={24} />
                          <Text>{Number(rolloverOfferAmount).toFixed(4)}Ξ</Text>
                        </Flex>
                      </Td>
                      <Td>{getOfferTimeRemaining(rolloverOffer)}</Td>
                      <Td>{i18n.loanApr(rolloverOffer.aprPercentage)}</Td>
                      <Td>
                        <Button
                          onClick={onAllOffersOpen}
                          variant="link"
                          textTransform="uppercase"
                          colorScheme="purple"
                          fontSize="14"
                        >
                          swap
                        </Button>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
              <RolloverLoanVisual loan={loan} offer={rolloverOffer} />
              <Divider marginY={4} borderColor="gray.400" />
              <Flex
                marginX="4"
                justifyContent="space-between"
                alignItems="center"
              >
                <Flex alignItems="center">
                  {deltaCalculation === 0 ? (
                    <Text fontSize={24}>👍</Text>
                  ) : (
                    <CryptoIcon symbol="eth" size={24} />
                  )}
                  <Text
                    ml="4px"
                    mr="14px"
                    color="solid.gray0"
                    fontWeight="bold"
                  >
                    ETH
                  </Text>
                  <Text fontSize="3.5xl" noOfLines={1} maxWidth="200px">
                    {roundForDisplay(deltaCalculation)}Ξ
                  </Text>
                </Flex>
                {deltaCalculation === 0 ? (
                  <Button
                    borderWidth="2px"
                    borderRadius="15"
                    variant="outline"
                    padding="6"
                    _hover={{ backgroundColor: 'initial', cursor: 'default' }}
                    _active={{ backgroundColor: 'initial', cursor: 'default' }}
                  >
                    {paymentSuccess
                      ? '🥳 Payment Made 🎉'
                      : 'No Payment Needed'}
                  </Button>
                ) : (
                  <Button
                    borderWidth="2px"
                    borderRadius="15"
                    variant="outline"
                    colorScheme="purple"
                    padding="6"
                    onClick={onPartiallyRepayLoan}
                  >
                    {isExecutingPartialRepayment ? (
                      <LoadingIndicator size="xs" />
                    ) : (
                      'Make Payment'
                    )}
                  </Button>
                )}
              </Flex>
            </Box>
          </Flex>
          <Button
            disabled={deltaCalculation > 0}
            marginTop={4}
            marginBottom={1}
            borderRadius="8px"
            colorScheme="green"
            backgroundColor="#15e9a7"
            onClick={onRefinanceLoanByBorrower}
            py="6px"
            size="lg"
            textTransform="uppercase"
            variant="solid"
            w="100%"
          >
            {isExecuting ? (
              <LoadingIndicator color="#12D196" size="xs" />
            ) : (
              i18n.actionButton
            )}
          </Button>
        </Flex>
      </Box>
      {isAllOffersOpen && (
        <Modal isOpen onClose={onAllOffersClose} size="2xl">
          <ModalOverlay />
          <ModalContent p="5px">
            <NFTCardHeader
              contractAddress={nft.contractAddress}
              tokenId={nft.id}
              nft={nft}
              title={`All offers for ${nft.collectionName} ${
                nft.id ? `#${nft.id}` : ''
              }`}
            />
            <ModalCloseButton />
            <Offers
              variant="rollover"
              actionLabel="Borrow"
              offers={offers}
              onOfferSelect={onSelectOffer}
              loan={loan}
            />
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
export default BorrowLoanRolloverCard;
