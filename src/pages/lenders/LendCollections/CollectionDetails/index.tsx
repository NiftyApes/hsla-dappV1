import { Box, Center, Grid, GridItem } from '@chakra-ui/react';
import React, { useState } from 'react';

import { useParams } from 'react-router-dom';
import CollectionHeader from './CollectionHeader';
import CreateCollectionOffer from './CreateCollection';
import OfferBook from './OfferBook';

const CollectionDetailsModal: React.FC = () => {
  const { collectionAddress } = useParams();

  const [collectionOfferAmt, setCollectionOfferAmt] = useState<string>('');
  const [apr, setApr] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [expiration, setExpiration] = useState<string>('30');
  const [floorTermLimit, setFloorTermLimit] = useState('5');
  const [newlyAddedOfferHashes, setNewlyAddedOfferHashes] = useState<string[]>(
    [],
  );

  if (!collectionAddress) {
    return null;
  }

  return (
    <Center>
      <Box minW="1120px" maxW="1600px">
        <CollectionHeader />
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
              floorTermLimit={floorTermLimit}
              setFloorTermLimit={setFloorTermLimit}
              nftContractAddress={collectionAddress}
              addNewlyAddedOfferHash={(offerHash: string) => {
                setNewlyAddedOfferHashes([...newlyAddedOfferHashes, offerHash]);
              }}
            />
          </GridItem>
        </Grid>
      </Box>
    </Center>
  );
};

export default CollectionDetailsModal;
