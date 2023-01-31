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

import { BigNumber, ethers } from 'ethers';
import { roundForDisplay } from '../../../helpers/roundForDisplay';
import { getBestLoanOffer, LoanOffer } from '../../../loan';
import { NFT } from '../../../nft';
import Offers from '../../../pages/borrowers/Offers';
import NFTCardHeader from '../../cards/NFTCardHeader';
import BorrowOfferDetailsCard from '../BorrowOfferDetailsCard';
import { NFTCardContainer } from './components/NFTCardContainer';
import { NFTCardContainerHeader } from './components/NFTCardContainerHeader';

interface Props {
  nft: NFT;
  offers: Array<LoanOffer>;
}

const i18n = {
  initLoanButtonLabel: 'Borrow',
  offerAprLabel: `APR`,
  offerApr: (apr: number) => `${roundForDisplay(apr)}%`,
  offerDurationLabel: 'Duration',
  offerDuration: (duration: number) => `${duration} days`,
  bestOffer: 'most Ξ, lowest apr',
  offersLabel: 'Offers',
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
        padding=".2rem 0"
        fontSize="12px"
        fontWeight="bold"
        textAlign="center"
        textTransform="uppercase"
        background="white"
        color="solid.gray0"
      >
        {i18n.bestOffer}
      </Container>
    );
  };

  return (
    <NFTCardContainer>
      <NFTCardContainerHeader
        attributes={nft.attributes}
        collectionName={nft.collectionName || ''}
        contractAddress={nft.contractAddress}
        img={nft.image}
        tokenId={nft.id}
        tokenName={nft.name}
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
          >
            {renderBestOffer()}

            <Flex alignItems="center">
              <Text ml="6px" fontSize="4xl">
                {fmtOfferAmount(bestOffer)}Ξ
              </Text>
            </Flex>
            <Flex justify="space-evenly" w="100%">
              <Flex direction="column" align="center">
                <Text
                  as="span"
                  fontSize="xs"
                  color="solid.black"
                  fontWeight="semibold"
                  textTransform="uppercase"
                >
                  {i18n.offerDurationLabel}
                </Text>
                <Text>{i18n.offerDuration(bestOffer.durationDays)}</Text>
              </Flex>
              <Flex direction="column" align="center">
                <Text
                  as="span"
                  fontSize="xs"
                  color="solid.black"
                  fontWeight="semibold"
                  textTransform="uppercase"
                >
                  {i18n.offerAprLabel}
                </Text>
                <Text>{i18n.offerApr(bestOffer.aprPercentage)}</Text>
              </Flex>
              <Flex direction="column" align="center">
                <Text
                  as="span"
                  fontSize="xs"
                  color="solid.black"
                  fontWeight="semibold"
                  textTransform="uppercase"
                >
                  {i18n.offersLabel}
                </Text>
                <Text>{offers.length}</Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex
            className="overflow"
            w="100%"
            bg="white"
            position="absolute"
            bottom="-60px"
            width="calc(100% - 16px)"
            padding="0.5em 0"
            transition="all .25s ease-in-out"
            borderTop="1px solid transparent"
            sx={{
              '.nftContainer:hover &': {
                bottom: `0px`,
                borderColor: 'accents.100',
              },
            }}
          >
            <Button
              className="buttonContainer"
              colorScheme="purple"
              onClick={onBestOffer}
              py="6px"
              size="sm"
              textTransform="uppercase"
              variant="outline"
              w="65%"
              p="1.32rem"
              borderRadius="8px"
              fontWeight="Bold"
              _hover={{ bg: 'primary.purple', color: 'white' }}
            >
              {i18n.initLoanButtonLabel}
            </Button>

            <Center
              mt="8px"
              mb="8px"
              w="35%"
              textAlign="center"
              textTransform="uppercase"
              fontWeight="Bold"
            >
              <Link
                fontSize="14px"
                color="primary.purple"
                onClick={onAllOffersOpen}
              >
                {i18n.offersLabel}
              </Link>
            </Center>
          </Flex>

          {isAllOffersOpen && (
            <Modal isOpen onClose={onAllOffersClose} size="2xl">
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
