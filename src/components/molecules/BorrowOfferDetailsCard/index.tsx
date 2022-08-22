import React, { useState } from 'react';
import { Box, Button, Flex, Grid, HStack, Image, Link, Text, useToast } from '@chakra-ui/react';
import Icon from 'components/atoms/Icon';
import CryptoIcon from 'components/atoms/CryptoIcon';
import { useNiftyApesContractAddress } from '../../../hooks/useNiftyApesContractAddress';
import { useERC721ApprovalForAll } from '../../../hooks/useERC721ApprovalForAll';
import { BigNumber, Contract, ethers } from 'ethers';
import { useExecuteLoanByBorrower } from '../../../hooks/useExecuteLoanByBorrower';
import LoadingIndicator from '../../atoms/LoadingIndicator';
import { humanizeContractError } from '../../../helpers/errorsMap';
import { LoanOffer } from '../../../loan';
import { NFT } from '../../../nft';

interface Props {
  contract?: Contract;
  nft: NFT;
  offer: LoanOffer;
}

const i18n = {
  allowButton: 'allow niftyapes to transfer nft',
  approveButton: 'borrow money',
  approveMessage: (nft: NFT, offer: LoanOffer) =>
    `Approve and transfer ${nft.name} #${
      nft.id
    } to the NiftyApes smart contract to borrow ${ethers.utils.formatEther(
      BigNumber.from(String(offer.OfferTerms.Amount)),
    )} ${offer.symbol} for ${offer.durationDays} days`,
  assetDetails: 'asset details',
  collateralDescription: 'Your collateral will be locked in escrow over the lifespan of your loan.',
  collateralLabel: 'your collateral',
  dealTermsLabel: 'deal terms',
  liquidityAwaits: 'Liquidity Awaits',
  offerTerms: (offer: LoanOffer) => `${offer.durationDays} days at ${offer.aprPercentage}% APR`,
  toastApproveTransferError: 'Unable to approve NFT transfer',
  toastApproveTransferSuccess: 'NFT Transfer approved',
  toastLoanSuccess: 'Loan executed successfully',
  totalInterest: 'total interest',
  totalInterestDescription: 'The most you could owe at the end of your loan.',
  transferDetails: (amount: string, symbol: string) =>
    `${amount} ${symbol} will be sent to your wallet address once your loan is executed.`,
};

const BorrowOfferDetailsCard: React.FC<Props> = ({ contract, offer, nft }) => {
  const toast = useToast();
  const operator = useNiftyApesContractAddress();

  const esNftUrl = `https://etherscan.io/token/${contract?.address}?a=${nft.id}`;
  const osNftUrl = `https://opensea.io/assets/ethereum/${contract?.address}/${nft.id}`;

  const fmtOfferAmount: string = ethers.utils.formatEther(
    BigNumber.from(String(offer.OfferTerms.Amount)),
  );
  const fmtTotalInterest: string = Number(
    (offer.totalInterest / 100) * Number(fmtOfferAmount),
  ).toFixed(2);

  const { hasApprovalForAll, hasCheckedApproval, grantApprovalForAll } = useERC721ApprovalForAll({
    contract,
    operator,
  });

  const { executeLoanByBorrower } = useExecuteLoanByBorrower({
    nftContractAddress: contract?.address,
    nftId: nft.id,
    offerHash: offer.OfferHash,
    floorTerm: offer.OfferTerms.FloorTerm,
  });
  const [isExecuting, setExecuting] = useState<boolean>(false);

  const onExecuteLoan = async () => {
    if (executeLoanByBorrower) {
      setExecuting(true);
      await executeLoanByBorrower()
        .then(() => {
          toast({
            title: i18n.toastLoanSuccess,
            status: 'success',
            position: 'top-right',
            isClosable: true,
          });

          setExecuting(false);
        })
        .catch((error) => {
          toast({
            title: `Error: ${humanizeContractError(error.reason)}`,
            status: 'error',
            position: 'top-right',
            isClosable: true,
          });

          setExecuting(false);
        });
    }
  };

  const [transferApprovalStatus, setTransferApprovalStatus] = useState<string>('READY');
  const onApproveTransfer = async () => {
    await grantApprovalForAll({
      onPending: () => setTransferApprovalStatus('PENDING'),
      onSuccess: () => {
        setTransferApprovalStatus('SUCCESS');

        toast({
          title: i18n.toastApproveTransferSuccess,
          status: 'success',
          position: 'top-right',
          isClosable: true,
        });
        setTimeout(() => setTransferApprovalStatus('READY'), 1000);
      },
      onError: () => {
        toast({
          title: i18n.toastApproveTransferError,
          status: 'error',
          position: 'top-right',
          isClosable: true,
        });
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
            src={nft.image}
            alt={nft.name}
            border="6px solid"
            borderColor="solid.white"
            borderRadius="23px"
            w="114px"
            h="108px"
            objectFit="cover"
            mt="26px"
          />
          <Text mt="8px" fontSize="sm" color="solid.black">
            {nft.name}
          </Text>
          <Text mt="1px" fontSize="2xl" color="solid.black" fontWeight="bold" lineHeight="28px">
            #{nft.id}
          </Text>
          <Text mt="27px" color="solid.gray0" textTransform="uppercase" fontSize="2xs">
            {i18n.assetDetails}
          </Text>
          <Flex alignItems="center" mt="10px">
            <HStack>
              <Text noOfLines={1} width="100px">
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
              {fmtOfferAmount} {offer.symbol}
            </Text>
          </Flex>
          <Text fontSize="lg" color="solid.black" mt="5px">
            {i18n.offerTerms(offer)}
          </Text>
          <Text mt="12px">{i18n.transferDetails(fmtOfferAmount, offer.symbol)}</Text>
          <Flex alignItems="center" mt="50px">
            <Text fontSize="sm" color="solid.gray0" mr="3px" textTransform="uppercase">
              {i18n.totalInterest}
            </Text>
            <Icon name="help-circle" color="solid.gray0" />
          </Flex>
          <Flex alignItems="center" mt="30px">
            <CryptoIcon symbol={offer.symbol} size={32} />
            <Text ml="6px" fontSize="3.5xl">
              {fmtTotalInterest} {offer.symbol}
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
          <Text textAlign="center">{i18n.approveMessage(nft, offer)}</Text>
        </Flex>

        {renderTransferButton()}
        {renderLoanButton()}
      </Flex>
    </Box>
  );
};
export default BorrowOfferDetailsCard;
