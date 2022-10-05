import React from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { LoanAuction } from '../../../loan';
import { NFT } from '../../../nft';

import { NFTCardContainer } from '../NFTCard/components/NFTCardContainer';

import { formatEther } from 'ethers/lib/utils';
import { getAPR } from '../../../helpers/getAPR';
import { roundForDisplay } from '../../../helpers/roundForDisplay';
import { NFTCardContainerHeader } from '../NFTCard/components/NFTCardContainerHeader';

import CryptoIcon from 'components/atoms/CryptoIcon';
import BorrowLoanRepayCard from '../BorrowLoanRepayCard';
import {
  getLoanDurationDays,
  getLoanTimeRemaining,
  isLoanDefaulted,
} from '../../../helpers/getDuration';
import NFTCardHeader from '../../cards/NFTCardHeader';

interface Props {
  loan: LoanAuction;
  nft: NFT;
}

const i18n = {
  actionButtonHelperText: 'What does this mean?',
  actionButtonText: 'repay loan',
  repayLoanHeader: 'repay loan on ',
  loanApr: (apr: number) => `${apr}% APR`,
  loanDuration: (duration: number) => `${duration} days`,
  activeLoan: 'active loan',
  defaultedLoan: 'defaulted',
  defaultedLoanStatus: 'Asset Has Not Been Seized',
};

const NFTActiveLoanCard: React.FC<Props> = ({ loan, nft }) => {
  const {
    isOpen: isRepayLoanOpen,
    onOpen: onRepayLoanOpen,
    onClose: onRepayLoanClose,
  } = useDisclosure();

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
          minHeight="128px"
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
            <Text textTransform="uppercase" fontWeight="bold" fontSize="md" color="white">
              {i18n.defaultedLoan}
            </Text>
          </Box>
          <Flex alignItems="center">
            <CryptoIcon symbol="eth" size={25} />
            <Text ml="6px" fontSize="3.5xl" fontWeight="bold" color="red.600">
              {formatEther(loan.amount)}Ξ
            </Text>
          </Flex>

          <Text fontSize="md" color="red.600" fontWeight="bold">
            {i18n.defaultedLoanStatus}
          </Text>
        </Flex>

        <Button
          borderRadius="8px"
          colorScheme="red"
          py="6px"
          size="lg"
          textTransform="uppercase"
          variant="solid"
          w="100%"
          onClick={onRepayLoanOpen}
        >
          {i18n.actionButtonText}
        </Button>

        <Center mt="8px" mb="8px">
          {i18n.actionButtonHelperText}
        </Center>
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
          mb="8px"
        >
          <Box
            borderBottom="1px solid"
            borderColor="orange"
            bg="white"
            borderRadius="8px 8px 0 0"
            textAlign="center"
            w="100%"
          >
            <Text textTransform="uppercase" fontWeight="bold" fontSize="md" color="orange.400">
              {i18n.activeLoan}
            </Text>
          </Box>
          <Flex alignItems="center">
            <CryptoIcon symbol={'eth'} size={25} />
            <Text ml="6px" fontSize="3.5xl" fontWeight="bold">
              {formatEther(loan.amount)}Ξ
            </Text>
          </Flex>

          <Text fontSize="lg" color="solid.gray0">
            <Text as="span" color="solid.black" fontWeight="semibold">
              {getLoanDurationDays(loan)}
            </Text>
            &nbsp;at&nbsp;
            <Text as="span" color="solid.black" fontWeight="semibold">
              {i18n.loanApr(apr)}
            </Text>
          </Text>
          <Text color="solid.black" fontSize="sm">
            {getLoanTimeRemaining(loan)} remaining...
          </Text>
        </Flex>

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

        <Center mt="8px" mb="8px">
          {i18n.actionButtonHelperText}
        </Center>
      </>
    );
  };

  return (
    <NFTCardContainer>
      <NFTCardContainerHeader
        img={nft.image}
        tokenId={nft.id}
        tokenName={nft.name}
        collectionName={nft.collectionName}
      >
        <>
          {isLoanDefaulted(loan) ? renderDefaultedLoan() : renderActiveLoan()}

          {isRepayLoanOpen && (
            <Modal isOpen={true} onClose={onRepayLoanClose} size="xl">
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
        </>
      </NFTCardContainerHeader>
    </NFTCardContainer>
  );
};

export default NFTActiveLoanCard;
