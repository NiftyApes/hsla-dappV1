import React from 'react';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import Collateral from '../../../components/molecules/Collateral';
import OffersTable from '../../../components/molecules/OffersTable';
import { NFT } from '../../../nft';
import { LoanOffer } from '../../../loan/model/LoanOffer';
import { useExecuteLoanByBorrower } from '../../../hooks/useExecuteLoanByBorrower';

interface Props {
  nft: NFT;
  offers: Array<LoanOffer>;
}

const Offers: React.FC<Props> = ({ offers, nft }) => {
  // const {executeLoanByBorrower} = useExecuteLoanByBorrower({
  //     nftContractAddress: contract?.address,
  //     nftId: nft.id,
  //     offerHash: offer.OfferHash,
  //     floorTerm: offer.OfferTerms.FloorTerm,
  // });

  const onBorrow = (hash: string) => {
    console.log(hash);
  };

  return (
    <OffersTable
      offers={Array.from(offers).sort(
        (a: LoanOffer, b: LoanOffer) => a.interestRatePerSecond - b.interestRatePerSecond,
      )}
      onClick={onBorrow}
    />
    // <Box>
    //     <Grid gridTemplateColumns="repeat(6, minmax(0, 1fr))" flexGrow={1} p="13px" columnGap="22px">
    //         <GridItem colSpan={1}>
    //             <Collateral
    //                 collectionName="XXXX"
    //                 tokenName={nft.name}
    //                 img={nft.image}
    //             />
    //         </GridItem>
    //         <GridItem colSpan={5}>
    //             <OffersTable offers={offers} onClick={onBorrow}/>
    //         </GridItem>
    //     </Grid>
    // </Box>
  );
};

export default Offers;
