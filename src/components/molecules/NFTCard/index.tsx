import React, { useState } from 'react';
import { Button, Center, Container, Flex, Text } from '@chakra-ui/react';

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

  const { hasApprovalForAll, grantApprovalForAll } = useERC721ApprovalForAll({
    contract,
    operator: niftyApesContractAddress,
  });

  const [approvalTxStatus, setApprovalTxStatus] = useState<string>('READY');

  const { executeLoanByBorrower } = useExecuteLoanByBorrower({
    nftContractAddress: contract?.address,
    nftId: id,
    offerHash,
    floorTerm,
  });

  const onApproveForAll = async () => {
    await grantApprovalForAll({
      onPending: () => setApprovalTxStatus('PENDING'),
      onSuccess: () => {
        setApprovalTxStatus('SUCCESS');
        setTimeout(() => setApprovalTxStatus('READY'), 1000);
      },
      onError: () => {
        setApprovalTxStatus('ERROR');
        setTimeout(() => setApprovalTxStatus('READY'), 1000);
      },
    });
  };

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
    if (!hasApprovalForAll) {
      const buttonLabel = () => {
        switch (approvalTxStatus) {
          case 'READY':
            return 'Initiate Loan';
          case 'PENDING':
            return <LoadingIndicator size="xs" />;
          case 'ERROR':
            return 'Error';
          default:
            return 'Initiate Loan';
        }
      };

      return (
        <Button
          borderRadius="8px"
          colorScheme="purple"
          onClick={onApproveForAll}
          py="6px"
          size="lg"
          textTransform="uppercase"
          variant="outline"
          w="100%"
        >
          {buttonLabel()}
        </Button>
      );
    }
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
        </>
      </NFTCardHeader>
    </NFTCardContainer>
  );
};

export default NFTCard;
