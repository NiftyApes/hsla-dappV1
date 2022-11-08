import React, { useCallback } from 'react';
import { Box, Button, Flex, Text, Tooltip } from '@chakra-ui/react';
import { QuestionOutlineIcon } from '@chakra-ui/icons';

import { useEasyOfferForCollection } from 'hooks/useEasyOfferForCollection';
import Icon from 'components/atoms/Icon';
import { CreateCollectionOfferForm } from './CreateCollectionOfferForm';

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
  floorTermLimit: string;
  setFloorTermLimit: React.Dispatch<React.SetStateAction<string>>;
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
  floorTermLimit,
  setFloorTermLimit,
}) => {
  const { easyOfferAmount, easyOfferApr, easyOfferDuration } =
    useEasyOfferForCollection({
      nftContractAddress,
    });

  const onDraftTopOffer = useCallback(() => {
    setCollectionOfferAmt(String(easyOfferAmount));
    setApr(String(easyOfferApr));
    setDuration(String(easyOfferDuration));
  }, [easyOfferAmount, easyOfferApr, easyOfferDuration]);

  return (
    <Box maxW="600px" sx={{ position: 'relative', top: '-16px' }}>
      <Flex mb="16px" alignItems="center" justifyContent="space-between">
        <Text fontWeight="bold" color="solid.gray0">
          CREATE FLOOR OFFER TERMS
        </Text>
        {easyOfferApr <= 0 ? null : (
          <Flex alignItems="center">
            <Button
              leftIcon={<Icon color="primary.purple" name="edit" />}
              padding="8px 12px"
              disabled={easyOfferApr <= 0}
              onClick={onDraftTopOffer}
              color="primary.purple"
              variant="link"
              fontWeight="450"
            >
              Draft Top Offer
            </Button>
            <Tooltip
              size="md"
              hasArrow
              label="Auto-drafts a competitive offer based on offerbook data."
            >
              <QuestionOutlineIcon color="gray.500" />
            </Tooltip>
          </Flex>
        )}
      </Flex>
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
        floorTermLimit={floorTermLimit}
        setFloorTermLimit={setFloorTermLimit}
      />
    </Box>
  );
};

export default CreateCollectionOffer;
