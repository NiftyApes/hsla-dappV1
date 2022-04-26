import React from 'react';
import { Button, Flex, Grid, GridItem, ModalProps, Text } from '@chakra-ui/react';

import Modal from 'components/atoms/Modal/Modal';
import Icon from 'components/atoms/Icon';
import WalletInfo from 'components/molecules/WalletInfo';
import AddLiquidityCard from './AddLiquidityCard';
import AffectedOffers from './AffectedOffers';

const AddLiquidityModal: React.FC<Omit<ModalProps, 'children'>> = ({ onClose, ...restProps }) => {
  return (
    <Modal size="full" {...restProps}>
      <Flex alignItems="center" justifyContent="space-between" mt="15px" px="15px">
        <Flex alignItems="center">
          <Button variant="circle" bg="gray.100" mr="13px" p="8px" onClick={onClose}>
            <Icon name="arrow-left" size={16} />
          </Button>
          <Text fontSize="xl" fontWeight="bold">
            ADD LIQUIDITY
          </Text>
        </Flex>

        <WalletInfo />
      </Flex>

      <Grid gridTemplateColumns="repeat(2, minmax(0, 1fr))" columnGap="20px" mt="50px">
        <GridItem>
          <Text fontSize="lg" fontWeight="bold" color="solid.gray0" ml="20px" mb="18px">
            ADD LIQUIDITY
          </Text>
          <AddLiquidityCard />
        </GridItem>
        <GridItem>
          <Text fontSize="lg" fontWeight="bold" color="solid.gray0" ml="20px" mb="18px">
            AFFECTED OFFERS
          </Text>
          <AffectedOffers />
        </GridItem>
      </Grid>
    </Modal>
  );
};

export default AddLiquidityModal;
