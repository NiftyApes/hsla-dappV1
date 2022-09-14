import React, { useState } from 'react';
import {
  Box,
  Center,
  Flex,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import TopCard from 'components/molecules/DashboardTopCard';
import LoanTable from './LoanTable';
import LoadingIndicator from '../../../components/atoms/LoadingIndicator';
import { useActiveLoansForBorrower } from '../../../hooks/useActiveLoansForBorrower';
import _ from 'lodash';
import { formatEther } from 'ethers/lib/utils';
import { BigNumber } from 'ethers';
import { LoanAuction } from '../../../loan';
import { CollateralHeader } from '../../../components/molecules/CollateralHeader';
import BorrowLoanRepayCard from '../../../components/molecules/BorrowLoanRepayCard';
import { NFT } from '../../../nft';

const i18n = {
  repayLoanHeader: 'repay loan on ',
};

const Dashboard: React.FC = () => {
  const activeLoans = useActiveLoansForBorrower();

  const {
    isOpen: isRepayLoanOpen,
    onOpen: onRepayLoanOpen,
    onClose: onRepayLoanClose,
  } = useDisclosure();

  const [loan, setLoan] = useState<LoanAuction | undefined>();
  const [nft, setNft] = useState<any>();

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
      loan.accumulatedLenderInterest.add(loan.accumulatedProtocolInterest).add(acc),
    0,
  );

  const onRepayLoan = (loan: LoanAuction, nft: NFT) => {
    setLoan(loan);
    setNft(nft);

    onRepayLoanOpen();
  };

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

      {isRepayLoanOpen && nft && loan && (
        <Modal isOpen={true} onClose={onRepayLoanClose} size="xl">
          <ModalOverlay />
          <ModalContent p="5px">
            <CollateralHeader title={i18n.repayLoanHeader} nft={nft} />
            <BorrowLoanRepayCard loan={loan} nft={nft} onRepay={onRepayLoanClose} />
            <ModalCloseButton />
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default Dashboard;
