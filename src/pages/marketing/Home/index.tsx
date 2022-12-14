import React from 'react';
import {
  Box,
  Center,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import { useTopNiftyApesCollections } from '../../../hooks/useCollectionsByLiquidity';

const i18n = {
  pageSubtitle: 'Borrow ETH using your NFTs as collateral',
  pageTitle: 'Loans for NFTs',
  thApr: 'lowest apr',
  thCollection: 'collection',
  thDuration: 'longest duration',
  thLiquidity: 'total liquidity',
  thOffers: '# of offers',
  thPrincipal: 'principal',
};

const Home: React.FC = () => {
  const collections: any = useTopNiftyApesCollections();

  return (
    <VStack spacing="50px">
      <Center>
        <VStack>
          <Text fontSize="8xl" as="b" textTransform="uppercase">
            {i18n.pageTitle}
          </Text>
          <Text fontSize="xl" color="grey">
            {i18n.pageSubtitle}
          </Text>
        </VStack>
      </Center>

      {collections && (
        <Box mt="10px">
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>{i18n.thCollection}</Th>
                  <Th>{i18n.thPrincipal}</Th>
                  <Th>{i18n.thApr}</Th>
                  <Th>{i18n.thDuration}</Th>
                  <Th>{i18n.thOffers}</Th>
                  <Th>{i18n.thLiquidity}</Th>
                </Tr>
              </Thead>

              <Tbody>
                {collections.map((collection: any) => {
                  return (
                    <Tr>
                      <Td>{collection.name}</Td>
                      <Td>
                        <Text fontWeight="bold">
                          {collection.highestPrincipal}
                        </Text>
                      </Td>
                      <Td>
                        <Text fontWeight="bold">{collection.lowestApr}%</Text>
                      </Td>
                      <Td>
                        <Text fontWeight="bold">{collection.duration}</Text>
                      </Td>
                      <Td>
                        <Text fontWeight="bold">
                          {collection.numberOfOffers}
                        </Text>
                      </Td>
                      <Td>
                        <Text fontWeight="bold">
                          {collection.totalLiquidity}
                        </Text>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </VStack>
  );
};

export default Home;
