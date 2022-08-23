import React from 'react';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import OffersTable from '../../../components/molecules/OffersTable';
import { NFT } from '../../../nft';
import { LoanOffer } from '../../../loan/model/LoanOffer';
import Collateral from '../../../components/molecules/Collateral';

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
    <Box>
      <Grid gridTemplateColumns="repeat(6, minmax(0, 1fr))" flexGrow={1} p="13px" columnGap="22px">
        <GridItem colSpan={1}>
          <Collateral collectionName="XXXX" tokenName={nft.name} img={nft.image} />
        </GridItem>
        <GridItem colSpan={5}>
          <OffersTable
            offers={Array.from(offers).sort(
              (a: LoanOffer, b: LoanOffer) => a.interestRatePerSecond - b.interestRatePerSecond,
            )}
            onClick={onOfferSelect}
          />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Offers;
