import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import OffersTable from '../../../components/molecules/OffersTable';
import { NFT } from '../../../nft';
import { LoanOffer } from '../../../loan/model/LoanOffer';

interface callbackType {
  (offer: LoanOffer): void;
}

interface Props {
  nft: NFT;
  offers: Array<LoanOffer>;
  onOfferSelect: callbackType;
}

const Offers: React.FC<Props> = ({ offers, nft, onOfferSelect }) => {
  return (
    <Box p="5px" mb="5px">
      <Flex flexDir="column" alignItems="center">
        <OffersTable
          offers={Array.from(offers).sort(
            (a: LoanOffer, b: LoanOffer) => b.interestRatePerSecond - a.interestRatePerSecond,
          )}
          onClick={onOfferSelect}
        />
      </Flex>
    </Box>
  );
};

export default Offers;
