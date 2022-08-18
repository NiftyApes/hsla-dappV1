import React, { useEffect } from 'react';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import Collateral from '../../../components/molecules/Collateral';
import OffersTable from '../../../components/molecules/OffersTable';
import { useParams } from 'react-router-dom';
import { fetchLoanOffersByNFT, useLoanOffersByNFT } from '../../../loan';
import { getNFTHash, nft, NFT } from '../../../nft';
import { useAppDispatch } from '../../../app/hooks';
import LoanOffer from '../../../loan/model/LoanOffer';

const Offers: React.FC = () => {
  const { id: contractAddress, tokenId } = useParams<{ id: string; tokenId: string }>();

  const dispatch = useAppDispatch();

  const item: NFT = {
    id: tokenId || '',
    contractAddress: contractAddress || '',

    attributes: [],
    description: '',
    external_url: '',
    image: '',
    name: '',
    owner: '',
  };

  console.log('HASH', getNFTHash(item));
  //
  // const loanOffers:[] = [];
  // const fetchingOffers = false;

  const { content: loanOffers, fetching: fetchingOffers } = useLoanOffersByNFT(item);

  useEffect(() => {
    if (!loanOffers && !fetchingOffers) {
      console.log('Fetching nftss....');
      dispatch(fetchLoanOffersByNFT(item));
    }
  }, [getNFTHash(item), fetchingOffers]);

  if (!loanOffers || fetchingOffers) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box>
      {`${loanOffers.length} active offers`}
      <Grid gridTemplateColumns="repeat(6, minmax(0, 1fr))" flexGrow={1} p="13px" columnGap="22px">
        <GridItem colSpan={1}>
          <Collateral
            collectionName="Collection Name"
            tokenName="Token Name"
            img="/assets/mocks/bored_ape.png"
          />
        </GridItem>
        <GridItem colSpan={5}>
          <OffersTable />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Offers;
