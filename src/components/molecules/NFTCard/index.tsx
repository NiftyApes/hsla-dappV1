import React from 'react';
import {
  Button,
  Center,
  Container,
  Flex,
  Text,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

import CryptoIcon from 'components/atoms/CryptoIcon';
import { CoinSymbol } from 'lib/constants/coinSymbols';
import { Contract } from 'ethers';
import { NFTCardContainer } from './components/NFTCardContainer';
import { NFTCardHeader } from './components/NFTCardHeader';
import { formatNumber } from 'lib/helpers/string';
import BorrowOfferDetailsCard from '../BorrowOfferDetailsCard';
import { Link as RouterLink } from 'react-router-dom';

interface Props {
  collectionName: string;
  contract?: Contract;
  floorTerm: boolean;
  id: string;
  img: string;
  numberOfOffers: number;
  offer: {
    aprPercentage: number;
    durationDays: number;
    expirationDays: number;
    price: number;
    symbol: CoinSymbol;
    totalInterest: number;
    type: 'top' | 'floor';
  };
  offerHash: string;
  tokenName: string;
}

const i18n = {
  offerLabel: (type: string) => `${type} offer`,
  offerDuration: (duration: number) => `${duration} days`,
  offerApr: (apr: number) => `${Math.round(apr)}% APR`,
  initLoanButtonLabel: 'initiate loan',
  viewAllOffers: (numOffers: number) => `View All Offers (${formatNumber(numOffers)})`,
};

const NFTCard: React.FC<Props> = ({
  collectionName,
  contract,
  floorTerm,
  id,
  img,
  numberOfOffers,
  offer,
  offerHash,
  tokenName,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const renderBestOffer = () => {
    return (
      <Container
        textAlign="center"
        textTransform="uppercase"
        fontWeight="bold"
        borderBottom="1px solid"
        borderRadius="8px 8px 0 0"
        borderColor="accents.100"
        fontSize="md"
      >
        {i18n.offerLabel(offer.type)}
      </Container>
    );
  };

  return (
    <NFTCardContainer>
      <NFTCardHeader img={img} tokenId={id} tokenName={tokenName} collectionName={collectionName}>
        <>
          <Flex
            flexDir="column"
            alignItems="center"
            borderRadius="8px"
            border="1px solid"
            borderColor="accents.100"
            minHeight="128px"
            bg="#C4C4C41A"
            w="100%"
            mt="8px"
            mb="8px"
          >
            {renderBestOffer()}

            <Flex alignItems="center">
              <CryptoIcon symbol={offer.symbol} size={25} />
              <Text ml="6px" fontSize="3.5xl" fontWeight="bold">
                {offer.price.toFixed(1)}Ξ
              </Text>
            </Flex>

            <Text fontSize="lg" color="solid.gray0">
              <Text as="span" color="solid.black" fontWeight="semibold">
                {i18n.offerDuration(offer.durationDays)}
              </Text>
              &nbsp;at&nbsp;
              <Text as="span" color="solid.black" fontWeight="semibold">
                {i18n.offerApr(offer.aprPercentage)}
              </Text>
            </Text>
          </Flex>
          <Button
            colorScheme="purple"
            onClick={onOpen}
            py="6px"
            size="lg"
            textTransform="uppercase"
            variant="outline"
            w="100%"
            borderRadius="8px"
          >
            {i18n.initLoanButtonLabel}
          </Button>

          <Center mt="8px" mb="8px">
            <RouterLink to={`/borrowers/${contract?.address}/${id}`}>
              {i18n.viewAllOffers(numberOfOffers)}
            </RouterLink>
          </Center>

          {isOpen && (
            <Modal isOpen={isOpen} onClose={onClose} size="2xl">
              <ModalOverlay />
              <ModalContent p="5px">
                <BorrowOfferDetailsCard
                  contract={contract}
                  floorTerm={floorTerm}
                  img={img}
                  offer={offer}
                  offerHash={offerHash}
                  tokenId={id}
                  tokenName={tokenName}
                />
              </ModalContent>
            </Modal>
          )}
        </>
      </NFTCardHeader>
    </NFTCardContainer>
  );
};

export default NFTCard;
