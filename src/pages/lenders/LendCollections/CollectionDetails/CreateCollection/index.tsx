import React, { useCallback } from 'react';
import { Box, Button, Flex, Radio, RadioGroup, Stack } from '@chakra-ui/react';

import { useEasyOfferForCollection } from 'hooks/useEasyOfferForCollection';
import Icon from 'components/atoms/Icon';
import { CreateCollectionOfferForm } from './CreateCollectionOfferForm';

type OfferTypes = 'offers' | 'token';
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
  setTokenId: React.Dispatch<React.SetStateAction<string>>;
  tokenId: string;
  setOfferType: React.Dispatch<React.SetStateAction<OfferTypes>>;
  offerType: OfferTypes;
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
  setTokenId,
  tokenId,
  offerType,
  setOfferType,
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
        <RadioGroup
          colorScheme="green"
          onChange={(newOfferType: OfferTypes) => setOfferType(newOfferType)}
          value={offerType}
        >
          <Stack direction="row" spacing={4}>
            <Radio value="offers">Collection</Radio>
            <Radio value="token">Individual Token</Radio>
          </Stack>
        </RadioGroup>

        {easyOfferApr <= 0 ? null : (
          <Flex alignItems="center">
            <Button
              leftIcon={<Icon color="primary.purple" name="edit" />}
              padding="8px 12px"
              onClick={onDraftTopOffer}
              color="primary.purple"
              variant="link"
              fontWeight="450"
              fontSize="16"
            >
              Draft Top Offer
            </Button>
          </Flex>
        )}
      </Flex>
      <CreateCollectionOfferForm
        type={offerType}
        nftContractAddress={nftContractAddress}
        collectionOfferAmt={collectionOfferAmt}
        setCollectionOfferAmt={setCollectionOfferAmt}
        setTokenId={setTokenId}
        tokenId={tokenId}
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
