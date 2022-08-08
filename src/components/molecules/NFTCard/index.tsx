import React, { useState } from 'react';
import {
  Button,
  Center,
  Container,
  Flex,
  Text,
  Modal,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/react';

import CryptoIcon from 'components/atoms/CryptoIcon';
import LoadingIndicator from 'components/atoms/LoadingIndicator';
import { CoinSymbol } from 'lib/constants/coinSymbols';
import { Contract } from 'ethers';
import { NFTCardContainer } from './components/NFTCardContainer';
import { NFTCardHeader } from './components/NFTCardHeader';
import { formatNumber } from 'lib/helpers/string';
import { useERC721ApprovalForAll } from 'hooks/useERC721ApprovalForAll';
import { useExecuteLoanByBorrower } from 'hooks/useExecuteLoanByBorrower';
import { useNiftyApesContractAddress } from 'hooks/useNiftyApesContractAddress';
import BorrowOfferDetailsCard from '../BorrowOfferDetailsCard';

interface Props {
  collectionName: string;
  contract?: Contract;
  floorTerm: boolean;
  id: string;
  img: string;
  numberOfOffers: number;
  offer: {
    aprPercentage: number;
    days: number;
    price: number;
    symbol: CoinSymbol;
    type: 'top' | 'floor';
  };
  offerHash: string;
  tokenName: string;
}

const i18n = {
  offerLabel: (type: string) => `${type} offer`,
  moneyButtonLabel: '🍌Smash money button',
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
  const niftyApesContractAddress = useNiftyApesContractAddress();

  const { hasApprovalForAll, hasCheckedApproval, grantApprovalForAll } = useERC721ApprovalForAll({
    contract,
    operator: niftyApesContractAddress,
  });

  const [approvalTxStatus, setApprovalTxStatus] = useState<string>('READY');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { executeLoanByBorrower } = useExecuteLoanByBorrower({
    nftContractAddress: contract?.address,
    nftId: id,
    offerHash,
    floorTerm,
  });

  // const onApproveForAll = async () => {
  //     await grantApprovalForAll({
  //         onPending: () => setApprovalTxStatus('PENDING'),
  //         onSuccess: () => {
  //             setApprovalTxStatus('SUCCESS');
  //             setTimeout(() => setApprovalTxStatus('READY'), 1000);
  //         },
  //         onError: () => {
  //             setApprovalTxStatus('ERROR');
  //             setTimeout(() => setApprovalTxStatus('READY'), 1000);
  //         },
  //     });
  // };

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

  const renderInitOfferButton = () => {
    const btnLabel = () => {
      switch (approvalTxStatus) {
        case 'READY':
          return i18n.initLoanButtonLabel;
        case 'PENDING':
          return <LoadingIndicator size="xs" />;
        case 'ERROR':
          return 'Error';
        default:
          return approvalTxStatus;
      }
    };

    return (
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
        {btnLabel()}
      </Button>
    );
  };

  const renderMoneyButton = () => {
    if (hasApprovalForAll) {
      return (
        <Button
          borderRadius="10px"
          className="smash-money-btn"
          display="none"
          mt="5px"
          onClick={async () => executeLoanByBorrower && (await executeLoanByBorrower())}
          px="5px"
          variant="notify"
          w="100%"
        >
          {i18n.moneyButtonLabel}
        </Button>
      );
    }
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
            bg="#C4C4C41A"
            w="100%"
            mt="8px"
            mb="8px"
          >
            {renderBestOffer()}

            <Flex alignItems="center">
              <CryptoIcon symbol={offer.symbol} size={25} />
              <Text ml="6px" fontSize="3.5xl" fontWeight="bold">
                {offer.price}Ξ
              </Text>
            </Flex>

            <Text fontSize="lg" color="solid.gray0">
              <Text as="span" color="solid.black">
                {offer.days}
              </Text>
              &nbsp;days at&nbsp;
              <Text as="span" color="solid.black">
                {offer.aprPercentage}%
              </Text>
              &nbsp;APR
            </Text>
          </Flex>
          {renderInitOfferButton()}
          {renderMoneyButton()}
          <Center mt="8px" mb="8px">
            {i18n.viewAllOffers(numberOfOffers)}
          </Center>

          {isOpen && (
            <Modal isOpen={isOpen} onClose={onClose} size="2xl">
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton />

                <BorrowOfferDetailsCard
                  img={img}
                  offer={offer}
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
