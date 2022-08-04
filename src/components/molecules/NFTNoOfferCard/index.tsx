import React, { useState } from 'react';
import { Button, Flex, Image, Text } from '@chakra-ui/react';
import { useERC721ApprovalForAll } from 'hooks/useERC721ApprovalForAll';
import { Contract } from 'ethers';
import { useNiftyApesContractAddress } from 'hooks/useNiftyApesContractAddress';
import LoadingIndicator from 'components/atoms/LoadingIndicator';
import { NFTCardContainer } from '../NFTCard/NFTCardContainer';
import { NFTCardLayout } from '../NFTCard/NFTCardLayout';

interface Props {
  collectionName?: string;
  contract?: Contract;
  img?: string;
  tokenId: string;
  tokenName: string;
}

const NFTNoOfferCard: React.FC<Props> = ({ collectionName, contract, img, tokenId, tokenName }) => {
  const niftyApesContractAddress = useNiftyApesContractAddress();

  const { hasApprovalForAll, grantApprovalForAll } = useERC721ApprovalForAll({
    contract,
    operator: niftyApesContractAddress,
  });

  const [approvalTxStatus, setApprovalTxStatus] = useState<string>('READY');

  return (
    <NFTCardContainer>
      <NFTCardLayout
        img={img}
        tokenId={tokenId}
        tokenName={tokenName}
        collectionName={collectionName}
      >
        <Flex p="10px" textAlign="center" flexDir="column" w="100%">
          <Text mt="8px" color="solid.gray0" fontSize="xs">
            NO OFFERS AVAILABLE
          </Text>

          {!hasApprovalForAll && (
            <Button
              onClick={async () =>
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
        </Flex>
        {/* <Button
        disabled={!hasApprovalForAll}
        variant="secondary"
        size="xs"
        py="8px"
        w="100%"
        h="30px"
        mt="8px"
      >
        REQUEST LOAN
      </Button> */}
      </NFTCardLayout>
    </NFTCardContainer>
  );
};

export default NFTNoOfferCard;
