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

import CryptoIcon from 'components/atoms/CryptoIcon';
import { Contract } from 'ethers';

import { NFTCardContainer } from '../NFTCard/components/NFTCardContainer';
import { NFTCardHeader } from '../NFTCard/components/NFTCardHeader';
import { useRepayLoanByBorrower } from '../../../hooks/useRepayLoan';
import moment from 'moment';
import { NFT } from '../../../nft';
import { CollateralHeader } from '../CollateralHeader';
import Offers from '../../../pages/borrowers/Offers';

interface Loan {
  amount: string;
  amountEth: number;
  amountDrawn: string;
  interestRatePerSecond: number;
  lenderInterest: string;
  loanBeginTimestamp: number;
  loanEndTimestamp: number;
  protocolInterest: string;
}

interface Props {
  collectionName: string;
  contract?: Contract;
  tokenId: string;
  img: string;
  loan: Loan;
  nft: NFT;
  tokenName: string;
}

const i18n = {
  actionButtonHelperText: 'What does this mean?',
  actionButtonText: 'repay loan',
  loanApr: (apr: number) => `${apr}% APR`,
  loanDuration: (duration: number) => `${duration} days`,
  loanStatus: 'active loan',
  loanTimeRemaining: (distance: string) => `${distance} remaining...`,
};

const NFTActiveLoanCard: React.FC<Props> = ({
  collectionName,
  contract,
  img,
  loan,
  nft,
  tokenId,
  tokenName,
}) => {
  const { repayLoanByBorrower } = useRepayLoanByBorrower({
    nftContractAddress: contract?.address,
    nftId: tokenId,
  });

  const {
    isOpen: isRepayLoanOpen,
    onOpen: onRepayLoanOpen,
    onClose: onRepayLoanClose,
  } = useDisclosure();

  // TODO: Extract this into the utils common method
  const secondsInDay = 86400;
  const secondsInYear = 3.154e7;

  const apr = Math.round(((loan.interestRatePerSecond * secondsInYear) / loan.amountEth) * 100);
  const duration = Math.round((loan.loanEndTimestamp - loan.loanBeginTimestamp) / secondsInDay);
  const timeRemaining = moment(loan.loanEndTimestamp * 1000).toNow(true);

  // TODO: Wire me in
  const onRepayLoan = async () => {
    // if (repayLoanByBorrower) {
    //   await repayLoanByBorrower();
    // }
  };

  return (
    <NFTCardContainer>
      <NFTCardHeader
        img={img}
        tokenId={tokenId}
        tokenName={tokenName}
        collectionName={collectionName}
      >
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
                {i18n.loanStatus}
              </Text>
            </Box>
            <Flex alignItems="center">
              <CryptoIcon symbol={'eth'} size={25} />
              <Text ml="6px" fontSize="3.5xl" fontWeight="bold">
                {loan.amount}Ξ
              </Text>
            </Flex>

            <Text fontSize="lg" color="solid.gray0">
              <Text as="span" color="solid.black" fontWeight="semibold">
                {i18n.loanDuration(duration)}
              </Text>
              &nbsp;at&nbsp;
              <Text as="span" color="solid.black" fontWeight="semibold">
                {i18n.loanApr(apr)}
              </Text>
            </Text>
            <Text color="solid.black" fontSize="sm">
              {i18n.loanTimeRemaining(timeRemaining)}
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

          {isRepayLoanOpen && (
            <Modal isOpen={true} onClose={onRepayLoanClose} size="xl">
              <ModalOverlay />
              <ModalContent p="5px">
                <CollateralHeader title={'REPLAY'} nft={nft} />
                <ModalCloseButton />
              </ModalContent>
            </Modal>
          )}
        </>
      </NFTCardHeader>
    </NFTCardContainer>
  );
};

export default NFTActiveLoanCard;
