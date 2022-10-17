import { Flex, Table, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react';
import Icon from 'components/atoms/Icon';
import React from 'react';

import Card from '../Card';
import PlatformInfoLineChart from './PlatformInfoLineChart';
import Row from './Row';

const PlatformInfo: React.FC = () => {
  return (
    <Card>
      <Flex alignItems="center">
        <Text fontSize="18px" fontWeight="bold" color="solid.gray0" mr="6px">
          PLATFORM INFO
        </Text>
        <Icon name="etherscan" size={20} />
      </Flex>
      <PlatformInfoLineChart />

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
                py: '8px',
              },
            }}
          >
            <Th textAlign="left">Total Liquidity</Th>
            <Th textAlign="center">
              <Flex alignItems="center">
                <Text mx="5px">Passive APY</Text>
                <Icon
                  name="circle-question-mark"
                  color="solid.gray2"
                  size={16}
                />
              </Flex>
            </Th>
            <Th textAlign="center">
              <Flex alignItems="center">
                <Text mx="5px">Loans Orign.</Text>
                <Icon
                  name="circle-question-mark"
                  color="solid.gray2"
                  size={16}
                />
              </Flex>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Row />
          <Row />
          <Row />
        </Tbody>
      </Table>
    </Card>
  );
};

export default PlatformInfo;
