import { Box, Flex, Grid, GridItem, Table, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react';
import Icon from 'components/atoms/Icon';
import { useAvailableEthLiquidity } from 'hooks/useEthLiquidity';
import React from 'react';

import Card from '../Card';
import LockedLiquidityChart from './LockedLiquidityChart';
import Row from './Row';

const LockedLiquidity: React.FC = () => {
  const { availableEthLiquidity } = useAvailableEthLiquidity();
  return (
    <Card>
      <Grid gridTemplateColumns="repeat(3, minmax(0, 1fr))" columnGap="50px">
        <GridItem colSpan={1}>
          <LockedLiquidityChart />
        </GridItem>
        <GridItem colSpan={2}>
          <Flex
            textAlign="center"
            sx={{
              'div > p:first-of-type': {
                fontSize: '6xl',
                color: 'solid.gray0',
              },
              'div > p:nth-child(2)': {
                fontSize: '2xs',
                color: 'solid.gray0',
                opacity: 0.6,
              },
            }}
          >
            <Box mr="50px">
              <Text>$2.546M</Text>
              <Text>Current Total Value</Text>
            </Box>
            <Box>
              <Text style={{ whiteSpace: 'nowrap' }}>2 %</Text>
              <Text>Yield</Text>
            </Box>
          </Flex>

          <Table mt="50px">
            <Thead>
              <Tr
                background="transparent"
                sx={{
                  '& > th': {
                    fontWeight: 'bold',
                    fontSize: 'sm',
                    color: 'solid.gray0',
                    border: 'none',
                    width: '33%',
                    textAlign: 'left',
                    py: '8px',
                  },
                }}
              >
                <Th style={{ whiteSpace: 'nowrap' }}>Per Asset</Th>
                <Th>
                  <Flex alignItems="center">
                    <Icon name="lock" color="solid.gray0" size={10} />
                    <Text mx="5px" style={{ whiteSpace: 'nowrap' }}>
                      In Use
                    </Text>
                    <Icon name="circle-question-mark" color="solid.gray2" size={16} />
                  </Flex>
                </Th>
                <Th />
              </Tr>
            </Thead>
            <Tbody
              sx={{
                'tr:nth-child(2n)': {
                  backgroundColor: 'gray.300',
                },
              }}
            >
              <Row ethLiquidity={availableEthLiquidity} />
            </Tbody>
          </Table>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default LockedLiquidity;
