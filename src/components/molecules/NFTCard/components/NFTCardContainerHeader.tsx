import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { useChainId } from 'hooks/useChainId';
import { isGnosis } from 'hooks/useContracts';
import moment from 'moment';
import React from 'react';

interface Props {
  attributes?: any;
  children: JSX.Element;
  collectionName?: string;
  contractAddress: string;
  img?: string;
  tokenId: string;
  tokenName: string;
}

export const NFTCardContainerHeader: React.FC<Props> = ({
  children,
  contractAddress,
  collectionName,
  img,
  tokenId,
  tokenName,
  attributes,
}) => {
  const tokenPadding = collectionName ? -5 : 16;

  const chainId = useChainId();

  let tokensCollateral;
  let tokensLocked;
  let unlockedDate;

  if (isGnosis(chainId) && attributes) {
    tokensCollateral = attributes.find(
      (attr: any) => attr.trait_type === 'Tokens_Collateral',
    )?.value;
    tokensLocked = attributes.find(
      (attr: any) => attr.trait_type === 'Tokens_Locked',
    )?.value;
    unlockedDate = attributes.find(
      (attr: any) => attr.trait_type === 'Unlock_Date',
    )?.value;
  }

  const showTokenMeta =
    contractAddress.toLowerCase() !==
    '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85';

  const formattedUnlockedDate = moment.unix(unlockedDate).format('MMM D, YYYY');

  return (
    <>
      <Image
        borderRadius="8px 8px 0 0"
        h="260px"
        objectFit="cover"
        src={img}
        w="260px"
      />

      {showTokenMeta && (
        <Flex
          align="center"
          px="8px"
          borderRadius="8px"
          flexDir="column"
          mt={`${210 + tokenPadding}px`}
          pb="5px"
          position="absolute"
          zIndex="1"
          _after={{
            content: '""',
            background:
              'linear-gradient(360deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0) 100%)',
            width: '260px',
            height: '75px',
            display: 'block',
            position: 'absolute',
            bottom: '0',
            zIndex: '-10',
          }}
        >
          {collectionName && collectionName !== '' && (
            <Text
              color="white"
              fontSize="sm"
              fontWeight="bold"
              maxW="240px"
              textShadow="0px 0px 4px #000000"
              textTransform="uppercase"
              textAlign="center"
              noOfLines={1}
            >
              {collectionName}
            </Text>
          )}

          <Text
            color={tokenId ? 'white' : 'rgba(255,255,255,0)'}
            fontSize="xl"
            fontWeight="semibold"
            noOfLines={1}
            maxW="240px"
            textShadow="0px 0px 4px #000000"
            textTransform="uppercase"
            textAlign="center"
          >
            {tokenName.endsWith(tokenId)
              ? tokenName
              : `${tokenName} #${tokenId}`}
          </Text>
        </Flex>
      )}
      {isGnosis(chainId) && (
        <Box
          w="100%"
          p="8px"
          mb="8px"
          textAlign="center"
          borderBottom="1px solid gray"
          borderColor="accents.100"
          backgroundColor="gray.50"
        >
          {tokensLocked} {tokensCollateral} unlocking{' '}
          <span style={{ whiteSpace: 'nowrap' }}>{formattedUnlockedDate}</span>
        </Box>
      )}
      <Box w="100%" p="0 8px 8px 8px">
        {children}
      </Box>
    </>
  );
};
