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
  assetStatus: 'Asset has not been seized',
  loanStatus: 'defaulted',
  owed: 'Owed',
};

const NFTDefaultedLoanCard: React.FC<Props> = ({
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
            borderColor="red"
            bg="red.50"
            w="100%"
            mt="8px"
            mb="8px"
          >
            <Box
              borderBottom="1px solid"
              borderColor="red"
              bg="red"
              borderRadius="8px 8px 0 0"
              textAlign="center"
              color="red"
              w="100%"
            >
              <Text textTransform="uppercase" fontWeight="bold" fontSize="md" color="white">
                {i18n.loanStatus}
              </Text>
            </Box>
            <Flex alignItems="center">
              <Flex alignItems="center">
                <CryptoIcon symbol={offer.symbol} size={25} />
                <Text ml="6px" fontSize="3.5xl" fontWeight="bold" color="red.600">
                  {offer.price}Ξ
                </Text>
                <Text fontSize="md" mt="9px" ml="6px" color="red.600">
                  {i18n.owed}
                </Text>
              </Flex>
            </Flex>

            <Text fontSize="md" color="red.600" fontWeight="bold">
              {i18n.assetStatus}
            </Text>
          </Flex>
          <Button
            borderRadius="8px"
            colorScheme="red"
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

export default NFTDefaultedLoanCard;
