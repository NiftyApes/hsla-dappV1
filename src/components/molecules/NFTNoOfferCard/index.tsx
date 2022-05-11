import React, { useState } from 'react';
import { Button, Flex, Image, Text } from '@chakra-ui/react';
import { useERC721ApprovalForAll } from 'hooks/useERC721ApprovalForAll';
import { Contract } from 'ethers';
import { useNiftyApesContractAddress } from 'hooks/useNiftyApesContractAddress';
import LoadingIndicator from 'components/atoms/LoadingIndicator';

interface Props {
  contract?: Contract;
  collectionName: string;
  tokenName: string;
  id: string;
  img: string;
}

const NFTNoOfferCard: React.FC<Props> = ({ contract, collectionName, tokenName, id, img }) => {
  const niftyApesContractAddress = useNiftyApesContractAddress();

  const { hasApprovalForAll, grantApprovalForAll } = useERC721ApprovalForAll({
    contract,
    operator: niftyApesContractAddress,
  });

  const [approvalTxStatus, setApprovalTxStatus] = useState<string>('READY');

  return (
    <Flex
      alignItems="center"
      flexDir="column"
      p="17px 15px 10px 15px"
      fontWeight="bold"
      w="200px"
      boxShadow="0px 4px 24px rgba(73, 16, 146, 0.1)"
      borderRadius="15px"
    >
      <Text color="solid.gray0" fontSize="2.5xs">
        {collectionName}
      </Text>
      <Text fontSize="xl" mt="5px" maxW="100%" isTruncated>
        {tokenName} #{id}
      </Text>
      <Image
        src={img}
        alt="No Offer Card"
        w="156px"
        h="127px"
        objectFit="cover"
        borderRadius="25px"
        mt="12px"
      />
      <Text mt="8px" color="solid.gray0" fontSize="xs">
        NO OFFERS AVAILABLE
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
      <Button
        disabled={!hasApprovalForAll}
        variant="secondary"
        size="xs"
        py="8px"
        w="100%"
        h="30px"
        mt="8px"
      >
        REQUEST LOAN
      </Button>
    </Flex>
  );
};

export default NFTNoOfferCard;
