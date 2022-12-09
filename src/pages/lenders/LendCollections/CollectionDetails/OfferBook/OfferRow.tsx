import moment from 'moment';
import React from 'react';
import { ethers } from 'ethers';
import { Flex, HStack, Image, Tag, Td, Text, Tr } from '@chakra-ui/react';
import CryptoIcon from 'components/atoms/CryptoIcon';
import { getAPR } from 'helpers/getAPR';
import { roundForDisplay } from 'helpers/roundForDisplay';
import { useRaribleTokenMeta } from 'hooks/useRaribleTokenMeta';
import { useParams } from 'react-router-dom';
import { useWalletAddress } from 'hooks/useWalletAddress';

type BookOfferRowProps = {
  offer: Record<string, any>;
  newlyAddedOfferHashes: string[];
};

const BookOfferRow: React.FC<BookOfferRowProps> = ({
  offer,
  newlyAddedOfferHashes,
}) => {
  const { collectionAddress } = useParams();
  const walletAddress = useWalletAddress();

  const fetchedNFT: any = useRaribleTokenMeta({
    contractAddress: collectionAddress,
    tokenId: offer.nftId,
  });

  return (
    <Tr
      key={offer.offerHash}
      sx={{
        td: {
          backgroundColor: newlyAddedOfferHashes.includes(offer.offerHash)
            ? 'yellow.100'
            : 'auto',
          border: 'none',
          fontSize: 'md',
          textAlign: 'center',
        },
      }}
    >
      <Td
        sx={{
          position: 'relative',
        }}
      >
        <span style={{ whiteSpace: 'nowrap' }}>
          {walletAddress && walletAddress === offer.creator && (
            <Tag
              bgColor="orange.300"
              color="white"
              fontSize="xs"
              fontWeight={600}
              sx={{
                position: 'absolute',
                left: '-24px',
                top: '14px',
              }}
            >
              YOURS
            </Tag>
          )}
          <Flex alignItems="center" justifyContent="center">
            <CryptoIcon symbol="eth" size={16} />
            <Text ml="8px">{ethers.utils.formatEther(offer.amount)}</Text>
          </Flex>
        </span>
      </Td>
      <Td>
        <Text>
          {roundForDisplay(
            getAPR({
              amount: offer.amount,
              interestRatePerSecond: offer.interestRatePerSecond,
            }),
          )}
          %
        </Text>
      </Td>
      <Td>
        {offer.nftId && fetchedNFT.id ? (
          <HStack align="center" sx={{ justifyContent: 'center' }}>
            <Image
              borderRadius="8"
              style={{ height: '30px', width: '30px' }}
              src={fetchedNFT?.image}
            />
            <Text>{fetchedNFT.id}</Text>
          </HStack>
        ) : (
          <Text>All</Text>
        )}
      </Td>
      <Td>
        <Text>
          {moment.duration(offer.duration, 'seconds').asDays()} day
          {moment.duration(offer.duration, 'seconds').asDays() !== 1 && 's'}
        </Text>
      </Td>
      <Td>
        <Text>
          {moment(offer.expiration * 1000).diff(moment(), 'days')}
          {moment(offer.expiration * 1000).diff(moment(), 'days') !== 1
            ? ' days'
            : ' day'}
        </Text>
      </Td>
      <Td />
    </Tr>
  );
};

export default BookOfferRow;
