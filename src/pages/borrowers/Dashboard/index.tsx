/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
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

import TopCard from 'components/molecules/DashboardTopCard';
import { formatEther } from 'ethers/lib/utils';
import _ from 'lodash';
import { BigNumber } from 'ethers';
import { useNavigate } from 'react-router-dom';
import LoanTable from './LoanTable';
import LoadingIndicator from '../../../components/atoms/LoadingIndicator';
import NFTCardHeader from '../../../components/cards/NFTCardHeader';
import { LoanAuction } from '../../../loan';
import { useActiveLoansForBorrower } from '../../../hooks/useActiveLoansForBorrower';
import BorrowLoanRepayCard from '../../../components/molecules/BorrowLoanRepayCard';

import { useWalletAddress } from '../../../hooks/useWalletAddress';

const i18n = {
  repayLoanHeader: 'repay loan on ',
};

const Dashboard: React.FC = () => {
  const walletAddress = useWalletAddress();
  const activeLoans = useActiveLoansForBorrower();
  const navigate = useNavigate();

  const {
    isOpen: isRepayLoanOpen,
    onOpen: onRepayLoanOpen,
    onClose: onRepayLoanClose,
  } = useDisclosure();

  const [loan, setLoan] = useState<LoanAuction | undefined>();

  if (_.isUndefined(activeLoans)) {
    return (
      <Center>
        <LoadingIndicator />
      </Center>
    );
  }

  const loanCount = activeLoans.length;
  const loanTotal = activeLoans.reduce(
    (acc: BigNumber, loan: LoanAuction) => loan.amount.add(acc),
    0,
  );
  const interestTotal = activeLoans.reduce(
    (acc: BigNumber, loan: LoanAuction) =>
      loan.accumulatedLenderInterest
        .add(loan.accumulatedPaidProtocolInterest)
        .add(acc),
    0,
  );

  const onRepayLoan = (loan: LoanAuction) => {
    setLoan(loan);
    onRepayLoanOpen();
  };

  // No active loans
  if (loanCount === 0) {
    return (
      <Alert
        status="info"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          No Active Loans
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          Go ahead and{' '}
          <Text as="u">
            <Link onClick={() => navigate(`/borrowers/${walletAddress}`)}>
              borrow
            </Link>
          </Text>{' '}
          some ETH against your NFTs
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Box>
      <Flex justifyContent="space-evenly" flexWrap="wrap" gap="24px" p="18px">
        <TopCard desc="ACTIVE LOANs">
          <Text fontSize="7xl">{loanCount}</Text>
        </TopCard>
        <TopCard desc="TOTAL BORROWED">
          <Text fontSize="7xl" ml="8px">
            {formatEther(loanTotal)}Ξ
          </Text>
        </TopCard>

        <TopCard desc="TOTAL INTEREST">
          <Text fontSize="7xl">{formatEther(interestTotal)}</Text>
        </TopCard>
      </Flex>

      <LoanTable loans={activeLoans} onClick={onRepayLoan} />

      {isRepayLoanOpen && loan && (
        <Modal isOpen onClose={onRepayLoanClose} size="xl">
          <ModalOverlay />
          <ModalContent p="5px">
            <NFTCardHeader
              tokenId={loan.nftId}
              contractAddress={loan.nftContractAddress}
              title={i18n.repayLoanHeader}
            />
            <BorrowLoanRepayCard loan={loan} onRepay={onRepayLoanClose} />
            <ModalCloseButton />
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default Dashboard;
