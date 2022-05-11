import React, { useState } from 'react';
import { Button, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';

import { CoinSymbol } from 'lib/constants/coinSymbols';
import Icon from 'components/atoms/Icon';
import CryptoIcon from 'components/atoms/CryptoIcon';
import { formatNumber } from 'lib/helpers/string';
import { useNiftyApesContractAddress } from 'hooks/useNiftyApesContractAddress';
import { useERC721ApprovalForAll } from 'hooks/useERC721ApprovalForAll';
import { Contract } from 'ethers';
import { useExecuteLoanByBorrower } from 'hooks/useExecuteLoanByBorrower';
import { useLoanOfferFromHash } from 'hooks/useLoanOfferFromHash';
import LoadingIndicator from 'components/atoms/LoadingIndicator';

interface Props {
  contract?: Contract;
  id: string;
  offerHash: string;
  collectionName: string;
  tokenName: string;
  offer: {
    type: 'top' | 'floor';
    price: number;
    symbol: CoinSymbol;
    aprPercentage: number;
    days: number;
  };
  img: string;
  numberOfOffers: number;
}

export const NFT_CARD_WIDTH = 264;

const NFTCard: React.FC<Props> = ({
  contract,
  id,
  offerHash,
  collectionName,
  tokenName,
  offer,
  img,
  numberOfOffers,
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
    floorTerm: false,
  });

  const r = useLoanOfferFromHash({
    nftContractAddress: '0x3155755b79aA083bd953911C92705B7aA82a18F9',
    nftId: Number(id),
    offerHash: '0x7102528346413c45a011974b64afa13d76f87b19133653d94c7e70ecab5dc636',
    floorTerm: false,
  });

  console.log(r);

  return (
    <>
      <Flex
        w={NFT_CARD_WIDTH}
        alignItems="center"
        flexDir="column"
        bg="solid.white"
        borderRadius="15px"
        p="16px 20px"
        boxShadow="0px 4px 24px 0px rgba(73, 16, 146, 0.1)"
        position="relative"
        transition="all 0.5s"
        _hover={{
          transform: 'scale(1.1)',
          '.smash-money-btn': {
            display: 'block',
          },
        }}
      >
        <Menu>
          <MenuButton position="absolute" top="16px" right="14px">
            <Icon name="more-vertical" color="solid.gray0" />
          </MenuButton>
          <MenuList>
            <MenuItem>Add</MenuItem>
            <MenuItem>Remove</MenuItem>
          </MenuList>
        </Menu>

        <Text maxW="100%" color="solid.gray0" fontSize="sm" fontWeight="bold" isTruncated>
          {collectionName}
        </Text>
        <Text
          maxW="100%"
          fontSize="lg"
          fontWeight="bold"
          p="3px 7px"
          bg="solid.white"
          borderRadius="3px"
          zIndex={2}
          isTruncated
        >
          {tokenName}
        </Text>

        <Image
          src={img}
          alt="NFT Card"
          w="177px"
          h="157px"
          objectFit="cover"
          borderRadius="10px"
          mt="-5px"
        />

        <Text
          textTransform="uppercase"
          fontSize="xs"
          p="3px 7px"
          color="solid.gray0"
          boxShadow="0px 1px 0px 0px #F6EDFF"
          borderRadius="3px"
          mt="16px"
          bg="solid.white"
          zIndex={2}
        >
          {offer.type} offer
        </Text>

        <Flex
          flexDir="column"
          alignItems="center"
          borderRadius="10px"
          border="1px solid"
          borderColor="accents.100"
          bg="#C4C4C41A"
          w="100%"
          p="18px 10px 10px 10px"
          mt="-8px"
        >
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
          {!hasApprovalForAll && (
            <Button
              onClick={async () =>
                await grantApprovalForAll({
                  onTxSubmitted: () => setApprovalTxStatus('PENDING'),
                  onTxMined: () => {
                    setApprovalTxStatus('SUCCESS');
                    setTimeout(() => setApprovalTxStatus('READY'), 1000);
                  },
                  onError: () => {
                    setApprovalTxStatus('ERROR');
                    setTimeout(() => setApprovalTxStatus('READY'), 1000);
                  },
                })
              }
              variant="secondary"
              size="xs"
              py="8px"
              w="100%"
              h="30px"
              mt="8px"
            >
              {approvalTxStatus === 'READY' ? (
                'Approve'
              ) : approvalTxStatus === 'PENDING' ? (
                <span>
                  Pending <LoadingIndicator size="xs" />
                </span>
              ) : approvalTxStatus === 'SUCCESS' ? (
                'Success'
              ) : approvalTxStatus === 'ERROR' ? (
                'Error'
              ) : (
                'Approve'
              )}
            </Button>
          )}
          {hasApprovalForAll && (
            <Button
              variant="notify"
              className="smash-money-btn"
              w="100%"
              borderRadius="10px"
              mt="5px"
              display="none"
              px="5px"
              onClick={async () => executeLoanByBorrower && (await executeLoanByBorrower())}
            >
              🍌Smash money button
            </Button>
          )}
        </Flex>

        <Button
          variant="secondary"
          borderRadius="10px"
          w="100%"
          fontWeight="normal"
          fontSize="sm"
          mt="8px"
        >
          View All Offers ({formatNumber(numberOfOffers)})
        </Button>
      </Flex>
    </>
  );
};

export default NFTCard;
