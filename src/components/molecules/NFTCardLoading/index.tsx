import { Skeleton } from '@chakra-ui/react';
import NFTNoOfferCard from '../NFTNoOfferCard';

const NFTCardLoading: React.FC = () => {
  return (
    <Skeleton borderRadius="15px" maxWidth="240px">
      <NFTNoOfferCard collectionName="" tokenName="" id="" />
    </Skeleton>
  );
};

export default NFTCardLoading;
