import {
  Button,
  Center,
  Container,
  Flex,
  Link,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';

import CryptoIcon from 'components/atoms/CryptoIcon';
import { BigNumber, ethers } from 'ethers';
import { formatNumber } from 'lib/helpers/string';
import { roundForDisplay } from '../../../helpers/roundForDisplay';
import { getBestLoanOffer, LoanOffer } from '../../../loan';
import { NFT } from '../../../nft';
import Offers from '../../../pages/borrowers/Offers';
import BorrowOfferDetailsCard from '../BorrowOfferDetailsCard';
import { NFTCardContainer } from './components/NFTCardContainer';
import { NFTCardContainerHeader } from './components/NFTCardContainerHeader';
import NFTCardHeader from '../../cards/NFTCardHeader';

interface Props {
  nft: NFT;
  offers: Array<LoanOffer>;
}

const i18n = {
  initLoanButtonLabel: 'initiate loan',
  offerApr: (apr: number) => `${roundForDisplay(apr)}% APR`,
  offerDuration: (duration: number) => `${duration} days`,
  offerLabel: (type: string) => `${type} offer`,
  viewAllOffers: (count: number) => `View All Offers (${formatNumber(count)})`,
  topOffer: 'top offer for',
  allOffers: 'all offers for',
};

const NFTCard: React.FC<Props> = ({ nft, offers }) => {
  const {
    isOpen: isOfferDetailsOpen,
    onOpen: onOfferDetailsOpen,
    onClose: onOfferDetailsClose,
  } = useDisclosure();

  const {
    isOpen: isAllOffersOpen,
    onOpen: onAllOffersOpen,
    onClose: onAllOffersClose,
  } = useDisclosure();

  const bestOffer: LoanOffer = getBestLoanOffer(offers);
  const [activeOffer, setActiveOffer] = useState(bestOffer);

  const fmtOfferAmount = (offer: LoanOffer): string =>
    ethers.utils.formatEther(BigNumber.from(String(offer.OfferTerms.Amount)));

  const onSecondaryOffer = (offer: LoanOffer) => {
    setActiveOffer(offer);
    onAllOffersClose();
    onOfferDetailsOpen();
  };

  const onBestOffer = () => {
    // Reset active offer to the best offer
    setActiveOffer(bestOffer);
    onOfferDetailsOpen();
  };

  const renderBestOffer = () => {
    return (
      <Container
        borderBottom="1px solid"
        borderColor="accents.100"
        borderRadius="8px 8px 0 0"
        fontSize="md"
        fontWeight="bold"
        textAlign="center"
        textTransform="uppercase"
      >
        {i18n.offerLabel(bestOffer.type)}
      </Container>
    );
  };

  return (
    <NFTCardContainer>
      <NFTCardContainerHeader
        img={nft.image}
        tokenId={nft.id}
        tokenName={nft.name}
        collectionName={nft.collectionName || ''}
      >
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
              <CryptoIcon symbol="eth" size={25} />
              <Text ml="6px" fontSize="3.5xl" fontWeight="bold">
                {fmtOfferAmount(bestOffer)}Ξ
              </Text>
            </Flex>

            <Text fontSize="lg" color="solid.gray0">
              <Text as="span" color="solid.black" fontWeight="semibold">
                {i18n.offerDuration(bestOffer.durationDays)}
              </Text>
              &nbsp;at&nbsp;
              <Text as="span" color="solid.black" fontWeight="semibold">
                {i18n.offerApr(bestOffer.aprPercentage)}
              </Text>
            </Text>
          </Flex>
          <Button
            colorScheme="purple"
            onClick={onBestOffer}
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
            <Link onClick={onAllOffersOpen}>
              {i18n.viewAllOffers(offers.length)}
            </Link>
          </Center>

          {isAllOffersOpen && (
            <Modal isOpen onClose={onAllOffersClose} size="xl">
              <ModalOverlay />
              <ModalContent p="5px">
                <NFTCardHeader
                  contractAddress={nft.contractAddress}
                  tokenId={nft.id}
                  title={i18n.allOffers}
                  nft={nft}
                />
                <ModalCloseButton />
                <Offers
                  nft={nft}
                  offers={offers}
                  onOfferSelect={onSecondaryOffer}
                />
              </ModalContent>
            </Modal>
          )}

          {isOfferDetailsOpen && (
            <Modal isOpen onClose={onOfferDetailsClose} size="xl">
              <ModalOverlay />
              <ModalContent p="5px">
                <NFTCardHeader
                  contractAddress={nft.contractAddress}
                  tokenId={nft.id}
                  title={i18n.topOffer}
                  nft={nft}
                />
                <ModalCloseButton />
                <BorrowOfferDetailsCard offer={activeOffer} nft={nft} />
              </ModalContent>
            </Modal>
          )}
        </>
      </NFTCardContainerHeader>
    </NFTCardContainer>
  );
};

export default NFTCard;
