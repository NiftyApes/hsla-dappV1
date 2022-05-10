import React from 'react';
import { Button, Flex, Grid, GridItem, ModalProps, Text } from '@chakra-ui/react';

import Modal from 'components/atoms/Modal/Modal';
import Icon from 'components/atoms/Icon';
import WalletInfo from 'components/molecules/WalletInfo';
import Collateral from 'components/molecules/Collateral';
import RecentLoans from 'components/molecules/RecentLoans';
import OffersTable from 'components/molecules/OffersTable';

const BorrowerAllMatchingOffersModal: React.FC<Omit<ModalProps, 'children'>> = ({
  onClose,
  ...restProps
}) => {
  return (
    <Modal size="full" {...restProps}>
      <Flex alignItems="center" justifyContent="space-between" mt="15px" px="15px">
        <Flex alignItems="center">
          <Button variant="circle" bg="gray.100" mr="13px" p="8px" onClick={onClose}>
            <Icon name="arrow-left" size={16} />
          </Button>
          <Text fontSize="xl" fontWeight="bold">
            BROWSE ALL MATCHING OFFERS
          </Text>
        </Flex>

        <WalletInfo />
      </Flex>

      <Grid gridTemplateColumns="repeat(6, minmax(0, 1fr))" flexGrow={1} p="13px" columnGap="22px">
        <GridItem colSpan={1}>
          <Collateral
            collectionName="Collection Name"
            tokenName="Token Name"
            img="/assets/mocks/bored_ape.png"
          />
        </GridItem>
        <GridItem colSpan={3}>
          <OffersTable />
        </GridItem>
        <GridItem colSpan={2}>
          <RecentLoans />
        </GridItem>
      </Grid>
    </Modal>
  );
};

export default BorrowerAllMatchingOffersModal;
