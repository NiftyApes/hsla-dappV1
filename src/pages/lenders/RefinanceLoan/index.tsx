import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Link,
  Text,
} from '@chakra-ui/react';
import { useDebounce } from 'hooks/useDebounce';
import { useRaribleTokenMeta } from 'hooks/useRaribleTokenMeta';
import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { OfferTypes } from './constants';
import CollectionHeader from './CollectionHeader';
import StealLoan from './StealLoan';
import LoanHistory from './LoanHistory';

const RARIBLE_TOKEN_DEBOUNCE_MS = 250;

const RefinanceLoan: React.FC = () => {
  const { collectionAddress } = useParams();

  const [offerType] = useState<OfferTypes>('collection');
  const [collectionOfferAmt, setCollectionOfferAmt] = useState<string>('');
  const [apr, setApr] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [expiration, setExpiration] = useState<string>('30');
  const [floorTermLimit, setFloorTermLimit] = useState('5');
  const [tokenId, setTokenId] = useState('');
  const [newlyAddedOfferHashes, setNewlyAddedOfferHashes] = useState<string[]>(
    [],
  );

  useEffect(() => {
    setCollectionOfferAmt('');
    setApr('');
    setDuration('');
    setExpiration('30');
    setFloorTermLimit('5');
    setNewlyAddedOfferHashes([]);
    setTokenId('');
  }, [collectionAddress, offerType]);

  const debonucedTokenId = useDebounce(tokenId, RARIBLE_TOKEN_DEBOUNCE_MS);

  const fetchedNFT: any = useRaribleTokenMeta({
    contractAddress: collectionAddress,
    tokenId: debonucedTokenId,
  });

  if (!collectionAddress) {
    return null;
  }

  return (
    <Center mb="16">
      <Box minW="1120px" maxW="1600px">
        <CollectionHeader />
        <Grid
          gap={16}
          mt="16px"
          gridTemplateColumns="max(1160*0.60px, min(60vw, 1600*0.60px)) 1fr"
        >
          <GridItem>
            <Flex flexDirection="column">
              <div>
                <Text
                  fontWeight="bold"
                  color="solid.gray0"
                  textTransform="uppercase"
                  sx={{ position: 'relative', top: '-16px', left: '4px' }}
                >
                  Costs
                </Text>
                <Text fontStyle="italic" mb="42px">
                  In order to refinance, the loan + interest earned must be paid
                  to the loan originator. Read more about how refinancing works
                  and how fees are calculated&nbsp;
                  <Link
                    fontWeight="bold"
                    color="purple"
                    href="https://compound.finance/"
                    isExternal
                  >
                    here
                  </Link>
                </Text>
              </div>
              <Box
                marginBottom="16"
                padding="6"
                border="1px solid rgba(101, 101, 101, 0.2)"
                borderRadius="15"
                backgroundColor="white"
              >
                <Flex justifyContent="space-between" flexDirection="row">
                  <Box>
                    <Flex flexDirection="column">
                      <Text color="gray.600" fontWeight="700" fontSize="14">
                        Principle
                      </Text>
                      <Text fontSize="22" fontWeight="900">
                        25.50Ξ
                      </Text>
                    </Flex>
                  </Box>
                  <Box>
                    <Flex flexDirection="column">
                      <Text color="gray.600" fontWeight="700" fontSize="14">
                        Interest Accrued
                      </Text>
                      <Text fontSize="22" fontWeight="900">
                        +1.98Ξ
                      </Text>
                    </Flex>
                  </Box>
                  <Box>
                    <Flex flexDirection="column">
                      <Text color="gray.600" fontWeight="700" fontSize="14">
                        Refi-premium
                      </Text>
                      <Text fontSize="22" fontWeight="900">
                        +0.00Ξ
                      </Text>
                    </Flex>
                  </Box>
                  <Box>
                    <Flex flexDirection="column">
                      <Text color="gray.600" fontWeight="700" fontSize="14">
                        Required AMT
                      </Text>
                      <Text fontSize="22" fontWeight="900">
                        27.48Ξ
                      </Text>
                    </Flex>
                  </Box>
                  <Box>
                    <Flex flexDirection="column">
                      <Text color="gray.600" fontWeight="700" fontSize="14">
                        Your Balance
                      </Text>
                      <Text fontSize="22" fontWeight="900">
                        330.632Ξ
                      </Text>
                    </Flex>
                  </Box>
                </Flex>
              </Box>
            </Flex>
            <LoanHistory
              tokenId={tokenId}
              collectionOfferAmt={collectionOfferAmt}
              apr={apr}
              duration={duration}
              expiration={expiration}
              newlyAddedOfferHashes={newlyAddedOfferHashes}
            />
          </GridItem>
          <GridItem>
            <StealLoan
              fetchedNFT={fetchedNFT}
              offerType={offerType}
              tokenId={tokenId}
              setTokenId={setTokenId}
              collectionOfferAmt={collectionOfferAmt}
              setCollectionOfferAmt={setCollectionOfferAmt}
              apr={apr}
              setApr={setApr}
              duration={duration}
              setDuration={setDuration}
              expiration={expiration}
              setExpiration={setExpiration}
              floorTermLimit={floorTermLimit}
              setFloorTermLimit={setFloorTermLimit}
              nftContractAddress={collectionAddress}
              addNewlyAddedOfferHash={(offerHash: string) => {
                setNewlyAddedOfferHashes([...newlyAddedOfferHashes, offerHash]);
              }}
            />
          </GridItem>
        </Grid>
      </Box>
    </Center>
  );
};

export default RefinanceLoan;
