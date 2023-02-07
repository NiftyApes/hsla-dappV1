import React from 'react';
import { Box, Text } from '@chakra-ui/react';

import { StealLoanForm } from './StealLoanForm';
import { OfferTypes } from '../constants';

interface StealLoanProps {
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
  offerType: OfferTypes;
  fetchedNFT: Record<string, any>;
}

const StealLoan: React.FC<StealLoanProps> = ({
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
  fetchedNFT,
}) => {
  return (
    <Box maxW="600px" sx={{ position: 'relative' }}>
      <Text
        fontWeight="bold"
        color="solid.gray0"
        textTransform="uppercase"
        sx={{ position: 'relative', top: '-16px', left: '4px' }}
      >
        Steal Loan
      </Text>
      <Text mb="42px">
        In order to refinance (aka, steal) this loan,
        <b>
          &nbsp;one term must be a +00.25% improvement on the original loan
          terms.
        </b>
      </Text>
      <StealLoanForm
        fetchedNFT={fetchedNFT}
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

export default StealLoan;
