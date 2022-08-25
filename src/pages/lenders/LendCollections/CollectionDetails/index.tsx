import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

import Icon from 'components/atoms/Icon';
import { useParams } from 'react-router-dom';
import YourCollectibleJSON from '../../../../generated/deployments/localhost/YourCollectible.json';
import CreateCollectionOffer from './CreateCollection';
import OfferBook from './OfferBook';

const CollectionDetailsModal: React.FC = () => {
  const { collectionAddress } = useParams();

  const [collectionOfferAmt, setCollectionOfferAmt] = useState<string>('');
  const [apr, setApr] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [expiration, setExpiration] = useState<string>('1_DAY');
  const [newlyAddedOfferHashes, setNewlyAddedOfferHashes] = useState<string[]>([]);

  return (
    <Box minW="1120px" maxW="1600px">
      <Flex alignItems="center" justifyContent="space-between" mt="15px" px="15px" mb="40px">
        <Flex alignItems="center">
          <Text fontSize="xl" fontWeight="bold" mr="8px">
            {collectionAddress}
          </Text>
          <Icon name="etherscan" size={22} mr="4px" />
          <Icon name="os" size={25} />
        </Flex>
      </Flex>
      <Grid
        mt="16px"
        gridTemplateColumns="max(1140*0.60px, min(60vw, 1600*0.60px)) 1fr"
        columnGap="8px"
        px="20px"
      >
        <GridItem>
          <OfferBook
            collectionOfferAmt={collectionOfferAmt}
            apr={apr}
            duration={duration}
            expiration={expiration}
            newlyAddedOfferHashes={newlyAddedOfferHashes}
          />
        </GridItem>
        <GridItem>
          <CreateCollectionOffer
            collectionOfferAmt={collectionOfferAmt}
            setCollectionOfferAmt={setCollectionOfferAmt}
            apr={apr}
            setApr={setApr}
            duration={duration}
            setDuration={setDuration}
            expiration={expiration}
            setExpiration={setExpiration}
            nftContractAddress={YourCollectibleJSON.address}
            addNewlyAddedOfferHash={(offerHash: string) => {
              setNewlyAddedOfferHashes([...newlyAddedOfferHashes, offerHash]);
            }}
          />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default CollectionDetailsModal;