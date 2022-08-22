import React from 'react';
import {
  Button,
  Center,
  Container,
  Flex,
  Link,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import CryptoIcon from 'components/atoms/CryptoIcon';
import { BigNumber, Contract, ethers } from 'ethers';
import { NFTCardContainer } from './components/NFTCardContainer';
import { NFTCardHeader } from './components/NFTCardHeader';
import { formatNumber } from 'lib/helpers/string';
import BorrowOfferDetailsCard from '../BorrowOfferDetailsCard';
import Offers from '../../../pages/borrowers/Offers';
import { NFT } from '../../../nft';
import { LoanOffer } from '../../../loan';

interface Props {
  offer: LoanOffer;
  contract?: Contract;
  nft: NFT;
  offers: Array<LoanOffer>;
}

const i18n = {
  initLoanButtonLabel: 'initiate loan',
  offerApr: (apr: number) => `${Math.round(apr)}% APR`,
  offerDuration: (duration: number) => `${duration} days`,
  offerLabel: (type: string) => `${type} offer`,
  viewAllOffers: (count: number) => `View All Offers (${formatNumber(count)})`,
};

const NFTCard: React.FC<Props> = ({ offer, contract, nft, offers }) => {
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

  const fmtOfferAmount: string = ethers.utils.formatEther(
    BigNumber.from(String(offer.OfferTerms.Amount)),
  );

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
        {i18n.offerLabel(offer.type)}
      </Container>
    );
  };

  return (
    <NFTCardContainer>
      <NFTCardHeader
        img={nft.image}
        tokenId={nft.id}
        tokenName={nft.name}
        collectionName={'collectionName'}
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
                {fmtOfferAmount}Ξ
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
            onClick={onOfferDetailsOpen}
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
            <Link onClick={onAllOffersOpen}>{i18n.viewAllOffers(offers.length)}</Link>
          </Center>

          {isAllOffersOpen && (
            <Modal isOpen={true} onClose={onAllOffersClose} size="xl">
              <ModalOverlay />
              <ModalContent p="5px">
                <Offers nft={nft} offers={offers} />
              </ModalContent>
            </Modal>
          )}

          {isOfferDetailsOpen && (
            <Modal isOpen={true} onClose={onOfferDetailsClose} size="xl">
              <ModalOverlay />
              <ModalContent p="5px" maxW="800px">
                <BorrowOfferDetailsCard contract={contract} offer={offer} nft={nft} />
              </ModalContent>
            </Modal>
          )}
        </>
      </NFTCardHeader>
    </NFTCardContainer>
  );
};

export default NFTCard;
