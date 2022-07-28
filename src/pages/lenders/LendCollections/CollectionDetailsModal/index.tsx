import React from 'react';
import { Button, Flex, Grid, GridItem, Image, ModalProps, Text } from '@chakra-ui/react';

import Modal from 'components/atoms/Modal/Modal';
import WalletInfo from 'components/molecules/WalletInfo';
import Icon from 'components/atoms/Icon';
import MarketData from './MarketData';
import OfferBook from './OfferBook';
import CreateCollectionOffer from './CreateCollectionOffer';
//import YourCollectibleJSON from '../../../../generated/deployments/localhost/YourCollectible.json';

const nftContractAddress = 'test';

const CollectionDetailsModal: React.FC<Omit<ModalProps, 'children'>> = ({
  onClose,
  ...restProps
}) => {
  return (
    <Modal size="full" {...restProps}>
      <Flex alignItems="center" justifyContent="space-between" mt="15px" px="15px" mb="40px">
        <Flex alignItems="center">
          <Button variant="circle" bg="gray.100" mr="13px" p="8px" onClick={onClose}>
            <Icon name="arrow-left" size={16} />
          </Button>
          <Image
            src="/assets/mocks/bored_ape.png"
            alt="Collection"
            w="34px"
            h="34px"
            mr="9px"
            borderRadius="50%"
          />
          <Text fontSize="xl" fontWeight="bold" mr="8px">
            Bored Ape Yacht Club
          </Text>
          <Icon name="etherscan" size={22} mr="4px" />
          <Icon name="os" size={25} />
        </Flex>
        <WalletInfo />
      </Flex>

      <Grid gridTemplateColumns="repeat(3, minmax(0, 1fr))" columnGap="8px" px="20px">
        <GridItem>
          <MarketData />
        </GridItem>
        <GridItem>
          <OfferBook />
        </GridItem>
        <GridItem>
          <Text fontWeight="bold" color="solid.gray0" mb="16px">
            CREATE COLLECTION OFFER
          </Text>
          <CreateCollectionOffer nftContractAddress={nftContractAddress} />
        </GridItem>
      </Grid>
    </Modal>
  );
};

export default CollectionDetailsModal;
