import React, { useState } from 'react';
import { Button, Flex, Link, Box, Grid, Image, Text, HStack } from '@chakra-ui/react';

import { CoinSymbol } from 'lib/constants/coinSymbols';
import Icon from 'components/atoms/Icon';
import CryptoIcon from 'components/atoms/CryptoIcon';
import { useNiftyApesContractAddress } from '../../../hooks/useNiftyApesContractAddress';
import { useERC721ApprovalForAll } from '../../../hooks/useERC721ApprovalForAll';
import { Contract } from 'ethers';
import { useExecuteLoanByBorrower } from '../../../hooks/useExecuteLoanByBorrower';
import LoadingIndicator from '../../atoms/LoadingIndicator';

interface Props {
  contract?: Contract;
  floorTerm: boolean;
  img: string;
  offer: Offer;
  offerHash: string;
  tokenId: string;
  tokenName: string;
}

interface Offer {
  aprPercentage: number;
  durationDays: number;
  expirationDays: number;
  price: number;
  symbol: CoinSymbol;
  totalInterest: number;
  type: 'top' | 'floor';
}

const i18n = {
  allowButton: 'allow niftyapes to transfer nft',
  approveButton: 'approve transfer',
  approveMessage: (tokenId: string, tokenName: string, offer: Offer) =>
    `Approve and transfer ${tokenName} #${tokenId} to the NiftyApes smart contract to borrow ${offer.price}${offer.symbol} for ${offer.durationDays} days`,
  assetDetails: 'asset details',
  collateralDescription: 'Your collateral will be locked in escrow over the lifespan of your loan.',
  collateralLabel: 'your collateral',
  dealTermsLabel: 'deal terms',
  liquidityAwaits: 'Liquidity Awaits',
  offerTerms: (offer: Offer) => `${offer.durationDays} days at ${offer.aprPercentage}% APR`,
  totalInterest: 'total interest',
  totalInterestDescription: 'The most you could owe at the end of your loan.',
  transferDetails: (offer: Offer) =>
    `${offer.price}${offer.symbol} will be sent to your wallet address once your loan is executed.`,
};

const BorrowOfferDetailsCard: React.FC<Props> = ({
  contract,
  floorTerm,
  img,
  offer,
  offerHash,
  tokenId,
  tokenName,
}) => {
  const esNftUrl = `https://etherscan.io/token/${contract?.address}?a=${tokenId}`;
  const osNftUrl = `https://opensea.io/assets/ethereum/${contract?.address}/${tokenId}`;

  const operator = useNiftyApesContractAddress();
  const { hasApprovalForAll, hasCheckedApproval, grantApprovalForAll } = useERC721ApprovalForAll({
    contract,
    operator,
  });

  const { executeLoanByBorrower } = useExecuteLoanByBorrower({
    nftContractAddress: contract?.address,
    nftId: tokenId,
    offerHash,
    floorTerm,
  });
  const [isExecuting, setExecuting] = useState<boolean>(false);
  const onExecuteLoan = async () => {
    if (executeLoanByBorrower) {
      setExecuting(true);
      await executeLoanByBorrower()
        .then(() => {
          setExecuting(false);
        })
        .catch((error) => {
          setExecuting(false);
          console.log('Error', error.data.message);
        });
    }
  };

  const [transferApprovalStatus, setTransferApprovalStatus] = useState<string>('READY');
  const onApproveTransfer = async () => {
    await grantApprovalForAll({
      onPending: () => setTransferApprovalStatus('PENDING'),
      onSuccess: () => {
        setTransferApprovalStatus('SUCCESS');
        setTimeout(() => setTransferApprovalStatus('READY'), 1000);
      },
      onError: () => {
        setTransferApprovalStatus('ERROR');
        setTimeout(() => setTransferApprovalStatus('READY'), 1000);
      },
    });
  };

  const renderTransferButton = () => {
    if (!hasApprovalForAll && hasCheckedApproval) {
      return (
        <Button
          onClick={onApproveTransfer}
          colorScheme="purple"
          mt="30px"
          py="6px"
          size="lg"
          textTransform="uppercase"
          variant="outline"
          width="100%"
        >
          {transferApprovalStatus === 'PENDING' ? <LoadingIndicator size="xs" /> : i18n.allowButton}
        </Button>
      );
    }
  };

  const renderLoanButton = () => {
    return (
      <Button
        isDisabled={!hasApprovalForAll && hasCheckedApproval}
        onClick={onExecuteLoan}
        colorScheme="purple"
        mt="20px"
        py="6px"
        size="lg"
        textTransform="uppercase"
        variant="outline"
        width="100%"
      >
        {isExecuting ? <LoadingIndicator size="xs" /> : i18n.approveButton}
      </Button>
    );
  };

  return (
    <Box p="5px" mb="5px">
      <Grid
        gridTemplateColumns="repeat(2, minmax(0, 1fr))"
        gridColumnGap="20px"
        w="660px"
        borderColor="solid.lightPurple"
        textAlign="center"
        bgColor="solid.white"
      >
        <Flex flexDir="column" alignItems="center" bg="solid.gray3" borderRadius="10px">
          <Text
            mt="24px"
            fontWeight="bold"
            textTransform="uppercase"
            fontSize="sm"
            color="solid.gray0"
          >
            {i18n.collateralLabel}
          </Text>
          <Image
            src={img}
            alt={tokenName}
            border="6px solid"
            borderColor="solid.white"
            borderRadius="23px"
            w="114px"
            h="108px"
            objectFit="cover"
            mt="26px"
          />
          <Text mt="8px" fontSize="sm" color="solid.black">
            {tokenName}
          </Text>
          <Text mt="1px" fontSize="2xl" color="solid.black" fontWeight="bold" lineHeight="28px">
            #{tokenId}
          </Text>
          <Text mt="27px" color="solid.gray0" textTransform="uppercase" fontSize="2xs">
            {i18n.assetDetails}
          </Text>
          <Flex alignItems="center" mt="10px">
            <HStack>
              <Text isTruncated={true} width="100px">
                {contract?.address}
              </Text>
              <Link isExternal href={esNftUrl}>
                <Icon name="etherscan" />
              </Link>
              <Link isExternal href={osNftUrl}>
                <Icon name="os" />
              </Link>
            </HStack>
          </Flex>
          <Text mt="10px" fontSize="sm" mb="19px">
            {i18n.collateralDescription}
          </Text>
        </Flex>

        <Flex flexDir="column" alignItems="center">
          <Text
            mt="24px"
            fontWeight="bold"
            textTransform="uppercase"
            fontSize="sm"
            color="solid.gray0"
          >
            {i18n.dealTermsLabel}
          </Text>
          <Flex alignItems="center">
            <CryptoIcon symbol={offer.symbol} size={32} />
            <Text ml="6px" fontSize="3.5xl">
              {offer.price} {offer.symbol}
            </Text>
          </Flex>
          <Text fontSize="lg" color="solid.black" mt="5px">
            {i18n.offerTerms(offer)}
          </Text>
          <Text mt="12px">{i18n.transferDetails(offer)}</Text>
          <Flex alignItems="center" mt="50px">
            <Text fontSize="sm" color="solid.gray0" mr="3px" textTransform="uppercase">
              {i18n.totalInterest}
            </Text>
            <Icon name="help-circle" color="solid.gray0" />
          </Flex>
          <Flex alignItems="center" mt="30px">
            <CryptoIcon symbol={offer.symbol} size={32} />
            <Text ml="6px" fontSize="3.5xl">
              {Number((offer.totalInterest / 100) * offer.price).toFixed(2)} {offer.symbol}
            </Text>
          </Flex>
          <Text fontSize="sm" color="solid.black" mb="20px">
            {i18n.totalInterestDescription}
          </Text>
        </Flex>
      </Grid>

      <Flex flexDir="column" alignItems="center">
        <Flex mt="30px">
          <Text textTransform="uppercase" fontWeight="bold">
            {i18n.liquidityAwaits}
          </Text>
        </Flex>
        <Flex mt="10px">
          <Text textAlign="center">{i18n.approveMessage(tokenId, tokenName, offer)}</Text>
        </Flex>

        {renderTransferButton()}
        {renderLoanButton()}
      </Flex>
    </Box>
  );
};
export default BorrowOfferDetailsCard;
