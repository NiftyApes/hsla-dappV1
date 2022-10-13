import { Box, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';

import { CreateCollectionOfferForm } from './CreateCollectionOfferForm';
import { SuccessfulOrderCreationModal } from './SuccessfulOrderCreationModal';

interface CreateCollectionOfferProps {
  nftContractAddress: string;
  collectionOfferAmt: string;
  setCollectionOfferAmt: React.Dispatch<React.SetStateAction<string>>;
  apr: string;
  setApr: React.Dispatch<React.SetStateAction<string>>;
  duration: string;
  setDuration: React.Dispatch<React.SetStateAction<string>>;
  expiration: string;
  setExpiration: React.Dispatch<React.SetStateAction<string>>;
  addNewlyAddedOfferHash: (offerHash: string) => void;
}

const CreateCollectionOffer: React.FC<CreateCollectionOfferProps> = ({
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
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      maxW="600px"
      sx={{ position: 'relative', left: '-40px', top: '-16px' }}
    >
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
      <SuccessfulOrderCreationModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default CreateCollectionOffer;
