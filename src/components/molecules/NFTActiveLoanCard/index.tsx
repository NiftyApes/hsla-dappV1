import {
  Box,
  Button,
  Center,
  Flex,
  Link,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';

import { formatEther } from 'ethers/lib/utils';
import { LoanAuction, LoanOffer } from '../../../loan';
import { NFT } from '../../../nft';

import { NFTCardContainer } from '../NFTCard/components/NFTCardContainer';

import { getAPR } from '../../../helpers/getAPR';
import { roundForDisplay } from '../../../helpers/roundForDisplay';
import { NFTCardContainerHeader } from '../NFTCard/components/NFTCardContainerHeader';

import {
  getLoanTimeRemaining,
  isLoanDefaulted,
} from '../../../helpers/getDuration';
import NFTCardHeader from '../../cards/NFTCardHeader';
import BorrowLoanRepayCard from '../BorrowLoanRepayCard';
import BorrowLoanRolloverCard from '../BorrowLoanRolloverCard';
import WithdrawButton from '../WithdrawButton';

interface Props {
  loan: LoanAuction;
  nft: NFT;
  offers: Array<LoanOffer>;
}

const i18n = {
  actionButtonHelperText: 'What does this mean?',
  actionButtonText: 'repay',
  rolloverButtonText: 'rollover',
  repayLoanHeader: 'repay loan on ',
  rolloverLoanHeader: 'rollover loan for',
  loanApr: (apr: number) => `${apr}%`,
  loanDuration: (duration: number) => `${duration} days`,
  activeLoan: 'active loan',
  defaultedLoan: 'defaulting',
};

const NFTActiveLoanCard: React.FC<Props> = ({ loan, nft, offers }) => {
  const {
    isOpen: isRepayLoanOpen,
    onOpen: onRepayLoanOpen,
    onClose: onRepayLoanClose,
  } = useDisclosure({ id: 'repay' });

  const {
    isOpen: isRolloverLoanOpen,
    onOpen: onRolloverLoanOpen,
    onClose: onRolloverLoanClose,
  } = useDisclosure({ id: 'rollover' });

  const { amount, interestRatePerSecond: irps } = loan;

  const apr = roundForDisplay(
    getAPR({
      amount: Number(amount.toString()),
      interestRatePerSecond: irps.toNumber(),
    }),
  );

  const renderDefaultedLoan = () => {
    return (
      <>
        <Flex
          flexDir="column"
          alignItems="center"
          borderRadius="8px"
          border="1px solid"
          borderColor="red.300"
          bg="red.50"
          w="100%"
          mt="8px"
          mb="8px"
        >
          <Box
            borderBottom="1px solid"
            borderColor="red.500"
            bg="red.500"
            borderRadius="8px 8px 0 0"
            textAlign="center"
            w="100%"
          >
            <Text
              textTransform="uppercase"
              fontWeight="bold"
              fontSize="sm"
              color="white"
            >
              {i18n.defaultedLoan}
            </Text>
          </Box>
          <Flex alignItems="center">
            <Text ml="6px" fontSize="4xl">
              {formatEther(loan.amount)}Ξ
            </Text>
          </Flex>
        </Flex>

        <Button
          borderRadius="8px"
          colorScheme="red"
          py="6px"
          size="sm"
          textTransform="uppercase"
          variant="solid"
          w="100%"
          p="1.32rem"
          onClick={onRepayLoanOpen}
        >
          {i18n.actionButtonText}
        </Button>
      </>
    );
  };

  const renderActiveLoan = () => {
    return (
      <>
        <Flex
          flexDir="column"
          alignItems="center"
          borderRadius="8px"
          border="1px solid"
          borderColor="orange"
          minHeight="128px"
          bg="orange.50"
          w="100%"
          mt="8px"
        >
          <Box
            borderBottom="1px solid"
            borderColor="orange"
            bg="white"
            borderRadius="8px 8px 0 0"
            textAlign="center"
            w="100%"
          >
            <Text
              textTransform="uppercase"
              fontWeight="bold"
              fontSize="sm"
              color="orange.400"
            >
              {i18n.activeLoan}
            </Text>
          </Box>
          {loan.amountDrawn === loan.amount && (
            <Flex alignItems="center">
              <Text ml="6px" fontSize="4xl">
                {formatEther(loan.amount)}Ξ
              </Text>
            </Flex>
          )}
          {loan.amountDrawn !== loan.amount && (
            <Flex alignItems="center" p="4px">
              <Text ml="6px" fontSize="4xl">
                {roundForDisplay(Number(formatEther(loan.amountDrawn)))}Ξ
              </Text>
            </Flex>
          )}

          <Flex justify="space-evenly" w="100%">
            <Flex direction="column" align="center">
              <Text
                as="span"
                fontSize="xs"
                color="solid.black"
                fontWeight="semibold"
                textTransform="uppercase"
              >
                MAX
              </Text>
              <Text>
                {' '}
                {roundForDisplay(Number(formatEther(loan.amount)))}Ξ{' '}
              </Text>
            </Flex>
            <Flex direction="column" align="center">
              <Text
                as="span"
                fontSize="xs"
                color="solid.black"
                fontWeight="semibold"
                textTransform="uppercase"
              >
                APR
              </Text>
              <Text>{i18n.loanApr(apr)}</Text>
            </Flex>
            <Flex direction="column" align="center">
              <Text
                as="span"
                fontSize="xs"
                color="solid.black"
                fontWeight="semibold"
                textTransform="uppercase"
              >
                Payment Due
              </Text>
              <Text>{getLoanTimeRemaining(loan)}</Text>
            </Flex>
          </Flex>
        </Flex>
        {
          /* only show rollover modal is >0 signature offers */ offers.filter(
            (o) => o.signature,
          )?.length > 0 ? (
            <Flex
              className="overflow"
              w="100%"
              bg="white"
              position="absolute"
              bottom="-60px"
              width="calc(100% - 16px)"
              padding="0.5em 0"
              transition="all .25s ease-in-out"
              borderTop="1px solid transparent"
              sx={{
                '.nftContainer:hover &': {
                  bottom: `0px`,
                  borderColor: 'orange',
                },
              }}
            >
              <Button
                borderRadius="8px"
                colorScheme="orange"
                py="6px"
                size="sm"
                textTransform="uppercase"
                w="65%"
                p="1.32rem"
                onClick={onRolloverLoanOpen}
              >
                {i18n.rolloverButtonText}
              </Button>
              <Center
                mt="8px"
                mb="8px"
                w="35%"
                textAlign="center"
                textTransform="uppercase"
                fontWeight="Bold"
              >
                <Link
                  fontSize="14px"
                  color="orange.500"
                  onClick={onRepayLoanOpen}
                >
                  {i18n.actionButtonText}
                </Link>
              </Center>
            </Flex>
          ) : (
            <Button
              borderRadius="8px"
              colorScheme="orange"
              py="6px"
              size="lg"
              textTransform="uppercase"
              variant="solid"
              w="100%"
              onClick={onRepayLoanOpen}
            >
              {i18n.actionButtonText}
            </Button>
          )
        }
      </>
    );
  };

  return (
    <NFTCardContainer>
      <>
        <WithdrawButton amount={loan.amount} amountDrawn={loan.amountDrawn} />
        <NFTCardContainerHeader
          attributes={nft.attributes}
          collectionName={nft.collectionName}
          contractAddress={nft.contractAddress}
          img={nft.image}
          tokenId={nft.id}
          tokenName={nft.name}
        >
          <>
            {isLoanDefaulted(loan) ? renderDefaultedLoan() : renderActiveLoan()}

            {isRepayLoanOpen && (
              <Modal isOpen onClose={onRepayLoanClose} size="xl">
                <ModalOverlay />
                <ModalContent p="5px">
                  <NFTCardHeader
                    nft={nft}
                    contractAddress={nft.contractAddress}
                    tokenId={nft.id}
                    title={i18n.repayLoanHeader}
                  />
                  <BorrowLoanRepayCard loan={loan} onRepay={onRepayLoanClose} />
                  <ModalCloseButton />
                </ModalContent>
              </Modal>
            )}

            {isRolloverLoanOpen && (
              <Modal isOpen onClose={onRolloverLoanClose} size="xl">
                <ModalOverlay />
                <ModalContent p="5px">
                  <NFTCardHeader
                    nft={nft}
                    contractAddress={nft.contractAddress}
                    tokenId={nft.id}
                    title={`${i18n.rolloverLoanHeader} ${nft.collectionName} ${
                      nft.id ? `#${nft.id}` : ''
                    }`}
                  />
                  <BorrowLoanRolloverCard
                    nft={nft}
                    loan={loan}
                    onRollover={onRolloverLoanClose}
                    offers={offers}
                  />
                  <ModalCloseButton />
                </ModalContent>
              </Modal>
            )}
          </>
        </NFTCardContainerHeader>
      </>
    </NFTCardContainer>
  );
};

export default NFTActiveLoanCard;
