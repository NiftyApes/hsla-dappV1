import { Box, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';

import { CreateCollectionOfferForm } from './CreateCollectionOfferForm';
import { SuccessfulOrderCreationModal } from './SuccessfulOrderCreationModal';

interface CreateCollectionOfferProps {
  nftContractAddress: string;
}

const CreateCollectionOffer: React.FC<any> = ({
  nftContractAddress,
  collectionOfferAmt,
  setCollectionOfferAmt,
  apr,
  setApr,
  duration,
  setDuration,
  expiration,
  setExpiration,
  addNewlyAddedOfferHash,
}: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box maxW="600px" sx={{ position: 'relative', left: '-40px', top: '-16px' }}>
      <Text fontWeight="bold" color="solid.gray0" mb="16px">
        CREATE FLOOR OFFER TERMS
      </Text>
      <CreateCollectionOfferForm
        nftContractAddress={nftContractAddress}
        collectionOfferAmt={collectionOfferAmt}
        setCollectionOfferAmt={setCollectionOfferAmt}
        apr={apr}
        setApr={setApr}
        duration={duration}
        setDuration={setDuration}
        expiration={expiration}
        setExpiration={setExpiration}
        addNewlyAddedOfferHash={addNewlyAddedOfferHash}
        openSuccessfulOrderCreationModal={onOpen}
      />
      <SuccessfulOrderCreationModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </Box>
  );
};

export default CreateCollectionOffer;
