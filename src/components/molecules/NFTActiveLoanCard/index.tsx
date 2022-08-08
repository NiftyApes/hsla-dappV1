import React from 'react';
import { Button, Center, Box, Flex, Text } from '@chakra-ui/react';

import CryptoIcon from 'components/atoms/CryptoIcon';
import { CoinSymbol } from 'lib/constants/coinSymbols';
import { Contract } from 'ethers';

import { NFTCardContainer } from '../NFTCard/components/NFTCardContainer';
import { NFTCardHeader } from '../NFTCard/components/NFTCardHeader';

interface Props {
  collectionName: string;
  contract?: Contract;
  id: string;
  img: string;
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
  actionButtonHelperText: 'What does this mean?',
  actionButtonText: 'repay loan',
  loanStatus: 'defaulted',
  loanDuration: 'X Days remaining',
};

const NFTActiveLoanCard: React.FC<Props> = ({
  collectionName,
  contract,
  id,
  img,
  offer,
  offerHash,
  tokenName,
}) => {
  return (
    <NFTCardContainer>
      <NFTCardHeader img={img} tokenId={id} tokenName={tokenName} collectionName={collectionName}>
        <>
          <Flex
            flexDir="column"
            alignItems="center"
            borderRadius="8px"
            border="1px solid"
            borderColor="orange"
            bg="orange.50"
            w="100%"
            mt="8px"
            mb="8px"
          >
            <Box
              borderBottom="1px solid"
              borderColor="orange"
              bg="white"
              borderRadius="8px 8px 0 0"
              textAlign="center"
              w="100%"
            >
              <Text textTransform="uppercase" fontWeight="bold" fontSize="md" color="orange.600">
                {i18n.loanStatus}
              </Text>
            </Box>
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
            <Text>{i18n.loanDuration}</Text>
          </Flex>
          <Button
            borderRadius="8px"
            colorScheme="orange"
            py="6px"
            size="lg"
            textTransform="uppercase"
            variant="solid"
            w="100%"
          >
            {i18n.actionButtonText}
          </Button>

          <Center mt="8px" mb="8px">
            {i18n.actionButtonHelperText}
          </Center>
        </>
      </NFTCardHeader>
    </NFTCardContainer>
  );
};

export default NFTActiveLoanCard;
